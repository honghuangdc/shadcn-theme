# @soybeanjs/shadcn-theme

A powerful and flexible shadcn/ui theme generator with support for dynamic CSS variable injection, preset color schemes, and light/dark mode switching.

[中文 README](README.md)

## ✨ Features

- 🎨 **Rich Preset Themes** - Multiple base palettes, theme colors, and feedback color presets
- 🌗 **Light/Dark Mode Support** - Built-in dark mode with automatic dark variant generation
- 🎯 **Flexible Color Schemes** - Support for both HSL and OKLCH color formats
- 🔧 **Highly Customizable** - Full control over custom theme color configurations
- 📦 **Zero Runtime Dependencies** - Only depends on `@soybeanjs/colord` for color processing
- 🚀 **Plug and Play** - Automatically injects CSS variables into the DOM
- 🎭 **Extended Palettes** - Theme customization support for sidebars, charts, and more
- 🌈 **Color Palette Generation** - Automatically generates gradient palettes (50-950) for primary colors

## 📦 Installation

```bash
pnpm add @soybeanjs/shadcn-theme
```

## 🚀 Quick Start

### Using Preset Themes

```typescript
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';

// Use default presets (slate + indigo + classic)
createShadcnTheme();

// Custom preset combination
createShadcnTheme({
  presets: {
    base: 'zinc',      // Base palette: stone | zinc | neutral | gray | slate
    theme: 'blue',     // Theme color: any Tailwind palette name
    feedback: 'vivid'  // Feedback color style: classic | vivid | subtle | warm | cool, etc.
  },
  radius: '0.5rem',    // Border radius size
  darkSelector: 'class', // Dark mode selector: 'class' | 'media' | custom
  format: 'hsl'        // Color format: 'hsl' | 'oklch'
});
```

### Custom Theme Colors

```typescript
createShadcnTheme({
  theme: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'oklch(20% 0 0)',
      primary: 'oklch(50% 0.2 250)',
      primaryForeground: 'oklch(100% 0 0)',
      // ... more color configurations
    },
    dark: {
      // Optional, will automatically generate dark variants if not provided
      background: 'oklch(20% 0 0)',
      foreground: 'oklch(100% 0 0)',
      // ...
    }
  }
});
```

## 📖 API Documentation

### `createShadcnTheme(options?: ThemeOptions)`

Main function to create and apply themes.

#### ThemeOptions

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `presets` | `PresetConfig` | - | Preset configuration, takes priority over `theme` |
| `theme` | `ThemeConfig` | - | Custom theme color configuration |
| `radius` | `string` | `'0.625rem'` | Global border radius size |
| `styleId` | `string` | `'SHADCN_THEME_STYLES'` | ID of the injected style tag |
| `styleTarget` | `'html' \| ':root'` | `':root'` | CSS variable mount target |
| `darkSelector` | `string` | `'class'` | Dark mode selector |
| `format` | `'hsl' \| 'oklch'` | `'hsl'` | Color output format |

### Preset Configuration (PresetConfig)

```typescript
interface PresetConfig {
  base?: 'stone' | 'zinc' | 'neutral' | 'gray' | 'slate';  // Default: 'slate'
  theme?: TailwindPaletteKey;  // Any Tailwind palette, default: 'indigo'
  feedback?: FeedbackPaletteKey;  // Feedback color style, default: 'classic'
}
```

#### Feedback Palette Key (FeedbackPaletteKey)

| Style | Description | Use Cases |
|------|------|----------|
| `classic` | Classic Standard | Most common combination, suitable for most scenarios |
| `vivid` | Vivid & Energetic | High saturation, suitable for youth-oriented products and creative applications |
| `subtle` | Soft & Elegant | Low contrast, suitable for premium brands and elegant interfaces |
| `warm` | Warm & Welcoming | Warm color tones, creates a friendly and warm atmosphere |
| `cool` | Cool & Professional | Cool color tones, suitable for tech and professional applications |
| `nature` | Natural & Fresh | Natural colors, suitable for eco-friendly and health products |
| `modern` | Modern & Minimalist | Strong modern feel, suitable for tech products and SaaS applications |
| `vibrant` | Vibrant & Dynamic | High-energy colors, suitable for sports and gaming applications |
| `professional` | Business Professional | Stable and dignified, suitable for enterprise applications and B2B products |
| `soft` | Dreamy & Soft | Soft tones, suitable for design tools and creative platforms |
| `bold` | Bold & Eye-catching | High contrast, suitable for scenarios requiring strong visual impact |
| `calm` | Calm & Soothing | Low saturation, suitable for long-term use applications |
| `candy` | Candy Colors | Bright and cute, suitable for children's products and fun applications |
| `deep` | Deep & Mysterious | Deep tones, suitable for dark themes and mysterious styles |
| `light` | Fresh & Light | Light tones, suitable for clean and refreshing interfaces |

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

Supports three color value formats:

1. **HSL Format**
```typescript
'hsl(0 0% 100%)'
'hsl(0 0% 100% / 0.5)' // with opacity
```

2. **OKLCH Format**
```typescript
'oklch(100% 0 0)'
'oklch(100% 0 0 / 0.5)' // with opacity
```

3. **Tailwind Palette Reference**
```typescript
'slate.500'
'blue.600'
'red.50'
```

## 🎨 Usage Examples

### Example 1: Classic Blue Theme

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

### Example 2: Modern Purple Theme

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

### Example 3: Custom Brand Colors

```typescript
createShadcnTheme({
  theme: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'oklch(20% 0 0)',
      primary: 'oklch(50% 0.25 280)', // Custom brand purple
      primaryForeground: 'oklch(100% 0 0)',
      secondary: 'oklch(95% 0.01 280)',
      secondaryForeground: 'oklch(30% 0 0)',
      // ... other colors
    }
    // dark is optional, will be auto-generated if not provided
  }
});
```

### Example 4: Media Query Dark Mode

```typescript
createShadcnTheme({
  presets: {
    base: 'slate',
    theme: 'indigo'
  },
  darkSelector: 'media' // Use system preference
});
```

### Example 5: Custom Dark Mode Selector

```typescript
createShadcnTheme({
  presets: {
    base: 'slate',
    theme: 'emerald'
  },
  darkSelector: '[data-theme="dark"]' // Custom selector
});
```

## 🎯 Generated CSS Variables

After calling `createShadcnTheme()`, a `<style>` tag containing the following variables will be automatically injected into `<head>`:

```css
:root {
  --radius: 0.625rem;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */

  /* Auto-generated palettes */
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

## 💡 Advanced Usage

### Dynamic Theme Switching

```typescript
// Switch to light theme
createShadcnTheme({
  presets: { base: 'slate', theme: 'blue' }
});

// Runtime switch to dark theme (by toggling class)
document.documentElement.classList.add('dark');

// Switch to another theme
createShadcnTheme({
  presets: { base: 'zinc', theme: 'purple' }
});
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
          100: 'hsl(var(--primary-100))',
          // ... more shades
        },
        // ... other colors
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
