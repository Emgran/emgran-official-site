# Live Updates Log

## 2026-03-12 15:43 GMT+8 - P2 问题修复

### 修复内容

#### BUG-005: 缺少 robots.txt ✅
- **问题**: 搜索引擎爬虫缺少指引文件
- **修复方案**: 创建 `public/robots.txt`
- **修复提交**: `fe5fe67`
- **文件内容**:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://emgran.com/sitemap.xml
  ```

#### BUG-006: 缺少 sitemap.xml ✅
- **问题**: 缺少搜索引擎索引文件
- **修复方案**: 安装 `@astrojs/sitemap` 插件并配置
- **修复提交**: `fe5fe67`
- **受影响文件**:
  - `astro.config.mjs` (添加 sitemap 集成)
  - `package.json` (新增依赖)

### 构建验证

```
✓ Completed in 2.28s.
✓ 11 page(s) built in 2.66s
[@astrojs/sitemap] `sitemap-index.xml` created at `dist`
✓ Complete!
```

### 部署状态

- **提交**: fe5fe67
- **推送**: ✅ 已推送到 origin/main
- **CI/CD**: 待触发

---

## 2026-03-12 15:36 GMT+8 - P1 问题修复

### 修复内容

#### BUG-003: 缺少语言切换器 UI ✅
- **问题**: 用户无法在页面上切换语言
- **修复方案**: 将下拉菜单改为内联样式 `EN | 中文`
- **修复提交**: `f2f47cd`
- **受影响文件**:
  - `src/components/Header.tsx`

#### BUG-004: Open Graph 标签 ✅ (已在 P0 修复)
- **问题**: 缺少社交分享标签
- **修复提交**: `7055926`
- **新增标签**: og:title, og:description, og:url, og:type, og:image

### 构建验证

```
✓ Completed in 1.90s.
✓ 11 page(s) built in 2.16s
✓ Complete!
```

### 部署状态

- **提交**: f2f47cd
- **推送**: ✅ 已推送到 origin/main
- **CI/CD**: 待触发

### 所有 QA 问题已修复 ✅

| ID | 问题 | 优先级 | 状态 |
|----|------|--------|------|
| BUG-001 | 中文页面 500 错误 | P0 | ✅ 已修复 |
| BUG-002 | 缺少 favicon | P0 | ✅ 已修复 |
| BUG-003 | 缺少语言切换器 UI | P1 | ✅ 已修复 |
| BUG-004 | Open Graph 标签 | P1 | ✅ 已修复 |
| BUG-005 | 缺少 robots.txt | P2 | ✅ 已修复 |
| BUG-006 | 缺少 sitemap.xml | P2 | ✅ 已修复 |

---

## 2026-03-12 15:34 GMT+8 - P0 紧急修复

### 修复内容

#### BUG-001: 中文页面 500 错误 ✅
- **问题**: 所有 `/zh/*` 页面返回 500 错误
- **根因**: Layout 导入路径错误 (`../` 应为 `../../`)
- **修复提交**: `b3e190f`
- **受影响文件**:
  - `src/pages/zh/index.astro`
  - `src/pages/zh/about.astro`
  - `src/pages/zh/product.astro`
  - `src/pages/zh/contact.astro`

#### BUG-002: Layout lang 属性硬编码 ✅
- **问题**: HTML lang 属性硬编码，未动态绑定
- **影响**: SEO、多语言识别、HTML 规范合规性
- **修复状态**: Layout.astro 已支持 `lang?: string` prop