# @soybeanjs/shadcn-theme

A powerful and flexible shadcn/ui theme CSS variables generator with preset color schemes, light/dark output, and optional custom preset extension.

[中文 README](README.md)

## ✨ Features

- 🎨 **Rich Preset Themes** - Built-in base / primary / feedback preset combinations
- 🌗 **Light/Dark Output** - Supports `.dark` / `@media (prefers-color-scheme: dark)` / custom selector
- 🎯 **Flexible Color Formats** - Supports `hsl` and `oklch` output
- 🔧 **Extensible** - Add custom colors via `preset` (including sidebar / chart fields)
- 🌈 **Palette Variables** - Generates 50-950 palette vars for primary/destructive/success/warning/info/carbon
- 📦 **Lightweight Dependency** - Only depends on `@soybeanjs/colord`
- 🧩 **Pure Generator** - Returns CSS strings only; does not automatically mutate the DOM

## 📦 Installation

```bash
pnpm add @soybeanjs/shadcn-theme
```

## 🚀 Quick Start

### Using Preset Themes

```typescript
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';

// Use default presets (gray + indigo + classic + extended)
const theme = createShadcnTheme();
const css = theme.getCss();

// Custom preset combination
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

### (Optional) Inject into the DOM

This library generates CSS strings. If you want runtime theme switching, you can inject the result yourself:

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
applyTheme(theme.getCss({ primary: 'emerald' }));
```

### Custom Preset

Through the `preset` parameter, you can use custom color configurations to override the built-in base/primary/feedback/sidebar presets.

#### 1) When to use custom preset

- When built-in preset combinations cannot meet your design requirements, use `preset` to pass a custom color configuration.
- When using a custom preset, you can use `base`/`primary`/`feedback`/`sidebar` with `custom` value to apply the custom preset.

#### 2) Color values and `format`

- Each color value supports three forms: Tailwind palette reference (e.g. `slate.500`), `hsl(...)`, `oklch(...)`, or builtin color names (`inherit`, `currentColor`, `transparent`, `black`, `white`).
- `format: 'hsl'`: outputs `h s l [/ alpha]` (no outer `hsl(...)`); if input is `oklch(...)` it converts to hsl.
- `format: 'oklch'`: outputs values with outer `oklch(...)` wrapper; if input is `hsl(...)` it converts to oklch.

#### Quick example: Complete custom preset

```typescript
const theme = createShadcnTheme({
  preset: {
    light: {
      // Base colors
      background: 'white',
      foreground: 'slate.950',
      card: 'white',
      cardForeground: 'slate.950',
      popover: 'white',
      popoverForeground: 'slate.950',
      primaryForeground: 'slate.50',
      secondary: 'slate.100',
      secondaryForeground: 'slate.900',
      muted: 'slate.100',
      mutedForeground: 'slate.500',
      accent: 'slate.100',
      accentForeground: 'slate.900',
      destructiveForeground: 'slate.50',
      successForeground: 'slate.50',
      warningForeground: 'slate.50',
      infoForeground: 'slate.50',
      carbon: 'slate.800',
      carbonForeground: 'slate.50',
      border: 'slate.200',
      input: 'slate.200',
      // Theme colors
      primary: 'blue.600',
      destructive: 'red.500',
      success: 'green.500',
      warning: 'amber.500',
      info: 'blue.500',
      ring: 'blue.400',
      // Chart colors
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500',
      // Sidebar colors
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
      // Base colors
      background: 'slate.950',
      foreground: 'slate.50',
      card: 'slate.900',
      cardForeground: 'slate.50',
      popover: 'slate.900',
      popoverForeground: 'slate.50',
      primaryForeground: 'slate.900',
      secondary: 'slate.800',
      secondaryForeground: 'slate.50',
      muted: 'slate.800',
      mutedForeground: 'slate.400',
      accent: 'slate.800',
      accentForeground: 'slate.50',
      destructiveForeground: 'slate.900',
      successForeground: 'slate.900',
      warningForeground: 'slate.900',
      infoForeground: 'slate.900',
      carbon: 'slate.100',
      carbonForeground: 'slate.900',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)',
      // Theme colors
      primary: 'blue.400',
      destructive: 'red.400',
      success: 'green.400',
      warning: 'amber.400',
      info: 'blue.400',
      ring: 'blue.500',
      // Chart colors
      chart1: 'orange.500',
      chart2: 'teal.500',
      chart3: 'cyan.400',
      chart4: 'amber.500',
      chart5: 'amber.600',
      // Sidebar colors
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
});

const css = theme.getCss();
```

## 📖 API Documentation

### `createShadcnTheme(options?: ThemeOptions)`

Main function to create a theme CSS generator.

Return value:

```ts
const theme = createShadcnTheme();

theme.getCss(config?: PresetConfig, radius?: string): string
theme.getColorCss(config: PresetConfig): string
theme.getRadiusCss(radius?: string): string
```

#### ThemeOptions

