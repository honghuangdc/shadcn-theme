import type {
  BasePaletteKey,
  BasePalettePreset,
  DarkSelector,
  FeedbackPaletteKey,
  FeedbackPalettePreset,
  ShadcnTheme,
  ThemePaletteKey,
  ThemePalettePreset
} from './types';

export const THEME_VARIABLES = {
  // radius
  radius: '--radius',

  // base colors
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  popover: '--popover',
  popoverForeground: '--popover-foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  destructive: '--destructive',
  destructiveForeground: '--destructive-foreground',
  border: '--border',
  input: '--input',
  ring: '--ring',

  // extended colors
  success: '--success',
  successForeground: '--success-foreground',
  warning: '--warning',
  warningForeground: '--warning-foreground',
  info: '--info',
  infoForeground: '--info-foreground',
  carbon: '--carbon',
  carbonForeground: '--carbon-foreground',

  // sidebar colors
  sidebar: '--sidebar',
  sidebarForeground: '--sidebar-foreground',
  sidebarPrimary: '--sidebar-primary',
  sidebarPrimaryForeground: '--sidebar-primary-foreground',
  sidebarAccent: '--sidebar-accent',
  sidebarAccentForeground: '--sidebar-accent-foreground',
  sidebarBorder: '--sidebar-border',
  sidebarRing: '--sidebar-ring',

  // chart colors
  chart1: '--chart-1',
  chart2: '--chart-2',
  chart3: '--chart-3',
  chart4: '--chart-4',
  chart5: '--chart-5'
} as const satisfies Record<keyof ShadcnTheme, string>;

/**
 * dark mode selectors
 */
export const DARK_SELECTOR = {
  class: '.dark',
  media: '@media (prefers-color-scheme: dark)'
} as const satisfies Record<DarkSelector, string>;

