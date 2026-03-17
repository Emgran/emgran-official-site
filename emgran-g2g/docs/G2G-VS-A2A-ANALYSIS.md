# G2G vs A2A 协议对比分析

**日期**: 2026-03-16  
**状态**: 分析完成  
**目标**: 将 G2G 升级为符合 A2A 标准的 G2G 2.0

---

## 📊 核心差异对比

| 维度 | G2G 1.0 (当前) | A2A 0.3.0 (标准) | G2G 2.0 (目标) |
|------|---------------|------------------|----------------|
| **协议基础** | 自定义 WebSocket | JSON-RPC 2.0 over HTTP/WebSocket | JSON-RPC 2.0 + WebSocket |
| **发现机制** | 手动配置 | Agent Card (`/.well-known/agent-card.json`) | Agent Card + 自动发现 |
| **认证方式** | Gateway Token | Bearer Token / API Key | Bearer Token + Device Auth |
| **任务模型** | 自定义任务结构 | Task + Context + Artifact | Task + Context + Artifact |
| **消息格式** | 自定义 JSON | A2A Part (Text/File/Data) | A2A Part 兼容 |
| **流式传输** | ❌ 不支持 | ✅ SSE Streaming | ✅ SSE + WebSocket |
| **推送通知** | ❌ 不支持 | ✅ Webhook 推送 | ✅ Webhook + WebSocket |
| **状态历史** | ❌ 无 | ✅ State Transition History | ✅ 完整历史 |
| **错误处理** | 自定义错误码 | JSON-RPC 标准错误 | JSON-RPC 标准错误 |
| **兼容性** | OpenClaw 专用 | 跨平台 (Google/微软等) | 跨平台 + OpenClaw 优化 |

---

## 🔍 根本问题分析

### G2G 1.0 的问题

1. **协议封闭**
   - 自定义消息格式，无法与其他 A2A 实现互操作
   - 锁定 OpenClaw 生态

2. **认证机制单一**
   - 仅支持 Gateway Token
   - 不支持 scopes 授权
   - 无法细粒度控制权限

3. **缺少标准化发现**
   - 需要手动配置 Worker 地址
   - 无法动态发现新 Worker

4. **任务模型不兼容**
   - Task 结构与 A2A 不兼容
   - 无法传递 FilePart/DataPart
   - 缺少 Artifact 概念

5. **缺少流式能力**
   - 无法实时推送任务进度
   - 长任务容易超时

---

## 🎯 G2G 2.0 设计目标

### 核心原则

1. **A2A 优先** - 默认遵循 A2A 0.3.0 协议
2. **向后兼容** - 保留 G2G 1.0 的 OpenClaw 优化
3. **渐进增强** - 支持逐步升级
4. **互操作性** - 可与任何 A2A 实现通信

### 架构设计

