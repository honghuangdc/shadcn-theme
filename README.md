# @soybeanjs/shadcn-theme

一个功能强大且灵活的 shadcn/ui 主题生成器，支持动态 CSS 变量注入、预设配色方案和深浅模式切换。

## ✨ 特性

- 🎨 **丰富的预设主题** - 提供多种基础色板、主题色和反馈色预设
- 🌗 **深浅模式支持** - 内置深色模式支持，可自动生成深色变体
- 🎯 **灵活的配色方案** - 支持 HSL 和 OKLCH 两种颜色格式
- 🔧 **高度可定制** - 支持完全自定义主题颜色配置
- 📦 **零运行时依赖** - 仅依赖 `@soybeanjs/colord` 进行颜色处理
- 🚀 **即插即用** - 自动将 CSS 变量注入到 DOM 中
- 🎭 **扩展色板** - 支持侧边栏、图表等扩展场景的主题定制
- 🌈 **颜色调色板生成** - 自动生成主要颜色的渐变色板（50-950）

## 📦 安装

```bash
pnpm add @soybeanjs/shadcn-theme
```

## 🚀 快速开始

### 使用预设主题

```typescript
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';

// 使用默认预设（slate + indigo + classic）
createShadcnTheme();

// 自定义预设组合
createShadcnTheme({
  presets: {
    base: 'zinc',      // 基础色板：stone | zinc | neutral | gray | slate
    theme: 'blue',     // 主题色：任意 Tailwind 色板名称
    feedback: 'vivid'  // 反馈色风格：classic | vivid | subtle | warm | cool 等
  },
  radius: '0.5rem',    // 圆角大小
  darkSelector: 'class', // 深色模式选择器：'class' | 'media' | 自定义
  format: 'hsl'        // 颜色格式：'hsl' | 'oklch'
});
```

### 自定义主题颜色

```typescript
createShadcnTheme({
  theme: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'oklch(20% 0 0)',
      primary: 'oklch(50% 0.2 250)',
      primaryForeground: 'oklch(100% 0 0)',
      // ... 更多颜色配置
    },
    dark: {
      // 可选，如果不提供会自动生成深色变体
      background: 'oklch(20% 0 0)',
      foreground: 'oklch(100% 0 0)',
      // ...
    }
  }
});
```

## 📖 API 文档

### `createShadcnTheme(options?: ThemeOptions)`

主函数，用于创建并应用主题。

#### ThemeOptions

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `presets` | `PresetConfig` | - | 预设配置，优先级高于 `theme` |
| `theme` | `ThemeConfig` | - | 自定义主题颜色配置 |
| `radius` | `string` | `'0.625rem'` | 全局圆角大小 |
| `styleId` | `string` | `'SHADCN_THEME_STYLES'` | 注入的 style 标签 ID |
| `styleTarget` | `'html' \| ':root'` | `':root'` | CSS 变量挂载目标 |
| `darkSelector` | `string` | `'class'` | 深色模式选择器 |
| `format` | `'hsl' \| 'oklch'` | `'hsl'` | 颜色输出格式 |

### 预设配置（PresetConfig）

```typescript
interface PresetConfig {
  base?: 'stone' | 'zinc' | 'neutral' | 'gray' | 'slate';  // 默认: 'slate'
  theme?: TailwindPaletteKey;  // 任意 Tailwind 色板，默认: 'indigo'
  feedback?: FeedbackPaletteKey;  // 反馈色风格，默认: 'classic'
}
```

#### 反馈色风格（FeedbackPaletteKey）

| 风格 | 描述 | 适用场景 |
|------|------|----------|
| `classic` | 经典标准 | 最常见的组合，适用于大多数场景 |
| `vivid` | 鲜艳活力 | 高饱和度，适合年轻化产品和创意应用 |
| `subtle` | 柔和优雅 | 低对比度，适合高端品牌和优雅界面 |
| `warm` | 暖色温馨 | 暖色调为主，营造友好温暖的氛围 |
| `cool` | 冷色专业 | 冷色调为主，适合科技和专业应用 |
| `nature` | 自然清新 | 自然色系，适合环保、健康类产品 |
| `modern` | 现代简约 | 现代感强，适合科技产品和 SaaS 应用 |
| `vibrant` | 活力四射 | 高能量配色，适合运动、游戏类应用 |
| `professional` | 商务专业 | 稳重大气，适合企业级应用和 B2B 产品 |
| `soft` | 梦幻柔美 | 柔和色调，适合设计工具和创意平台 |
| `bold` | 大胆醒目 | 高对比度，适合需要强烈视觉冲击的场景 |
| `calm` | 平静舒缓 | 低饱和度，适合长时间使用的应用 |
| `candy` | 糖果色彩 | 明快可爱，适合儿童产品和趣味应用 |
| `deep` | 深邃神秘 | 深色调，适合暗黑主题和神秘风格 |
| `light` | 清新淡雅 | 浅色调，适合简洁清爽的界面 |

### 主题颜色配置（ThemeColors）

支持配置以下颜色变量：

