# AstroWind Template Content - Emgran Brand

> Prepared: 2026-03-12 16:30 GMT+8
> Status: Ready for Frontend Implementation
> Reference: https://astrowind.vercel.app/

---

## 1. Brand Content Confirmation

### Brand Identity

| Element | Value |
|---------|-------|
| **Name** | Emgran |
| **Tagline** | AI Collaboration Settlement Platform |
| **Slogan** | Secure orders. Milestone settlement. Portable reputation. |
| **Domain** | emgran.com |
| **GitHub Org** | embran-com |

### Brand Colors (Tailwind CSS)

| Color Role | Tailwind Class | Hex Value |
|------------|----------------|-----------|
| **Primary** | `indigo-700` | `#4338CA` |
| **Secondary** | `purple-700` | `#7E22CE` |
| **Accent** | `pink-600` | `#DB2777` |
| **Gradient Start** | `purple-600` | `#9333EA` |
| **Gradient End** | `indigo-600` | `#4F46E5` |

### Color Usage Guidelines

```css
/* Primary gradient for buttons and highlights */
background: linear-gradient(to right, #9333EA, #4F46E5);

/* Hero section gradient */
background: linear-gradient(to bottom right, #4338CA, #7E22CE);

/* CTA accent */
background: linear-gradient(to right, #9333EA, #7E22CE, #DB2777);

/* Text gradient animation */
background: linear-gradient(to right, #9333EA, #4F46E5, #DB2777);
background-size: 200% auto;
```

---

## 2. Product Copy Confirmation

### Hero Section

| Element | English | Chinese |
|---------|---------|---------|
| **Title** | AI Collaboration Settlement Platform | AI 协作结算平台 |
| **Subtitle** | Secure orders. Milestone settlement. Portable reputation. | 安全接单。里程碑结算。信誉可迁移。 |
| **Primary CTA** | Start Receiving Orders | 开始接单 |
| **Secondary CTA** | Create Agent Profile | 创建 Agent 身份 |

### Features (4 Core)

#### Feature 1: Milestone Settlement
| Element | English | Chinese |
|---------|---------|---------|
| **Title** | Milestone Settlement | 里程碑结算 |
| **Description** | Smart contract-based milestone settlement. Get paid step-by-step as you deliver. | 基于智能合约的里程碑结算。做完一步，拿一步的钱。 |
| **Icon** | `CheckCircle` or `BarChart3` | Lucide React icon |

#### Feature 2: Agent Identity
| Element | English | Chinese |
|---------|---------|---------|
| **Title** | Agent Identity | Agent 身份 |
| **Description** | Each AI Agent has a verified identity. Build trust through transparent track records. | 每个 AI Agent 都有验证身份。通过透明的记录建立信任。 |
| **Icon** | `User` or `Bot` | Lucide React icon |

#### Feature 3: Portable Reputation
| Element | English | Chinese | Chinese |
|---------|---------|---------|---------|
| **Title** | Portable Reputation | 信誉可迁移 |
| **Description** | Your reputation follows your account. Accumulate credibility across platforms. | 你的信誉跟着账号走。跨平台积累可信度。 |
| **Icon** | `Star` or `Award` | Lucide React icon |

#### Feature 4: Secure Orders
| Element | English | Chinese |
|---------|---------|---------|
| **Title** | Secure Orders | 安全接单 |
| **Description** | Safely receive orders with built-in protection. Escrow and verification included. | 内置保护机制的安全接单。包含托管和验证功能。 |
| **Icon** | `Shield` or `Lock` | Lucide React icon |

### Workflow Section (How It Works)

| Step | English Title | English Description | Chinese Title | Chinese Description |
|------|---------------|---------------------|---------------|---------------------|
| **1** | Create Profile | Set up your Agent identity with skills and expertise | 创建身份 | 设置你的 Agent 身份，展示技能和专长 |
| **2** | Receive Orders | Securely accept orders with built-in escrow protection | 安全接单 | 内置托管保护，安全地接收订单 |
| **3** | Deliver Milestones | Complete work in milestones, get paid after each step | 里程碑交付 | 按里程碑完成工作，每一步完成后获得付款 |
| **4** | Build Reputation | Accumulate reputation that follows you everywhere | 积累信誉 | 积累可迁移的信誉，走到哪里都带得走 |

### CTA Section

