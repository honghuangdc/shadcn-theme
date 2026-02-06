# @soybeanjs/shadcn-theme

一个功能强大且灵活的 shadcn/ui 主题 CSS 变量生成器，提供预设配色方案、深浅模式输出，以及可选的自定义预设扩展。

[English](./README.en_US.md)

## ✨ 特性

- 🎨 **丰富的预设主题** - 内置 base / primary / feedback 多种预设组合
- 🌗 **深浅模式输出** - 支持 `.dark` / `@media (prefers-color-scheme: dark)` / 自定义选择器
- 🎯 **灵活的颜色格式** - 支持 `hsl` 与 `oklch` 输出
- 🔧 **可扩展** - 通过 `preset` 注入自定义配色（含 sidebar / chart 等扩展字段）
- 🌈 **色板变量生成** - 自动生成 primary/destructive/success/warning/info/carbon 的 50-950 色阶变量
- 📦 **轻量依赖** - 仅依赖 `@soybeanjs/colord` 进行颜色与色板处理
- 🧩 **纯生成器** - 仅返回 CSS 字符串，不会自动操作 DOM（可自行注入 style 标签）

## 📦 安装

```bash
pnpm add @soybeanjs/shadcn-theme
```

## 🚀 快速开始

### 使用预设主题

```typescript
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';

// 使用默认预设（gray + indigo + classic + extended）
const theme = createShadcnTheme();
const css = theme.getCss();

// 自定义预设组合
const custom = createShadcnTheme({
  base: 'zinc',
  primary: 'blue',
  feedback: 'vivid',
  sidebar: 'extended',
  radius: '0.625rem',
  styleTarget: ':root',
  darkSelector: 'class',
  format: 'hsl'
});

const customCss = custom.getCss();
```

###（可选）注入到 DOM

本库默认只生成 CSS 字符串。如果你希望在浏览器里动态切换主题，可以自行把生成结果写入 `<style>`：

```ts
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';

const theme = createShadcnTheme({ primary: 'indigo' });

function applyTheme(cssText: string, styleId = 'SHADCN_THEME_STYLE') {
  const el = document.getElementById(styleId) ?? document.createElement('style');
  el.id = styleId;
  el.textContent = cssText;
  document.head.appendChild(el);
}

applyTheme(theme.getCss());
// 之后只要更新 style 内容即可实现主题切换
applyTheme(theme.getCss({ primary: 'emerald' }));
```

### 自定义预设

`preset` 用于在内置预设的基础上“新增/覆盖”一组命名的配色方案。你可以只扩展某一类（例如只加一个 `primary` 预设），也可以同时扩展 `base / primary / feedback / sidebar`。

#### 1) 预设结构与如何引用

- `preset` 是一个对象，下面可包含 `base / primary / feedback / sidebar` 四个分组；每个分组都是 `{ [key: string]: PresetItem }`。
- 想使用你新增的预设，只需要把对应的 `base` / `primary` / `feedback` / `sidebar` 设为你定义的 key。
- 例：你在 `preset.primary` 里定义了 `brandPrimary`，那么传入 `primary: 'brandPrimary'` 就会选中它。

#### 2) 合并/覆盖规则

本库会把你的 `preset` 与内置预设做浅合并：

- 同名 key 会被你的 `preset` 覆盖（例如你定义了 `primary.indigo`，会覆盖内置的 `indigo`）
- 不同名 key 会作为新增预设加入（例如新增 `primary.brandPrimary`）

#### 3) sidebar 的两个模式

- `sidebar: 'extended'`（默认）：不会读取 `preset.sidebar`，而是由 base/primary 的结果自动派生一套 sidebar 颜色。
- `sidebar: '<yourKey>'`：会读取 `preset.sidebar[<yourKey>]` 作为 sidebar 配色。

#### 4) 颜色值与 `format`

- 预设里每个颜色值都支持三种写法：Tailwind 色板引用（如 `slate.500`）、`hsl(...)`、`oklch(...)`。
- `format: 'hsl'`：输出变量值为 `h s l [/ alpha]`（不含 `hsl(...)` 外层）；如果输入是 `oklch(...)` 会转换为 hsl。
- `format: 'oklch'`：输出变量值包含 `oklch(...)` 外层；如果输入是 `hsl(...)` 会转换为 oklch。

#### 快速示例：只新增一个 primary 预设（推荐从小块开始）

`primary` 预设只需要覆盖 `primary / ring / chart1~chart5`，字段相对最少：