```
┌─────────────────────────────────────────────────────────┐
│              G2G 2.0 Gateway (Orchestrator)             │
│                                                         │
│  ┌──────────────────┐    ┌──────────────────────────┐  │
│  │  A2A Adapter     │    │  G2G Legacy Adapter      │  │
│  │  (JSON-RPC)      │    │  (WebSocket)             │  │
│  │                  │    │                          │  │
│  │  - Agent Card    │    │  - Register/Deregister   │  │
│  │  - Task Manager  │    │  - Task Submit           │  │
│  │  - Part Handler  │    │  - Heartbeat             │  │
│  └────────┬─────────┘    └────────────┬─────────────┘  │
│           │                           │                 │
│           └───────────┬───────────────┘                 │
│                       │                                 │
│              ┌────────▼────────┐                        │
│              │  Protocol Router │                       │
│              │  (Auto-detect)   │                       │
│              └────────┬─────────┘                       │
│                       │                                 │
│         ┌─────────────┼─────────────┐                   │
│         │             │             │                   │
│         ▼             ▼             ▼                   │
│    ┌────────┐   ┌────────┐   ┌────────┐                │
│    │ A2A    │   │ A2A    │   │ G2G    │                │
│    │ Worker │   │ Worker │   │ Worker │                │
│    │ (Std)  │   │ (Std)  │   │ (Legacy)│               │
│    └────────┘   └────────┘   └────────┘                │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 G2G 2.0 协议规范

### 1. Agent Card 扩展

G2G Worker 必须提供 Agent Card，并扩展 G2G 特定字段：

```json
{
  "protocolVersion": "0.3.0",
  "version": "2.0.0",
  "name": "Emgran-Worker-01",
  "description": "Emgran G2G 2.0 Worker Gateway",
  "url": "http://worker-01.local:19790/a2a/jsonrpc",
  "skills": [
    {
      "id": "g2g-task",
      "name": "G2G Task Execution",
      "description": "Execute tasks from Orchestrator"
    }
  ],
  "capabilities": {
    "streaming": true,
    "pushNotifications": true,
    "stateTransitionHistory": true
  },
  "g2g": {
    "orchestratorUrl": "http://orchestrator.local:19789",
    "workerId": "worker-01",
    "capabilities": {
      "tools": ["sessions_spawn", "sessions_send", "exec"],
      "models": ["qwen3.5-plus", "glm-5"],
      "maxConcurrent": 10
    },
    "heartbeat": {
      "interval": 30000,
      "timeout": 90000
    }
  }
}
```

### 2. 任务提交 (A2A 兼容)

```json
{
  "jsonrpc": "2.0",
  "id": "task-001",
  "method": "tasks/send",
  "params": {
    "message": {
      "messageId": "msg-001",
      "parts": [
        {
          "kind": "text",
          "text": "Execute this task: ..."
        }
      ]
    },
    "configuration": {
      "blocking": false,
      "historyLength": 50
    },
    "g2g": {
      "taskId": "g2g-task-001",
      "priority": "high",
      "timeout": 300000,
      "callback": {
        "url": "http://orchestrator.local:19789/g2g/callback",
        "token": "orchestrator-token"
      }
    }
  }
}
```

### 3. 任务状态更新 (SSE Streaming)

```
event: task-update
data: {
  "kind": "task",
  "id": "task-001",
  "contextId": "ctx-001",
  "status": {
    "state": "working",
    "timestamp": "2026-03-16T15:30:00Z",
    "message": {
      "parts": [{"kind": "text", "text": "Processing..."}]
    }
  },
  "history": [...],
  "g2g": {
    "progress": 50,
    "estimatedCompletion": "2026-03-16T15:35:00Z"
  }
}
```

### 4. 推送通知 (Webhook)

```json
{
  "eventType": "task.completed",
  "timestamp": "2026-03-16T15:35:00Z",
  "payload": {
    "taskId": "task-001",
    "contextId": "ctx-001",
    "status": {
      "state": "completed",
      "message": {
        "parts": [
          {
            "kind": "text",
            "text": "Task completed successfully"
          }
        ]
      }
    },
    "artifacts": [
      {
        "artifactId": "artifact-001",
        "parts": [...]
      }
    ]
  },
  "g2g": {
    "workerId": "worker-01",
    "executionTime": 300000,
    "metrics": {
      "tokensUsed": 5000,
      "cost": 0.01
    }
  }
}
```

---

## 🛠️ 实现路线图

### Phase 1: A2A 基础兼容 (P0)

**目标**: 支持标准 A2A 协议

- [ ] 实现 Agent Card 端点
- [ ] 实现 JSON-RPC 传输层
- [ ] 实现 Task Manager (A2A 兼容)
- [ ] 实现 Part Handler (Text/File/Data)
- [ ] 实现 Bearer Token 认证

**交付物**:
- `src/a2a/agent-card.ts`
- `src/a2a/jsonrpc-transport.ts`
- `src/a2a/task-manager.ts`
- `src/a2a/part-handler.ts`

### Phase 2: G2G 扩展 (P1)

**目标**: 添加 G2G 特定功能

- [ ] 实现 G2G Agent Card 扩展字段
- [ ] 实现 Worker 注册/发现
- [ ] 实现心跳机制
- [ ] 实现任务优先级
- [ ] 实现回调通知

**交付物**:
- `src/g2g/worker-registry.ts`
- `src/g2g/heartbeat.ts`
- `src/g2g/callback-handler.ts`

### Phase 3: 流式与推送 (P2)

**目标**: 实时通信能力

- [ ] 实现 SSE Streaming
- [ ] 实现 WebSocket 推送
- [ ] 实现 Webhook 通知
- [ ] 实现任务进度跟踪
- [ ] 实现取消任务

**交付物**:
- `src/streaming/sse-handler.ts`
- `src/streaming/websocket-pusher.ts`
- `src/streaming/progress-tracker.ts`

### Phase 4: 向后兼容 (P3)

**目标**: 支持 G2G 1.0 Worker

- [ ] 实现协议路由器
- [ ] 实现 G2G 1.0 Adapter
- [ ] 实现协议自动检测
- [ ] 实现渐进升级策略

**交付物**:
- `src/compat/protocol-router.ts`
- `src/compat/g2g-v1-adapter.ts`

---

## 📋 迁移指南

### 从 G2G 1.0 升级

```bash
# 1. 备份现有配置
cp ~/.openclaw/g2g-config.json ~/.openclaw/g2g-config.v1.backup

# 2. 安装 G2G 2.0
openclaw skills install ./emgran-g2g-v2

# 3. 更新配置 (自动迁移)
openclaw g2g migrate --from v1 --to v2

# 4. 验证升级
openclaw g2g status

# 5. 重启 Gateway
openclaw gateway restart
```

### 从 A2A 标准实现迁移

```bash
# 1. 导入现有 Agent Card
openclaw g2g import-agent-card --url http://existing-a2a/agent-card.json

# 2. 配置 G2G 扩展
openclaw config set plugins.entries.g2g-v2.config.g2g.enabled true

# 3. 测试连接
openclaw g2g test --worker worker-01

# 4. 启用
openclaw config set plugins.entries.g2g-v2.enabled true
```

---

## ✅ 成功指标

| 指标 | 目标 | 测量方式 |
|------|------|----------|
| **A2A 兼容性** | 100% | A2A 官方测试套件 |
| **G2G 1.0 兼容** | 100% | 现有 Worker 无缝升级 |
| **跨平台互操作** | ✅ 支持 | 与 Google/Microsoft A2A 通信 |
| **性能提升** | >20% | 任务完成时间对比 |
| **错误率** | <1% | 任务失败率 |
| **文档完整度** | 100% | API 文档覆盖率 |

---

## 🔗 参考资源

- [A2A 0.3.0 协议规范](https://github.com/google/A2A)
- [JSON-RPC 2.0 规范](https://www.jsonrpc.org/specification)
- [G2G 1.0 协议](./PROTOCOL.md)
- [G2G 可行性报告](./FEASIBILITY-REPORT.md)

---

**版本**: v2.0.0-draft  
**维护者**: Emgran Architect  
**最后更新**: 2026-03-16
