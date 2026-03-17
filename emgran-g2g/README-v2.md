# G2G Bridge v2.0 - A2A 兼容的跨网关通信

**版本**: 2.0.0  
**状态**: 🚧 开发中  
**协议**: A2A 0.3.0 + G2G 扩展

---

## 🎯 核心改进

### vs G2G 1.0

| 特性 | 1.0 | 2.0 |
|------|-----|-----|
| 协议基础 | 自定义 WebSocket | JSON-RPC 2.0 + A2A |
| 发现机制 | 手动配置 | Agent Card 自动发现 |
| 认证方式 | Token | Bearer + Device Auth |
| 流式传输 | ❌ | ✅ SSE + WebSocket |
| 推送通知 | ❌ | ✅ Webhook |
| 跨平台 | ❌ | ✅ A2A 标准兼容 |

### vs A2A 标准

| 特性 | A2A 标准 | G2G 2.0 |
|------|----------|---------|
| 核心协议 | ✅ 完全兼容 | ✅ 完全兼容 |
| OpenClaw 优化 | ❌ | ✅ sessions_spawn/send |
| Worker 管理 | ❌ | ✅ 注册/心跳/负载均衡 |
| 任务优先级 | ❌ | ✅ P0/P1/P2/P3 |
| 批量任务 | ❌ | ✅ 批量提交 |

---

## 🏗️ 架构设计

```
┌──────────────────────────────────────────────────────────┐
│              Orchestrator Gateway (v2.0)                 │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │              Protocol Abstraction Layer            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │ │
│  │  │ A2A Adapter  │  │ G2G Adapter  │  │ Legacy   │ │ │
│  │  │ (Standard)   │  │ (Extended)   │  │ (v1.0)   │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│                          │                               │
│  ┌───────────────────────▼────────────────────────────┐ │
│  │              Core Services                         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │ │
│  │  │ Task     │  │ Worker   │  │ Protocol         │ │ │
│  │  │ Manager  │  │ Registry │  │ Router           │ │ │
│  │  └──────────┘  └──────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │ A2A Worker  │     │ G2G Worker  │     │ Legacy      │
    │ (Standard)  │     │ (v2.0)      │     │ Worker      │
    │             │     │             │     │ (v1.0)      │
    └─────────────┘     └─────────────┘     └─────────────┘
```

---

## 📦 核心组件

### 1. Agent Card 服务

```typescript
// src/a2a/agent-card.ts
interface G2GAgentCard extends A2AAgentCard {
  g2g: {
    orchestratorUrl: string;
    workerId: string;
    capabilities: {
      tools: string[];
      models: string[];
      maxConcurrent: number;
    };
    heartbeat: {
      interval: number;
      timeout: number;
    };
  };
}
```

### 2. 协议路由器

```typescript
// src/compat/protocol-router.ts
class ProtocolRouter {
  async detectProtocol(url: string): Promise<'a2a' | 'g2g-v2' | 'g2g-v1'> {
    // 1. 尝试获取 Agent Card
    // 2. 检查 g2g 扩展字段
    // 3. 回退到 WebSocket 探测
  }
  
  async sendMessage(msg: G2GMessage): Promise<G2GResponse> {
    const protocol = await this.detectProtocol(msg.target);
    switch (protocol) {
      case 'a2a':
        return this.sendViaA2A(msg);
      case 'g2g-v2':
        return this.sendViaG2Gv2(msg);
      case 'g2g-v1':
        return this.sendViaG2Gv1(msg);
    }
  }
}
```

### 3. Worker 注册表

```typescript
// src/g2g/worker-registry.ts
interface WorkerInfo {
  workerId: string;
  agentCardUrl: string;
  protocol: 'a2a' | 'g2g-v2' | 'g2g-v1';
  status: 'online' | 'offline' | 'busy';
  capabilities: WorkerCapabilities;
  lastHeartbeat: number;
  activeTasks: number;
  metrics: {
    successRate: number;
    avgExecutionTime: number;
    totalTasks: number;
  };
}

class WorkerRegistry {
  register(worker: WorkerInfo): void;
  deregister(workerId: string): void;
  getHealthyWorkers(): WorkerInfo[];
  selectWorker(task: Task): WorkerInfo;  // 负载均衡
}
```

### 4. 任务管理器

```typescript
// src/a2a/task-manager.ts
interface G2GTask extends A2ATask {
  g2g: {
    taskId: string;
    priority: 'p0' | 'p1' | 'p2' | 'p3';
    callback?: {
      url: string;
      token: string;
    };
    parentTaskId?: string;
    childTaskIds?: string[];
  };
}

class TaskManager {
  submit(task: G2GTask): Promise<TaskResponse>;
  cancel(taskId: string): Promise<void>;
  getStatus(taskId: string): Promise<TaskStatus>;
  stream(taskId: string): AsyncIterable<TaskUpdate>;
}
```

---

## 🚀 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/VibeAny/embran-platform.git
cd embran-platform/emgran-g2g-v2

# 安装依赖
npm install