```ts
const theme = createShadcnTheme({
  // 使用你新增的 primary key
  primary: 'brandPrimary',
  preset: {
    primary: {
      brandPrimary: {
        light: {
          primary: 'blue.600',
          ring: 'blue.400',
          chart1: 'orange.600',
          chart2: 'teal.600',
          chart3: 'cyan.900',
          chart4: 'amber.400',
          chart5: 'amber.500'
        },
        dark: {
          primary: 'blue.400',
          ring: 'blue.500',
          chart1: 'orange.500',
          chart2: 'teal.500',
          chart3: 'cyan.400',
          chart4: 'amber.500',
          chart5: 'amber.600'
        }
      }
    }
  }
});

const css = theme.getCss();
```

#### 快速示例：新增一个 feedback 预设

```ts
const theme = createShadcnTheme({
  feedback: 'brandFeedback',
  preset: {
    feedback: {
      brandFeedback: {
        light: {
          destructive: 'red.500',
          success: 'emerald.500',
          warning: 'amber.500',
          info: 'sky.500'
        },
        dark: {
          destructive: 'red.400',
          success: 'emerald.400',
          warning: 'amber.400',
          info: 'sky.400'
        }
      }
    }
  }
});
```

#### 快速示例：使用自定义 sidebar（非 extended）

```ts
const theme = createShadcnTheme({
  sidebar: 'brandSidebar',
  preset: {
    sidebar: {
      brandSidebar: {
        light: {
          sidebar: 'slate.50',
          sidebarForeground: 'slate.900',
          sidebarPrimary: 'blue.600',
          sidebarPrimaryForeground: 'slate.50',
          sidebarAccent: 'slate.100',
          sidebarAccentForeground: 'slate.900',
          sidebarBorder: 'slate.200',
          sidebarRing: 'blue.400'
        },
        dark: {
          sidebar: 'slate.950',
          sidebarForeground: 'slate.50',
          sidebarPrimary: 'blue.400',
          sidebarPrimaryForeground: 'slate.950',
          sidebarAccent: 'slate.900',
          sidebarAccentForeground: 'slate.50',
          sidebarBorder: 'slate.800',
          sidebarRing: 'blue.500'
        }
      }
    }
  }
});
```

#### 完整示例（自定义 base + primary + feedback）

```typescript
createShadcnTheme({
  base: 'demoBase',
  primary: 'demoPrimary',
  feedback: 'demoFeedback',
  preset: {
    base: {
      demoBase: {
        light: {
          background: 'oklch(100% 0 0)',
          foreground: 'stone.950',
          card: 'oklch(100% 0 0)',
          cardForeground: 'stone.950',
          popover: 'oklch(100% 0 0)',
          popoverForeground: 'stone.950',
          primaryForeground: 'stone.50',
          secondary: 'stone.100',
          secondaryForeground: 'stone.900',
          muted: 'stone.100',
          mutedForeground: 'stone.500',
          accent: 'stone.100',
          accentForeground: 'stone.900',
          destructiveForeground: 'stone.50',
          successForeground: 'stone.50',
          warningForeground: 'stone.50',
          infoForeground: 'stone.50',
          carbon: 'stone.800',
          carbonForeground: 'stone.50',
          border: 'stone.200',
          input: 'stone.200'
        },
        dark: {
          background: 'stone.950',
          foreground: 'stone.50',
          card: 'stone.900',
          cardForeground: 'stone.50',
          popover: 'stone.900',
          popoverForeground: 'stone.50',
          primaryForeground: 'stone.900',
          secondary: 'stone.800',
          secondaryForeground: 'stone.50',
          muted: 'stone.800',
          mutedForeground: 'stone.400',
          accent: 'stone.800',
          accentForeground: 'stone.50',
          destructiveForeground: 'stone.900',
          successForeground: 'stone.900',
          warningForeground: 'stone.900',
          infoForeground: 'stone.900',
          carbon: 'stone.100',
          carbonForeground: 'stone.900',
          border: 'oklch(100% 0 0 / 0.1)',
          input: 'oklch(100% 0 0 / 0.15)'
        }
      }
    },
    primary: {
      demoPrimary: {
        light: {
          primary: 'stone.800',
          ring: 'stone.400',
          chart1: 'orange.600',
          chart2: 'teal.600',
          chart3: 'cyan.900',
          chart4: 'amber.400',
          chart5: 'amber.500'
        },
        dark: {
          primary: 'stone.200',
          ring: 'stone.500',
          chart1: 'blue.700',
          chart2: 'emerald.500',
          chart3: 'amber.500',
          chart4: 'purple.500',
          chart5: 'rose.500'
        }
      }
    },
    feedback: {
      demoFeedback: {
        light: {
          destructive: 'red.500',
          success: 'green.500',
          warning: 'yellow.500',
          info: 'blue.500'
        },
        dark: {
          destructive: 'red.400',
          success: 'green.400',
          warning: 'yellow.400',
          info: 'blue.400'
        }
      }
    }
  }
});
```