| Parameter      | Type                                   | Default      | Description                                        |
| -------------- | -------------------------------------- | ------------ | -------------------------------------------------- |
| `base`         | `BuiltinBasePresetKey \| 'custom'`     | `'zinc'`     | Base preset key                                    |
| `primary`      | `BuiltinPrimaryPresetKey \| 'custom'`  | `'indigo'`   | Primary preset key                                 |
| `feedback`     | `BuiltinFeedbackPresetKey \| 'custom'` | `'classic'`  | Feedback preset key                                |
| `sidebar`      | `'extended' \| 'custom'`               | `'extended'` | Sidebar mode; `extended` derives from base/primary |
| `preset`       | `CustomThemeColorPreset`               | -            | Custom color preset                                |
| `radius`       | `string`                               | `'0.625rem'` | Global border radius                               |
| `styleTarget`  | `'html' \| ':root'`                    | `':root'`    | CSS variables mount selector                       |
| `darkSelector` | `'class' \| 'media' \| string`         | `'class'`    | Dark mode selector (custom string supported)       |
| `format`       | `'hsl' \| 'oklch'`                     | `'hsl'`      | Output color format                                |

### Preset Configuration (PresetConfig)

```typescript
interface PresetConfig {
  base?: BuiltinBasePresetKey | 'custom';
  primary?: BuiltinPrimaryPresetKey | 'custom';
  feedback?: BuiltinFeedbackPresetKey | 'custom';
  sidebar?: 'extended' | 'custom';
  preset?: CustomThemeColorPreset;
}
```

#### Feedback Palette Key (FeedbackPaletteKey)

| Style          | Description           | Use Cases                                                                       |
| -------------- | --------------------- | ------------------------------------------------------------------------------- |
| `classic`      | Classic Standard      | Most common combination, suitable for most scenarios                            |
| `vivid`        | Vivid & Energetic     | High saturation, suitable for youth-oriented products and creative applications |
| `subtle`       | Soft & Elegant        | Low contrast, suitable for premium brands and elegant interfaces                |
| `warm`         | Warm & Welcoming      | Warm color tones, creates a friendly and warm atmosphere                        |
| `cool`         | Cool & Professional   | Cool color tones, suitable for tech and professional applications               |
| `nature`       | Natural & Fresh       | Natural colors, suitable for eco-friendly and health products                   |
| `modern`       | Modern & Minimalist   | Strong modern feel, suitable for tech products and SaaS applications            |
| `vibrant`      | Vibrant & Dynamic     | High-energy colors, suitable for sports and gaming applications                 |
| `professional` | Business Professional | Stable and dignified, suitable for enterprise applications and B2B products     |
| `soft`         | Dreamy & Soft         | Soft tones, suitable for design tools and creative platforms                    |
| `bold`         | Bold & Eye-catching   | High contrast, suitable for scenarios requiring strong visual impact            |
| `calm`         | Calm & Soothing       | Low saturation, suitable for long-term use applications                         |
| `candy`        | Candy Colors          | Bright and cute, suitable for children's products and fun applications          |
| `deep`         | Deep & Mysterious     | Deep tones, suitable for dark themes and mysterious styles                      |
| `light`        | Fresh & Light         | Light tones, suitable for clean and refreshing interfaces                       |

### Theme Color Configuration (ThemeColors)

Supports configuration of the following color variables:

#### Base Colors

- `background` - Background color
- `foreground` - Foreground color (text)
- `card` - Card background
- `cardForeground` - Card foreground color
- `popover` - Popover background
- `popoverForeground` - Popover foreground color
- `primary` - Primary color
- `primaryForeground` - Primary foreground
- `secondary` - Secondary color
- `secondaryForeground` - Secondary foreground
- `muted` - Muted color
- `mutedForeground` - Muted foreground
- `accent` - Accent color
- `accentForeground` - Accent foreground
- `destructive` - Destructive action color
- `destructiveForeground` - Destructive foreground color
- `border` - Border color
- `input` - Input border color
- `ring` - Focus ring color

#### Extended Colors

- `success` / `successForeground` - Success state
- `warning` / `warningForeground` - Warning state
- `info` / `infoForeground` - Info state
- `carbon` / `carbonForeground` - Carbon color (additional dark scheme)

#### Sidebar Colors

- `sidebar` - Sidebar background
- `sidebarForeground` - Sidebar foreground
- `sidebarPrimary` - Sidebar primary color
- `sidebarPrimaryForeground` - Sidebar primary foreground
- `sidebarAccent` - Sidebar accent color
- `sidebarAccentForeground` - Sidebar accent foreground
- `sidebarBorder` - Sidebar border
- `sidebarRing` - Sidebar focus ring

#### Chart Colors

- `chart1` ~ `chart5` - Chart colors

### Color Value Format (ColorValue)

Supports the following color value formats:

1. **HSL Format**

```typescript
'hsl(0 0% 100%)';
'hsl(0 0% 100% / 0.5)'; // with opacity
```