# 链接到 OpenClaw
ln -s $(pwd) ~/.openclaw-beta/workspace/skills/g2g-v2
```

### 配置 Orchestrator

```json5
{
  "plugins": {
    "entries": {
      "g2g-v2": {
        "enabled": true,
        "config": {
          "mode": "orchestrator",
          "agentCard": {
            "name": "Emgran-Orchestrator",
            "description": "G2G 2.0 Orchestrator Gateway",
            "url": "http://orchestrator.local:19789/a2a/jsonrpc"
          },
          "server": {
            "host": "0.0.0.0",
            "port": 19789
          },
          "security": {
            "inboundAuth": "bearer",
            "token": "orchestrator-token"
          },
          "workers": [
            {
              "agentCardUrl": "http://worker-01.local:19790/.well-known/agent-card.json",
              "auth": { "type": "bearer", "token": "worker-01-token" }
            },
            {
              "agentCardUrl": "http://worker-02.local:19791/.well-known/agent-card.json",
              "auth": { "type": "bearer", "token": "worker-02-token" }
            }
          ]
        }
      }
    }
  }
}
```

### 配置 Worker

```json5
{
  "plugins": {
    "entries": {
      "g2g-v2": {
        "enabled": true,
        "config": {
          "mode": "worker",
          "agentCard": {
            "name": "Emgran-Worker-01",
            "description": "G2G 2.0 Worker Gateway",
            "url": "http://worker-01.local:19790/a2a/jsonrpc"
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
          },
          "server": {
            "host": "0.0.0.0",
            "port": 19790
          },
          "security": {
            "inboundAuth": "bearer",
            "token": "worker-01-token"
          }
        }
      }
    }
  }
}
```

### 测试连接

```bash
# 检查 Worker 状态
openclaw g2g-v2 status

# 测试任务提交
openclaw g2g-v2 test \
  --worker worker-01 \
  --message "Hello from orchestrator"

# 查看任务历史
openclaw g2g-v2 tasks list

# 监控实时任务
openclaw g2g-v2 tasks watch
```

---

## 📊 负载均衡策略

### 内置策略

```typescript
type LoadBalanceStrategy = 
  | 'round-robin'      // 轮询
  | 'least-connections' // 最少连接
  | 'least-load'        // 最少负载
  | 'latency-based'     // 延迟优先
  | 'affinity';         // 会话亲和

class LoadBalancer {
  constructor(strategy: LoadBalanceStrategy);
  
  selectWorker(task: Task, workers: WorkerInfo[]): WorkerInfo {
    switch (this.strategy) {
      case 'round-robin':
        return this.selectRoundRobin(workers);
      case 'least-connections':
        return this.selectLeastConnections(workers);
      case 'least-load':
        return this.selectLeastLoad(workers);
      // ...
    }
  }
}
```

### 自定义策略

```typescript
class CustomLoadBalancer extends LoadBalancer {
  selectWorker(task: Task, workers: WorkerInfo[]): WorkerInfo {
    // 自定义逻辑
    // 例如：优先选择有特定工具的 Worker
    return workers.find(w => 
      w.capabilities.tools.includes(task.requiredTool)
    );
  }
}
```

---

## 🔒 安全特性

### 认证方式

| 方式 | 配置 | 安全级别 | 适用场景 |
|------|------|----------|----------|
| **Bearer Token** | `inboundAuth: "bearer"` | ⭐⭐⭐ | 生产环境 |
| **Device Auth** | `inboundAuth: "device"` | ⭐⭐⭐⭐ | 高安全场景 |
| **mTLS** | `tls.clientAuth: "required"` | ⭐⭐⭐⭐⭐ | 企业环境 |

### 权限控制

```json5
{
  "security": {
    "scopes": {
      "worker": [
        "g2g.task.receive",
        "g2g.task.execute",
        "g2g.task.report"
      ],
      "orchestrator": [
        "g2g.task.submit",
        "g2g.task.cancel",
        "g2g.worker.manage"
      ]
    }
  }
}
```

---

## 📈 监控与指标

### 内置指标

```typescript
interface G2GMetrics {
  tasks: {
    submitted: number;
    completed: number;
    failed: number;
    canceled: number;
    avgExecutionTime: number;
  };
  workers: {
    online: number;
    offline: number;
    busy: number;
  };
  protocol: {
    a2a: number;
    g2gV2: number;
    g2gV1: number;
  };
}
```

### Prometheus 导出

```bash
# 启用指标端点
openclaw config set plugins.entries.g2g-v2.config.observability.exposeMetricsEndpoint true

# 访问指标
curl http://localhost:19789/g2g-v2/metrics
```

---

## 🧪 测试

### 单元测试

```bash
npm test
```

### 集成测试

```bash
# 启动测试集群
./scripts/start-test-cluster.sh

# 运行集成测试
npm run test:integration

# 清理
./scripts/stop-test-cluster.sh
```

### 性能测试

```bash
# 基准测试
npm run bench

# 负载测试
npm run bench:load -- --workers 10 --tasks 1000

# 压力测试
npm run bench:stress -- --duration 1h
```

---

## 📚 API 文档

### REST API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/.well-known/agent-card.json` | GET | Agent Card |
| `/a2a/jsonrpc` | POST | JSON-RPC |
| `/a2a/rest` | POST | REST Transport |
| `/g2g-v2/workers` | GET | Worker 列表 |
| `/g2g-v2/workers/:id` | GET | Worker 详情 |
| `/g2g-v2/tasks` | POST | 提交任务 |
| `/g2g-v2/tasks/:id` | GET | 任务状态 |
| `/g2g-v2/tasks/:id/cancel` | POST | 取消任务 |
| `/g2g-v2/metrics` | GET | 监控指标 |

### WebSocket API

| 事件 | 方向 | 描述 |
|------|------|------|
| `g2g.register` | W→O | Worker 注册 |
| `g2g.heartbeat` | W→O | 心跳 |
| `g2g.task.submit` | O→W | 任务提交 |
| `g2g.task.update` | W→O | 任务更新 |
| `g2g.task.complete` | W→O | 任务完成 |

---

## 🔗 参考资源

- [A2A 0.3.0 协议](https://github.com/google/A2A)
- [G2G vs A2A 分析](./docs/G2G-VS-A2A-ANALYSIS.md)
- [G2G 1.0 协议](./docs/PROTOCOL.md)
- [JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

**License**: MIT  
**维护者**: Emgran Architect  
**最后更新**: 2026-03-16