export const basePalettePreset: BasePalettePreset = {
  stone: {
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
  },
  zinc: {
    light: {
      background: 'zinc.50',
      foreground: 'zinc.950',
      card: 'zinc.50',
      cardForeground: 'zinc.950',
      popover: 'zinc.50',
      popoverForeground: 'zinc.950',
      primaryForeground: 'zinc.50',
      secondary: 'zinc.100',
      secondaryForeground: 'zinc.900',
      muted: 'zinc.100',
      mutedForeground: 'zinc.500',
      accent: 'zinc.100',
      accentForeground: 'zinc.900',
      destructiveForeground: 'zinc.50',
      successForeground: 'zinc.50',
      warningForeground: 'zinc.50',
      infoForeground: 'zinc.50',
      carbon: 'zinc.800',
      carbonForeground: 'zinc.50',
      border: 'zinc.200',
      input: 'zinc.200'
    },
    dark: {
      background: 'zinc.950',
      foreground: 'zinc.50',
      card: 'zinc.900',
      cardForeground: 'zinc.50',
      popover: 'zinc.900',
      popoverForeground: 'zinc.50',
      primaryForeground: 'zinc.900',
      secondary: 'zinc.800',
      secondaryForeground: 'zinc.50',
      muted: 'zinc.800',
      mutedForeground: 'zinc.400',
      accent: 'zinc.800',
      accentForeground: 'zinc.50',
      destructiveForeground: 'zinc.900',
      successForeground: 'zinc.900',
      warningForeground: 'zinc.900',
      infoForeground: 'zinc.900',
      carbon: 'zinc.100',
      carbonForeground: 'zinc.900',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  },
  neutral: {
    light: {
      background: 'neutral.50',
      foreground: 'neutral.950',
      card: 'neutral.50',
      cardForeground: 'neutral.950',
      popover: 'neutral.50',
      popoverForeground: 'neutral.950',
      primaryForeground: 'neutral.50',
      secondary: 'neutral.100',
      secondaryForeground: 'neutral.900',
      muted: 'neutral.100',
      mutedForeground: 'neutral.500',
      accent: 'neutral.100',
      accentForeground: 'neutral.900',
      destructiveForeground: 'neutral.50',
      successForeground: 'neutral.50',
      warningForeground: 'neutral.50',
      infoForeground: 'neutral.50',
      carbon: 'neutral.800',
      carbonForeground: 'neutral.50',
      border: 'neutral.200',
      input: 'neutral.200'
    },
    dark: {
      background: 'neutral.950',
      foreground: 'neutral.50',
      card: 'neutral.900',
      cardForeground: 'neutral.50',
      popover: 'neutral.900',
      popoverForeground: 'neutral.50',
      primaryForeground: 'neutral.900',
      secondary: 'neutral.800',
      secondaryForeground: 'neutral.50',
      muted: 'neutral.800',
      mutedForeground: 'neutral.400',
      accent: 'neutral.800',
      accentForeground: 'neutral.50',
      destructiveForeground: 'neutral.900',
      successForeground: 'neutral.900',
      warningForeground: 'neutral.900',
      infoForeground: 'neutral.900',
      carbon: 'neutral.100',
      carbonForeground: 'neutral.900',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  },
  gray: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'gray.950',
      card: 'oklch(100% 0 0)',
      cardForeground: 'gray.950',
      popover: 'oklch(100% 0 0)',
      popoverForeground: 'gray.950',
      primaryForeground: 'gray.50',
      secondary: 'gray.100',
      secondaryForeground: 'gray.900',
      muted: 'gray.100',
      mutedForeground: 'gray.500',
      accent: 'gray.100',
      accentForeground: 'gray.900',
      carbon: 'gray.800',
      destructiveForeground: 'gray.50',
      successForeground: 'gray.50',
      warningForeground: 'gray.50',
      infoForeground: 'gray.50',
      carbonForeground: 'gray.50',
      border: 'gray.200',
      input: 'gray.200'
    },
    dark: {
      background: 'gray.950',
      foreground: 'gray.50',
      card: 'gray.900',
      cardForeground: 'gray.50',
      popover: 'gray.900',
      popoverForeground: 'gray.50',
      primaryForeground: 'gray.900',
      secondary: 'gray.800',
      secondaryForeground: 'gray.50',
      muted: 'gray.800',
      mutedForeground: 'gray.400',
      accent: 'gray.800',
      accentForeground: 'gray.50',
      carbon: 'gray.100',
      destructiveForeground: 'gray.900',
      successForeground: 'gray.900',
      warningForeground: 'gray.900',
      infoForeground: 'gray.900',
      carbonForeground: 'gray.900',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  },
  slate: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'slate.950',
      card: 'oklch(100% 0 0)',
      cardForeground: 'slate.950',
      popover: 'oklch(100% 0 0)',
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
      input: 'slate.200'
    },
    dark: {
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
      carbon: 'slate.100',
      destructiveForeground: 'slate.900',
      successForeground: 'slate.900',
      warningForeground: 'slate.900',
      infoForeground: 'slate.900',
      carbonForeground: 'slate.900',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  }
};