2. **OKLCH Format**

```typescript
'oklch(100% 0 0)';
'oklch(100% 0 0 / 0.5)'; // with opacity
```

3. **Tailwind Palette Reference**

```typescript
'slate.500';
'blue.600';
'red.50';
```

4. **Built-in color names**

```typescript
'inherit';
'currentColor';
'transparent';
'black';
'white';
```

## 🎨 Usage Examples

### Example 1: Classic Blue Theme

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

### Example 2: Modern Purple Theme

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

### Example 3: Override Per Generation

```typescript
const theme = createShadcnTheme({ base: 'slate', primary: 'indigo', feedback: 'classic' });

const css1 = theme.getCss();
const css2 = theme.getCss({ primary: 'emerald', feedback: 'vivid' });
```

### Example 4: Media Query Dark Mode

```typescript
const theme = createShadcnTheme({
  base: 'slate',
  primary: 'indigo',
  darkSelector: 'media' // Use system preference
});

const css = theme.getCss();
```

### Example 5: Custom Dark Mode Selector

```typescript
const theme = createShadcnTheme({
  base: 'slate',
  primary: 'emerald',
  darkSelector: '[data-theme="dark"]' // Custom selector
});

const css = theme.getCss();
```

## 🎯 Generated CSS Variables

`getCss()` returns a CSS string containing variables like the following.

When `format: 'hsl'`, variable values are `h s l [/ alpha]` (without the outer `hsl(...)` wrapper):

Notes:

- When `format: 'hsl'` and the color key is `border`, `input`, or `sidebarBorder`, if the value includes opacity (e.g. `hsl(... / 0.1)` or `oklch(... / 0.1)`), the library also emits alpha variables: `--border-alpha`, `--input-alpha`, `--sidebar-border-alpha`. Meanwhile `--border` / `--input` / `--sidebar-border` keep only the `h s l` part (without the `/ alpha`).
- It generates 11 palette variables (50-950) for `primary`, `destructive`, `success`, `warning`, `info`, and `carbon`: `50/100/200/300/400/500/600/700/800/900/950`.

```css
:root {
  --radius: 0.625rem;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;

  /* In hsl mode: border/input/sidebarBorder also output alpha vars */
  --border: 214.3 31.8% 91.4%;
  --border-alpha: 0.1;
  /* ... more variables */

  /* Auto-generated palettes (11 levels: 50-950) */
  --primary-50: 239 84% 97%;
  --primary-100: 237 84% 94%;
  /* ... primary-200 to primary-950 */

  /* Other color palettes */
  --destructive-50: ...;
  --success-50: ...;
  --warning-50: ...;
  --info-50: ...;
  --carbon-50: ...;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... variables in dark mode */
}
```

When `format: 'oklch'`, variable values include the outer `oklch(...)` wrapper:

```css
:root {
  --background: oklch(100% 0 0);
  --foreground: oklch(20% 0 0);
  --border: oklch(100% 0 0 / 0.1);
}
```

## 💡 Advanced Usage

### Dynamic Theme Switching

```typescript
const theme = createShadcnTheme();

function apply(cssText: string) {
  const id = 'SHADCN_THEME_STYLE';
  const el = document.getElementById(id) ?? document.createElement('style');
  el.id = id;
  el.textContent = cssText;
  document.head.appendChild(el);
}

apply(theme.getCss());
apply(theme.getCss({ base: 'zinc', primary: 'purple' }));

// Dark mode switching is controlled by your darkSelector (e.g. default is adding .dark)
document.documentElement.classList.add('dark');
```

### Using with Tailwind CSS

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
          // ... more shades
        }
        // ... other colors
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

When you use `format: 'hsl'`, opacity must be handled separately, especially for `border` / `input` / `sidebarBorder`:

- These variables output `h s l` (without `/ alpha`). If opacity is present, the library also emits `--border-alpha` / `--input-alpha` / `--sidebar-border-alpha`.
- In Tailwind, you can compose them using the slash syntax:

```js
// Use the generated alpha value
border: 'hsl(var(--border) / var(--border-alpha))';
```

If you want Tailwind opacity modifiers to work (e.g. `border-border/50`), use the `<alpha-value>` placeholder (in this case you typically don't use `--border-alpha`):

```js
// Let Tailwind inject opacity
border: 'hsl(var(--border) / <alpha-value>)';
```

If you use `format: 'oklch'`, since the variable value already contains `oklch(...)`, use `var(--xxx)` directly in Tailwind (no extra `oklch(...)` wrapper needed):

```js
background: 'var(--background)';
```

### Using in CSS

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

## 🔗 Related Projects

- [shadcn/ui](https://ui.shadcn.com/) - Component library based on Radix UI and Tailwind CSS
- [@soybeanjs/colord](https://github.com/soybeanjs/colord) - Color processing utility library

## 📄 License

MIT License

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 👨‍💻 Author

Created by [Soybean](https://github.com/soybeanjs)