#### 基础颜色
- `background` - 背景色
- `foreground` - 前景色（文本）
- `card` - 卡片背景
- `cardForeground` - 卡片前景色
- `popover` - 弹出层背景
- `popoverForeground` - 弹出层前景色
- `primary` - 主色
- `primaryForeground` - 主色前景
- `secondary` - 次要色
- `secondaryForeground` - 次要色前景
- `muted` - 静音色
- `mutedForeground` - 静音色前景
- `accent` - 强调色
- `accentForeground` - 强调色前景
- `destructive` - 破坏性操作色
- `destructiveForeground` - 破坏性操作前景色
- `border` - 边框色
- `input` - 输入框边框色
- `ring` - 聚焦环颜色

#### 扩展颜色
- `success` / `successForeground` - 成功状态
- `warning` / `warningForeground` - 警告状态
- `info` / `infoForeground` - 信息状态
- `carbon` / `carbonForeground` - 碳色（额外的深色系）

#### 侧边栏颜色
- `sidebar` - 侧边栏背景
- `sidebarForeground` - 侧边栏前景
- `sidebarPrimary` - 侧边栏主色
- `sidebarPrimaryForeground` - 侧边栏主色前景
- `sidebarAccent` - 侧边栏强调色
- `sidebarAccentForeground` - 侧边栏强调色前景
- `sidebarBorder` - 侧边栏边框
- `sidebarRing` - 侧边栏聚焦环

#### 图表颜色
- `chart1` ~ `chart5` - 图表配色

### 颜色值格式（ColorValue）

支持三种颜色值格式：

1. **HSL 格式**
```typescript
'hsl(0 0% 100%)'
'hsl(0 0% 100% / 0.5)' // 带透明度
```

2. **OKLCH 格式**
```typescript
'oklch(100% 0 0)'
'oklch(100% 0 0 / 0.5)' // 带透明度
```

3. **Tailwind 色板引用**
```typescript
'slate.500'
'blue.600'
'red.50'
```

## 🎨 使用示例

### 示例 1: 经典蓝色主题

```typescript
createShadcnTheme({
  presets: {
    base: 'slate',
    theme: 'blue',
    feedback: 'classic'
  },
  radius: '0.5rem',
  darkSelector: 'class'
});
```

### 示例 2: 现代紫色主题

```typescript
createShadcnTheme({
  presets: {
    base: 'zinc',
    theme: 'violet',
    feedback: 'modern'
  },
  radius: '0.75rem',
  darkSelector: 'class',
  format: 'oklch'
});
```

### 示例 3: 自定义品牌色

```typescript
createShadcnTheme({
  theme: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'oklch(20% 0 0)',
      primary: 'oklch(50% 0.25 280)', // 自定义品牌紫色
      primaryForeground: 'oklch(100% 0 0)',
      secondary: 'oklch(95% 0.01 280)',
      secondaryForeground: 'oklch(30% 0 0)',
      // ... 其他颜色
    }
    // dark 可选，不提供会自动生成
  }
});
```

### 示例 4: 媒体查询深色模式

```typescript
createShadcnTheme({
  presets: {
    base: 'slate',
    theme: 'indigo'
  },
  darkSelector: 'media' // 使用系统偏好
});
```

### 示例 5: 自定义深色模式选择器

```typescript
createShadcnTheme({
  presets: {
    base: 'slate',
    theme: 'emerald'
  },
  darkSelector: '[data-theme="dark"]' // 自定义选择器
});
```

## 🎯 生成的 CSS 变量

调用 `createShadcnTheme()` 后，会自动在 `<head>` 中注入包含以下变量的 `<style>` 标签：

```css
:root {
  --radius: 0.625rem;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... 更多变量 */

  /* 自动生成的色板 */
  --primary-50: 239 84% 97%;
  --primary-100: 237 84% 94%;
  /* ... primary-200 到 primary-950 */

  /* 其他颜色的色板 */
  --destructive-50: ...;
  --success-50: ...;
  --warning-50: ...;
  --info-50: ...;
  --carbon-50: ...;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... 深色模式下的变量 */
}
```

## 💡 高级用法

### 动态切换主题

```typescript
// 切换到浅色主题
createShadcnTheme({
  presets: { base: 'slate', theme: 'blue' }
});

// 运行时切换到深色主题（通过切换 class）
document.documentElement.classList.add('dark');

// 切换到另一个主题
createShadcnTheme({
  presets: { base: 'zinc', theme: 'purple' }
});
```

### 在 Tailwind CSS 中使用

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          // ... 更多色阶
        },
        // ... 其他颜色
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      }
    }
  }
}
```

### 在 CSS 中使用

```css
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
}

.my-card {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
}
```

## 🔗 相关项目

- [shadcn/ui](https://ui.shadcn.com/) - 基于 Radix UI 和 Tailwind CSS 的组件库
- [@soybeanjs/colord](https://github.com/soybeanjs/colord) - 颜色处理工具库

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 👨‍💻 作者

Created by [Soybean](https://github.com/soybeanjs)