export const themePalettePreset: ThemePalettePreset = {
  stone: {
    light: {
      primary: 'stone.900',
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
  },
  zinc: {
    light: {
      primary: 'zinc.900',
      ring: 'stone.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'zinc.200',
      ring: 'zinc.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  neutral: {
    light: {
      primary: 'neutral.900',
      ring: 'stone.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'neutral.200',
      ring: 'neutral.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  gray: {
    light: {
      primary: 'gray.900',
      ring: 'stone.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'gray.200',
      ring: 'gray.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  slate: {
    light: {
      primary: 'slate.900',
      ring: 'stone.400',
      chart1: 'orange.600',
      chart2: 'teal.600',
      chart3: 'cyan.900',
      chart4: 'amber.400',
      chart5: 'amber.500'
    },
    dark: {
      primary: 'slate.200',
      ring: 'slate.500',
      chart1: 'blue.700',
      chart2: 'emerald.500',
      chart3: 'amber.500',
      chart4: 'purple.500',
      chart5: 'rose.500'
    }
  },
  red: {
    light: {
      primary: 'red.600',
      ring: 'red.400',
      chart1: 'red.300',
      chart2: 'red.500',
      chart3: 'red.600',
      chart4: 'red.700',
      chart5: 'red.800'
    },
    dark: {
      primary: 'red.500',
      ring: 'red.900',
      chart1: 'red.300',
      chart2: 'red.500',
      chart3: 'red.600',
      chart4: 'red.700',
      chart5: 'red.800'
    }
  },
  orange: {
    light: {
      primary: 'orange.600',
      ring: 'orange.400',
      chart1: 'orange.300',
      chart2: 'orange.500',
      chart3: 'orange.600',
      chart4: 'orange.700',
      chart5: 'orange.800'
    },
    dark: {
      primary: 'orange.500',
      ring: 'orange.900',
      chart1: 'orange.300',
      chart2: 'orange.500',
      chart3: 'orange.600',
      chart4: 'orange.700',
      chart5: 'orange.800'
    }
  },
  amber: {
    light: {
      primary: 'amber.400',
      ring: 'amber.400',
      chart1: 'amber.300',
      chart2: 'amber.500',
      chart3: 'amber.600',
      chart4: 'amber.700',
      chart5: 'amber.800'
    },
    dark: {
      primary: 'amber.500',
      ring: 'amber.900',
      chart1: 'amber.300',
      chart2: 'amber.500',
      chart3: 'amber.600',
      chart4: 'amber.700',
      chart5: 'amber.800'
    }
  },
  yellow: {
    light: {
      primary: 'amber.400',
      ring: 'amber.400',
      chart1: 'amber.300',
      chart2: 'amber.500',
      chart3: 'amber.600',
      chart4: 'amber.700',
      chart5: 'amber.800'
    },
    dark: {
      primary: 'amber.500',
      ring: 'amber.900',
      chart1: 'amber.300',
      chart2: 'amber.500',
      chart3: 'amber.600',
      chart4: 'amber.700',
      chart5: 'amber.800'
    }
  },
  lime: {
    light: {
      primary: 'lime.600',
      ring: 'lime.400',
      chart1: 'lime.300',
      chart2: 'lime.500',
      chart3: 'lime.600',
      chart4: 'lime.700',
      chart5: 'lime.800'
    },
    dark: {
      primary: 'lime.600',
      ring: 'lime.900',
      chart1: 'lime.300',
      chart2: 'lime.500',
      chart3: 'lime.600',
      chart4: 'lime.700',
      chart5: 'lime.800'
    }
  },
  green: {
    light: {
      primary: 'green.600',
      ring: 'green.400',
      chart1: 'green.300',
      chart2: 'green.500',
      chart3: 'green.600',
      chart4: 'green.700',
      chart5: 'green.800'
    },
    dark: {
      primary: 'green.600',
      ring: 'green.900',
      chart1: 'green.300',
      chart2: 'green.500',
      chart3: 'green.600',
      chart4: 'green.700',
      chart5: 'green.800'
    }
  },
  emerald: {
    light: {
      primary: 'emerald.500',
      ring: 'emerald.400',
      chart1: 'emerald.300',
      chart2: 'emerald.500',
      chart3: 'emerald.600',
      chart4: 'emerald.700',
      chart5: 'emerald.800'
    },
    dark: {
      primary: 'emerald.600',
      ring: 'emerald.900',
      chart1: 'emerald.300',
      chart2: 'emerald.500',
      chart3: 'emerald.600',
      chart4: 'emerald.700',
      chart5: 'emerald.800'
    }
  },
  teal: {
    light: {
      primary: 'teal.400',
      ring: 'teal.400',
      chart1: 'teal.300',
      chart2: 'teal.500',
      chart3: 'teal.600',
      chart4: 'teal.700',
      chart5: 'teal.800'
    },
    dark: {
      primary: 'teal.600',
      ring: 'teal.900',
      chart1: 'teal.300',
      chart2: 'teal.500',
      chart3: 'teal.600',
      chart4: 'teal.700',
      chart5: 'teal.800'
    }
  },
  cyan: {
    light: {
      primary: 'cyan.600',
      ring: 'cyan.400',
      chart1: 'cyan.300',
      chart2: 'cyan.500',
      chart3: 'cyan.600',
      chart4: 'cyan.700',
      chart5: 'cyan.800'
    },
    dark: {
      primary: 'cyan.500',
      ring: 'cyan.900',
      chart1: 'cyan.300',
      chart2: 'cyan.500',
      chart3: 'cyan.600',
      chart4: 'cyan.700',
      chart5: 'cyan.800'
    }
  },
  sky: {
    light: {
      primary: 'sky.600',
      ring: 'sky.400',
      chart1: 'sky.300',
      chart2: 'sky.500',
      chart3: 'sky.600',
      chart4: 'sky.700',
      chart5: 'sky.800'
    },
    dark: {
      primary: 'sky.500',
      ring: 'sky.900',
      chart1: 'sky.300',
      chart2: 'sky.500',
      chart3: 'sky.600',
      chart4: 'sky.700',
      chart5: 'sky.800'
    }
  },
  blue: {
    light: {
      primary: 'blue.600',
      ring: 'blue.400',
      chart1: 'blue.300',
      chart2: 'blue.500',
      chart3: 'blue.600',
      chart4: 'blue.700',
      chart5: 'blue.800'
    },
    dark: {
      primary: 'blue.500',
      ring: 'blue.900',
      chart1: 'blue.300',
      chart2: 'blue.500',
      chart3: 'blue.600',
      chart4: 'blue.700',
      chart5: 'blue.800'
    }
  },
  indigo: {
    light: {
      primary: 'indigo.600',
      ring: 'indigo.400',
      chart1: 'indigo.300',
      chart2: 'indigo.500',
      chart3: 'indigo.600',
      chart4: 'indigo.700',
      chart5: 'indigo.800'
    },
    dark: {
      primary: 'indigo.500',
      ring: 'indigo.900',
      chart1: 'indigo.300',
      chart2: 'indigo.500',
      chart3: 'indigo.600',
      chart4: 'indigo.700',
      chart5: 'indigo.800'
    }
  },
  violet: {
    light: {
      primary: 'violet.600',
      ring: 'violet.400',
      chart1: 'violet.300',
      chart2: 'violet.500',
      chart3: 'violet.600',
      chart4: 'violet.700',
      chart5: 'violet.800'
    },
    dark: {
      primary: 'violet.500',
      ring: 'violet.900',
      chart1: 'violet.300',
      chart2: 'violet.500',
      chart3: 'violet.600',
      chart4: 'violet.700',
      chart5: 'violet.800'
    }
  },
  purple: {
    light: {
      primary: 'purple.600',
      ring: 'purple.400',
      chart1: 'purple.300',
      chart2: 'purple.500',
      chart3: 'purple.600',
      chart4: 'purple.700',
      chart5: 'purple.800'
    },
    dark: {
      primary: 'purple.500',
      ring: 'purple.900',
      chart1: 'purple.300',
      chart2: 'purple.500',
      chart3: 'purple.600',
      chart4: 'purple.700',
      chart5: 'purple.800'
    }
  },
  fuchsia: {
    light: {
      primary: 'fuchsia.600',
      ring: 'fuchsia.400',
      chart1: 'fuchsia.300',
      chart2: 'fuchsia.500',
      chart3: 'fuchsia.600',
      chart4: 'fuchsia.700',
      chart5: 'fuchsia.800'
    },
    dark: {
      primary: 'fuchsia.500',
      ring: 'fuchsia.900',
      chart1: 'fuchsia.300',
      chart2: 'fuchsia.500',
      chart3: 'fuchsia.600',
      chart4: 'fuchsia.700',
      chart5: 'fuchsia.800'
    }
  },
  pink: {
    light: {
      primary: 'pink.600',
      ring: 'pink.400',
      chart1: 'pink.300',
      chart2: 'pink.500',
      chart3: 'pink.600',
      chart4: 'pink.700',
      chart5: 'pink.800'
    },
    dark: {
      primary: 'pink.500',
      ring: 'pink.900',
      chart1: 'pink.300',
      chart2: 'pink.500',
      chart3: 'pink.600',
      chart4: 'pink.700',
      chart5: 'pink.800'
    }
  },
  rose: {
    light: {
      primary: 'rose.600',
      ring: 'rose.400',
      chart1: 'rose.300',
      chart2: 'rose.500',
      chart3: 'rose.600',
      chart4: 'rose.700',
      chart5: 'rose.800'
    },
    dark: {
      primary: 'rose.500',
      ring: 'rose.900',
      chart1: 'rose.300',
      chart2: 'rose.500',
      chart3: 'rose.600',
      chart4: 'rose.700',
      chart5: 'rose.800'
    }
  }
};

export const feedbackPalettePreset: FeedbackPalettePreset = {
  /**
   * Classic standard combination for most scenarios
   * 经典标准 . 最常见的组合，适用于大多数场景
   */
  classic: {
    light: {
      destructive: 'red.600',
      success: 'green.600',
      warning: 'yellow.600',
      info: 'blue.600'
    },
    dark: {
      destructive: 'red.400',
      success: 'green.400',
      warning: 'yellow.400',
      info: 'blue.400'
    }
  },
  /**
   * Vivid and energetic, high saturation for youthful and creative products
   * 鲜艳活力 . 高饱和度，适合年轻化产品和创意应用
   */
  vivid: {
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
  },
  /**
   * Soft and elegant, low contrast for premium brands and refined interfaces
   * 柔和优雅 . 低对比度，适合高端品牌和优雅界面
   */
  subtle: {
    light: {
      destructive: 'rose.500',
      success: 'emerald.600',
      warning: 'amber.600',
      info: 'indigo.600'
    },
    dark: {
      destructive: 'rose.300',
      success: 'emerald.300',
      warning: 'amber.300',
      info: 'indigo.300'
    }
  },
  /**
   * Warm and welcoming, creates friendly and cozy atmosphere
   * 暖色温馨 . 暖色调为主，营造友好温暖的氛围
   */
  warm: {
    light: {
      destructive: 'red.600',
      success: 'lime.600',
      warning: 'orange.600',
      info: 'amber.700'
    },
    dark: {
      destructive: 'red.400',
      success: 'lime.400',
      warning: 'orange.400',
      info: 'amber.400'
    }
  },
  /**
   * Cool and professional, ideal for tech and professional applications
   * 冷色专业 . 冷色调为主，适合科技和专业应用
   */
  cool: {
    light: {
      destructive: 'rose.600',
      success: 'teal.600',
      warning: 'cyan.700',
      info: 'blue.600'
    },
    dark: {
      destructive: 'rose.400',
      success: 'teal.400',
      warning: 'cyan.400',
      info: 'blue.400'
    }
  },
  /**
   * Nature inspired, perfect for eco.friendly and health products
   * 自然清新 . 自然色系，适合环保、健康类产品
   */
  nature: {
    light: {
      destructive: 'red.700',
      success: 'green.700',
      warning: 'lime.700',
      info: 'teal.700'
    },
    dark: {
      destructive: 'red.300',
      success: 'green.300',
      warning: 'lime.300',
      info: 'teal.300'
    }
  },
  /**
   * Modern and minimal, great for tech products and SaaS applications
   * 现代简约 . 现代感强，适合科技产品和SaaS应用
   */
  modern: {
    light: {
      destructive: 'rose.600',
      success: 'emerald.600',
      warning: 'orange.600',
      info: 'sky.600'
    },
    dark: {
      destructive: 'rose.400',
      success: 'emerald.400',
      warning: 'orange.400',
      info: 'sky.400'
    }
  },
  /**
   * Vibrant and dynamic, perfect for sports and gaming applications
   * 活力四射 . 高能量配色，适合运动、游戏类应用
   */
  vibrant: {
    light: {
      destructive: 'pink.600',
      success: 'lime.600',
      warning: 'amber.600',
      info: 'cyan.600'
    },
    dark: {
      destructive: 'pink.400',
      success: 'lime.400',
      warning: 'amber.400',
      info: 'cyan.400'
    }
  },
  /**
   * Professional business, stable and authoritative for enterprise and B2B
   * 商务专业 . 稳重大气，适合企业级应用和B2B产品
   */
  professional: {
    light: {
      destructive: 'red.700',
      success: 'green.700',
      warning: 'amber.700',
      info: 'blue.700'
    },
    dark: {
      destructive: 'red.300',
      success: 'green.300',
      warning: 'amber.300',
      info: 'blue.300'
    }
  },
  /**
   * Dreamy and soft, ideal for design tools and creative platforms
   * 梦幻柔美 . 柔和色调，适合设计工具和创意平台
   */
  soft: {
    light: {
      destructive: 'rose.500',
      success: 'teal.500',
      warning: 'yellow.500',
      info: 'violet.500'
    },
    dark: {
      destructive: 'rose.300',
      success: 'teal.300',
      warning: 'yellow.300',
      info: 'violet.300'
    }
  },
  /**
   * Bold and striking, high contrast for strong visual impact
   * 大胆醒目 . 高对比度，适合需要强烈视觉冲击的场景
   */
  bold: {
    light: {
      destructive: 'red.700',
      success: 'emerald.700',
      warning: 'orange.700',
      info: 'blue.700'
    },
    dark: {
      destructive: 'red.300',
      success: 'emerald.300',
      warning: 'orange.300',
      info: 'blue.300'
    }
  },
  /**
   * Calm and soothing, low saturation for extended use
   * 平静舒缓 . 低饱和度，适合长时间使用的应用
   */
  calm: {
    light: {
      destructive: 'rose.600',
      success: 'teal.600',
      warning: 'amber.600',
      info: 'slate.600'
    },
    dark: {
      destructive: 'rose.400',
      success: 'teal.400',
      warning: 'amber.400',
      info: 'slate.400'
    }
  },
  /**
   * Candy colors, bright and playful for children's products
   * 糖果色彩 . 明快可爱，适合儿童产品和趣味应用
   */
  candy: {
    light: {
      destructive: 'pink.500',
      success: 'emerald.500',
      warning: 'yellow.500',
      info: 'sky.500'
    },
    dark: {
      destructive: 'pink.300',
      success: 'emerald.300',
      warning: 'yellow.300',
      info: 'sky.300'
    }
  },
  /**
   * Deep and mysterious, for dark themes and mystical styles
   * 深邃神秘 . 深色调，适合暗黑主题和神秘风格
   */
  deep: {
    light: {
      destructive: 'red.800',
      success: 'green.800',
      warning: 'amber.800',
      info: 'blue.800'
    },
    dark: {
      destructive: 'red.200',
      success: 'green.200',
      warning: 'amber.200',
      info: 'blue.200'
    }
  },
  /**
   * Fresh and light, for clean and refreshing interfaces
   * 清新淡雅 . 浅色调，适合简洁清爽的界面
   */
  light: {
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
};

export const basePaletteKeys = Object.keys(basePalettePreset) as BasePaletteKey[];

export const themePaletteKeys = Object.keys(themePalettePreset) as ThemePaletteKey[];

export const feedbackPaletteKeys = Object.keys(feedbackPalettePreset) as FeedbackPaletteKey[];