## 📖 API 文档

### `createShadcnTheme(options?: ThemeOptions)`

主函数，用于创建主题 CSS 生成器。

返回值：

```ts
const theme = createShadcnTheme();

theme.getCss(config?: PresetConfig, radius?: string): string
theme.getColorCss(config: PresetConfig): string
theme.getRadiusCss(radius?: string): string
```

#### ThemeOptions

| 参数           | 类型                                 | 默认值       | 描述                                                   |
| -------------- | ------------------------------------ | ------------ | ------------------------------------------------------ |
| `base`         | `BuiltinBasePresetKey \| string`     | `'gray'`     | base 预设 key                                          |
| `primary`      | `BuiltinPrimaryPresetKey \| string`  | `'indigo'`   | primary 预设 key                                       |
| `feedback`     | `BuiltinFeedbackPresetKey \| string` | `'classic'`  | feedback 预设 key                                      |
| `sidebar`      | `'extended' \| string`               | `'extended'` | 侧边栏模式；`extended` 表示由 base/primary 自动派生    |
| `preset`       | `CustomPreset`                       | -            | 自定义预设集合（可扩展 base/primary/feedback/sidebar） |
| `radius`       | `string`                             | `'0.625rem'` | 全局圆角                                               |
| `styleTarget`  | `'html' \| ':root'`                  | `':root'`    | CSS 变量挂载目标选择器                                 |
| `darkSelector` | `'class' \| 'media' \| string`       | `'class'`    | 深色模式选择器（支持自定义字符串）                     |
| `format`       | `'hsl' \| 'oklch'`                   | `'hsl'`      | 颜色输出格式                                           |

### 预设配置（PresetConfig）

```typescript
interface PresetConfig {
  base?: string;
  primary?: string;
  feedback?: string;
  sidebar?: 'extended' | string;
}
```

#### 反馈色风格（FeedbackPaletteKey）

| 风格           | 描述     | 适用场景                             |
| -------------- | -------- | ------------------------------------ |
| `classic`      | 经典标准 | 最常见的组合，适用于大多数场景       |
| `vivid`        | 鲜艳活力 | 高饱和度，适合年轻化产品和创意应用   |
| `subtle`       | 柔和优雅 | 低对比度，适合高端品牌和优雅界面     |
| `warm`         | 暖色温馨 | 暖色调为主，营造友好温暖的氛围       |
| `cool`         | 冷色专业 | 冷色调为主，适合科技和专业应用       |
| `nature`       | 自然清新 | 自然色系，适合环保、健康类产品       |
| `modern`       | 现代简约 | 现代感强，适合科技产品和 SaaS 应用   |
| `vibrant`      | 活力四射 | 高能量配色，适合运动、游戏类应用     |
| `professional` | 商务专业 | 稳重大气，适合企业级应用和 B2B 产品  |
| `soft`         | 梦幻柔美 | 柔和色调，适合设计工具和创意平台     |
| `bold`         | 大胆醒目 | 高对比度，适合需要强烈视觉冲击的场景 |
| `calm`         | 平静舒缓 | 低饱和度，适合长时间使用的应用       |
| `candy`        | 糖果色彩 | 明快可爱，适合儿童产品和趣味应用     |
| `deep`         | 深邃神秘 | 深色调，适合暗黑主题和神秘风格       |
| `light`        | 清新淡雅 | 浅色调，适合简洁清爽的界面           |

### 主题颜色（ThemeColors）

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
'hsl(0 0% 100%)';
'hsl(0 0% 100% / 0.5)'; // 带透明度
```

2. **OKLCH 格式**

```typescript
'oklch(100% 0 0)';
'oklch(100% 0 0 / 0.5)'; // 带透明度
```

3. **Tailwind 色板引用**

```typescript
'slate.500';
'blue.600';
'red.50';
```

## 🎨 使用示例

### 示例 1: 经典蓝色主题

```typescript
const theme = createShadcnTheme({
  base: 'slate',
  primary: 'blue',
  feedback: 'classic',
  radius: '0.5rem',
  darkSelector: 'class'
});

