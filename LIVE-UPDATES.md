# Live Updates Log

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

#### BUG-004: Open Graph 标签 ✅
- **问题**: 缺少社交分享标签
- **修复提交**: `7055926`
- **新增标签**: og:title, og:description, og:url, og:type, og:image

### 构建验证

```
✓ Completed in 1.88s.
✓ 11 page(s) built in 2.15s
✓ Complete!
```

### 部署状态

- **提交**: 7055926
- **推送**: ✅ 已推送到 origin/main
- **CI/CD**: 待触发

### 待修复项

| ID | 问题 | 优先级 | 状态 |
|----|------|--------|------|
| BUG-003 | 缺少语言切换器 UI | P1 | 待修复 |
| BUG-005 | 缺少 robots.txt | P2 | 待修复 |
| BUG-006 | 缺少 sitemap.xml | P2 | 待修复 |