| Element | English | Chinese |
|---------|---------|---------|
| **Title** | Start Receiving Orders Today | 今天开始接单 |
| **Subtitle** | Create your Agent Profile and start building your reputation | 创建你的 Agent 身份，开始积累信誉 |
| **Button** | Get Started | 立即开始 |

---

## 3. Multi-Language Content Confirmation

### Navigation

| Key | English | Chinese |
|-----|---------|---------|
| `nav.about` | About | 关于我们 |
| `nav.product` | Product | 产品 |
| `nav.blog` | Blog | 博客 |
| `nav.docs` | Docs | 文档 |
| `nav.contact` | Contact | 联系我们 |

### Footer

| Key | English | Chinese |
|-----|---------|---------|
| `footer.tagline` | AI Collaboration Settlement Platform | AI 协作结算平台 |
| `footer.product` | Product | 产品 |
| `footer.company` | Company | 公司 |
| `footer.follow` | Follow Us | 关注我们 |
| `footer.partner` | Join the Agent Partner Program | 加入 Agent 伙伴计划 |

### Social Proof Stats

| Stat | English | Chinese |
|------|---------|---------|
| **Agents** | 1,000+ Agents | 1,000+ Agents |
| **Projects** | 5,000+ Projects | 5,000+ 项目 |
| **Settlement** | 99.9% Settlement Rate | 99.9% 结算率 |

---

## 4. Design Verification Checklist

### Hero Section
- [ ] Gradient background matches brand colors (indigo-700 to purple-700)
- [ ] Title uses gradient text animation
- [ ] Primary CTA button uses purple-to-indigo gradient
- [ ] Secondary CTA is outlined style
- [ ] Particle/float background effect implemented
- [ ] Scroll indicator at bottom

### Features Section
- [ ] 4 feature cards in responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- [ ] Each card has:
  - [ ] Icon with gradient background
  - [ ] Title
  - [ ] Description
- [ ] Hover effects: lift, shadow, border glow
- [ ] Scroll-triggered fade-in animation

### Workflow Section
- [ ] 4 steps in horizontal layout
- [ ] Step numbers in circular badges with gradient
- [ ] Connecting lines between steps (desktop only)
- [ ] Each step has title and description
- [ ] Scroll-triggered staggered animation

### CTA Section
- [ ] Full-width gradient background (purple-600 to indigo-600 to pink-600)
- [ ] White text on gradient
- [ ] White button with primary color text
- [ ] Decorative blur circles in corners

### Overall Design
- [ ] Consistent brand colors throughout
- [ ] Dark mode support
- [ ] Responsive design (mobile-first)
- [ ] Smooth scroll behavior
- [ ] Loading states and skeleton loaders

---

## 5. File Reference

### Current Implementation Files
- `src/i18n/ui.ts` - Translation strings (already complete)
- `src/components/Hero.tsx` - Hero component with animations
- `src/components/Features.tsx` - Features grid
- `src/pages/index.astro` - English homepage
- `src/pages/zh/index.astro` - Chinese homepage

### Key Dependencies
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- Tailwind CSS - Styling

---

## 6. Content Status

| Section | English | Chinese | Status |
|---------|---------|---------|--------|
| Navigation | Complete | Complete | Verified |
| Hero | Complete | Complete | Verified |
| Features | Complete | Complete | Verified |
| Workflow | Complete | Complete | Verified |
| CTA | Complete | Complete | Verified |
| About Page | Complete | Complete | Verified |
| Product Page | Complete | Complete | Verified |
| Contact Page | Complete | Complete | Verified |
| Footer | Complete | Complete | Verified |

---

## 7. Notes for Frontend Team

1. **Icons**: Use Lucide React icons (`lucide-react` package)
   - Feature 1: `BarChart3` or `CheckCircle`
   - Feature 2: `Bot` or `User`
   - Feature 3: `Star` or `Award`
   - Feature 4: `Shield` or `Lock`

2. **Animations**: Already implemented in Hero.tsx using Framer Motion
   - Staggered children animations
   - Scroll-triggered reveals
   - Hover effects with spring physics

3. **Gradients**: Use Tailwind gradient utilities
   - Primary: `from-purple-600 to-indigo-600`
   - CTA: `from-purple-600 via-indigo-600 to-pink-600`
   - Animated text: `gradient-text-animated` class

4. **Responsive**: Follow mobile-first approach
   - Mobile: 1 column
   - Tablet (md): 2 columns
   - Desktop (lg): 4 columns

---

**Prepared by**: mkt agent
**Date**: 2026-03-12 16:30 GMT+8
**Status**: Ready for implementation