const css = theme.getCss();
```

### 示例 2: 现代紫色主题

```typescript
const theme = createShadcnTheme({
  base: 'zinc',
  primary: 'violet',
  feedback: 'modern',
  radius: '0.75rem',
  darkSelector: 'class',
  format: 'oklch'
});

const css = theme.getCss();
```

### 示例 3: 覆盖单次生成的配色组合

```typescript
const theme = createShadcnTheme({ base: 'slate', primary: 'indigo', feedback: 'classic' });

// 默认组合
const css1 = theme.getCss();

// 仅这一次生成使用另一套组合（不会改变 theme 内部的默认项）
const css2 = theme.getCss({ primary: 'emerald', feedback: 'vivid' });
```

### 示例 4: 媒体查询深色模式

```typescript
const theme = createShadcnTheme({
  base: 'slate',
  primary: 'indigo',
  darkSelector: 'media' // 使用系统偏好
});

const css = theme.getCss();
```

### 示例 5: 自定义深色模式选择器

```typescript
const theme = createShadcnTheme({
  base: 'slate',
  primary: 'emerald',
  darkSelector: '[data-theme="dark"]' // 自定义选择器
});

const css = theme.getCss();
```

## 🎯 生成的 CSS 变量

调用 `getCss()` 会返回包含以下变量的 CSS 字符串。

当 `format: 'hsl'` 时，颜色变量值是 `h s l [/ alpha]`（不包含外层 `hsl(...)`）：

补充说明：

- 当 `format: 'hsl'` 且颜色 key 为 `border`、`input`、`sidebarBorder` 时，如果颜色值包含透明度（例如 `hsl(... / 0.1)` 或 `oklch(... / 0.1)`），会额外生成对应的透明度变量：`--border-alpha`、`--input-alpha`、`--sidebar-border-alpha`。同时 `--border` / `--input` / `--sidebar-border` 本身会只保留不带透明度的 `h s l` 值。
- 会为 `primary`、`destructive`、`success`、`warning`、`info`、`carbon` 生成 50-950 共 11 个色阶变量：`50/100/200/300/400/500/600/700/800/900/950`。

```css
:root {
  --radius: 0.625rem;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;

  /* hsl 下：border/input/sidebarBorder 会额外输出 alpha 变量 */
  --border: 214.3 31.8% 91.4%;
  --border-alpha: 0.1;
  /* ... 更多变量 */

  /* 自动生成的色板（50-950 共 11 个） */
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

当 `format: 'oklch'` 时，颜色变量值会包含 `oklch(...)` 外层括号：

```css
:root {
  --background: oklch(100% 0 0);
  --foreground: oklch(20% 0 0);
  --border: oklch(100% 0 0 / 0.1);
}
```

## 💡 高级用法

### 动态切换主题

```typescript
const theme = createShadcnTheme();

function apply(cssText: string) {
  const id = 'SHADCN_THEME_STYLE';
  const el = document.getElementById(id) ?? document.createElement('style');
  el.id = id;
  el.textContent = cssText;
  document.head.appendChild(el);
}

// 初始
apply(theme.getCss());

// 切换到另一个配色组合
apply(theme.getCss({ base: 'zinc', primary: 'purple' }));

// 深色模式切换仍由你的 darkSelector 控制（例如默认是给 html 加 .dark）
document.documentElement.classList.add('dark');
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
          100: 'hsl(var(--primary-100))'
          // ... 更多色阶
        }
        // ... 其他颜色
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  }
};
```

当你使用 `format: 'hsl'` 时，“透明度需要单独处理”，尤其是 `border` / `input` / `sidebarBorder`：

- 这些变量本身输出的是 `h s l`（不含 `/ alpha`），如果存在透明度，会额外生成 `--border-alpha` / `--input-alpha` / `--sidebar-border-alpha`。
- 在 Tailwind 中使用时，推荐用带斜杠的写法把透明度拼回去：

```js
// 固定使用生成出来的 alpha
border: 'hsl(var(--border) / var(--border-alpha))';
```

如果你希望 Tailwind 的透明度修饰符（例如 `border-border/50`）生效，可以使用 `<alpha-value>` 占位符（这种情况下通常不需要使用 `--border-alpha`）：

```js
// 让 Tailwind 注入透明度
border: 'hsl(var(--border) / <alpha-value>)';
```

如果你使用 `format: 'oklch'`，由于变量值本身已经是 `oklch(...)`，在 Tailwind 中直接使用 `var(--xxx)` 即可（不需要再包一层 `oklch(...)`）：

```js
background: 'var(--background)';
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
