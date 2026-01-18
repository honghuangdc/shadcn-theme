import type { TailwindPaletteKey, TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';

/**
 * the base palette key
 */
export type BasePaletteKey = Extract<TailwindPaletteKey, 'stone' | 'zinc' | 'neutral' | 'gray' | 'slate'>;

export type FeedbackPaletteKey =
  | 'classic'
  | 'vivid'
  | 'subtle'
  | 'warm'
  | 'cool'
  | 'nature'
  | 'modern'
  | 'vibrant'
  | 'professional'
  | 'soft'
  | 'bold'
  | 'calm'
  | 'candy'
  | 'deep'
  | 'light';

export type ThemePaletteKey = TailwindPaletteKey;

/**
 * the preset config
 */
export interface PresetConfig {
  /**
   * the base palette key
   *
   * @default 'stone'
   */
  base?: BasePaletteKey;
  /** the theme palette key
   *
   * @default 'indigo'
   */
  theme?: ThemePaletteKey;
  /**
   * the feedback palette key
   *
   * @default 'classic'
   */
  feedback?: FeedbackPaletteKey;
}

export interface ThemeRadius {
  /**
   * the border radius
   *
   * @default '0.625rem'
   */
  radius?: string;
}

export type HSLColor = `hsl(${number} ${number}% ${number}%)` | `hsl(${number} ${number}% ${number}% / ${number})`;

export type OKLCHColor = `oklch(${number}% ${number} ${number})` | `oklch(${number}% ${number} ${number} / ${number})`;

export type ColorValue = HSLColor | OKLCHColor | TailwindPaletteLevelColorKey;

export interface BaseThemeColors {
  background?: ColorValue;
  foreground?: ColorValue;
  card?: ColorValue;
  cardForeground?: ColorValue;
  popover?: ColorValue;
  popoverForeground?: ColorValue;
  primary?: ColorValue;
  primaryForeground?: ColorValue;
  secondary?: ColorValue;
  secondaryForeground?: ColorValue;
  muted?: ColorValue;
  mutedForeground?: ColorValue;
  accent?: ColorValue;
  accentForeground?: ColorValue;
  destructive?: ColorValue;
  destructiveForeground?: ColorValue;
  border?: ColorValue;
  input?: ColorValue;
  ring?: ColorValue;
}
/**
 * sidebar theme colors
 */
export interface SidebarThemeColors {
  /**
   * the sidebar background color
   *
   * if not set, will use the theme background color
   */
  sidebar?: ColorValue;
  /**
   * the sidebar foreground color
   *
   * if not set, will use the theme foreground color
   */
  sidebarForeground?: ColorValue;
  /**
   * the sidebar primary color
   *
   * if not set, will use the theme primary color
   */
  sidebarPrimary?: ColorValue;
  /**
   * the sidebar primary foreground color
   *
   * if not set, will use the theme primary foreground color
   */
  sidebarPrimaryForeground?: ColorValue;
  /**
   * the sidebar accent color
   *
   * if not set, will use the theme accent color
   */
  sidebarAccent?: ColorValue;
  /**
   * the sidebar accent foreground color
   *
   * if not set, will use the theme accent foreground color
   */
  sidebarAccentForeground?: ColorValue;
  /**
   * the sidebar border color
   *
   * if not set, will use the theme border color
   */
  sidebarBorder?: ColorValue;
  /**
   * the sidebar ring color
   *
   * if not set, will use the theme ring color
   */
  sidebarRing?: ColorValue;
}

/**
 * chart theme colors
 */
export interface ChartThemeColors {
  chart1?: ColorValue;
  chart2?: ColorValue;
  chart3?: ColorValue;
  chart4?: ColorValue;
  chart5?: ColorValue;
}

export interface ExtendedThemeColors {
  success?: ColorValue;
  successForeground?: ColorValue;
  warning?: ColorValue;
  warningForeground?: ColorValue;
  info?: ColorValue;
  infoForeground?: ColorValue;
  carbon?: ColorValue;
  carbonForeground?: ColorValue;
}

export interface ThemeColors extends BaseThemeColors, ExtendedThemeColors, SidebarThemeColors, ChartThemeColors {}

export interface ShadcnTheme extends ThemeColors, ThemeRadius {}

export type ThemeColorsKey = keyof ThemeColors;
export type ThemeColorAlphaKey = keyof Pick<ThemeColors, 'border' | 'input' | 'sidebarBorder'>;

export type BasePalettePresetColorKey =
  | keyof Omit<BaseThemeColors, 'primary' | 'destructive' | 'ring'>
  | keyof Pick<
      ExtendedThemeColors,
      'successForeground' | 'warningForeground' | 'infoForeground' | 'carbon' | 'carbonForeground'
    >;

export type ThemePalettePresetColorKey = keyof Pick<BaseThemeColors, 'ring' | 'primary'> | keyof ChartThemeColors;

export type FeedbackPalettePresetColorKey =
  | keyof Pick<BaseThemeColors, 'destructive'>
  | keyof Pick<ExtendedThemeColors, 'success' | 'warning' | 'info'>;

export type PresetItem<K extends string> = {
  light: {
    [key in K]: ColorValue;
  };
  dark: {
    [key in K]: ColorValue;
  };
};

export type BasePalettePreset = Record<BasePaletteKey, PresetItem<BasePalettePresetColorKey>>;

export type ThemePalettePreset = Record<TailwindPaletteKey, PresetItem<ThemePalettePresetColorKey>>;

export type FeedbackPalettePreset = Record<FeedbackPaletteKey, PresetItem<FeedbackPalettePresetColorKey>>;

export type SidebarExtendedPaletteKey = keyof Pick<
  ThemeColors,
  'background' | 'foreground' | 'primary' | 'primaryForeground' | 'accent' | 'accentForeground' | 'border' | 'ring'
>;

export type SidebarExtendedPalettePreset = PresetItem<SidebarExtendedPaletteKey>;

export type SidebarPalettePreset = PresetItem<keyof SidebarThemeColors>;

export type ThemeColorPreset = PresetItem<ThemeColorsKey>;

export type DarkSelector = 'class' | 'media';

export type ColorFormat = 'hsl' | 'oklch';

/**
 * theme options
 */
export interface ThemeOptions {
  /**
   * presets config
   *
   * this priority is higher than the theme and darkTheme
   */
  presets?: PresetConfig;
  /**
   * theme color config
   */
  theme?: {
    /**
     * light theme
     */
    light: Required<ThemeColors>;
    /**
     * dark theme
     *
     * if not set, will use the light theme to generate dark variant colors
     */
    dark?: Required<ThemeColors>;
  };
  /**
   * the border radius
   *
   * @default 0.625rem
   */
  radius?: string;
  /**
   * the style id
   *
   * @default 'SHADCN_THEME_STYLES'
   */
  styleId?: string;
  /**
   * the style target
   *
   * @default ':root'
   */
  styleTarget?: 'html' | ':root';
  /**
   * dark mode selector
   *
   * - class: ".dark"
   * - media: "@media (prefers-color-scheme: dark)"
   * - custom: custom dark mode selector, e.g. ".custom-dark"
   *
   * @default 'class'
   */
  darkSelector?: DarkSelector | (string & {});
  /**
   * color output format
   *
   * - hsl: "h s l [/ alpha]", e.g. "0 0% 100% / 0.1"
   * - oklch: "oklch(l c h [/ alpha])", e.g. "oklch(0 0 0 / 0.1)"
   *
   * @default 'hsl'
   */
  format?: ColorFormat;
}
