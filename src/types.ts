import type { TailwindPaletteKey, TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';

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

export interface ShadcnColors {
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
 * sidebar colors
 */
export interface SidebarColors {
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
 * chart colors
 */
export interface ChartColors {
  chart1?: ColorValue;
  chart2?: ColorValue;
  chart3?: ColorValue;
  chart4?: ColorValue;
  chart5?: ColorValue;
}

export interface ExtendedColors {
  success?: ColorValue;
  successForeground?: ColorValue;
  warning?: ColorValue;
  warningForeground?: ColorValue;
  info?: ColorValue;
  infoForeground?: ColorValue;
  carbon?: ColorValue;
  carbonForeground?: ColorValue;
}

export interface ThemeColors extends ShadcnColors, ExtendedColors, SidebarColors, ChartColors {}

export type ThemeColorKey = keyof ThemeColors;
export type ThemeColorWithAlphaKey = keyof Pick<ThemeColors, 'border' | 'input' | 'sidebarBorder'>;

/**
 * the built-in base color preset key
 */
export type BuiltinBasePresetKey = Extract<TailwindPaletteKey, 'stone' | 'zinc' | 'neutral' | 'gray' | 'slate'>;

/**
 * the built-in primary color preset key
 */
export type BuiltinPrimaryPresetKey = TailwindPaletteKey;

/**
 * the built-in feedback color preset key
 */
export type BuiltinFeedbackPresetKey =
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

export type BasePresetColorKey = Extract<
  ThemeColorKey,
  | 'background'
  | 'foreground'
  | 'card'
  | 'cardForeground'
  | 'popover'
  | 'popoverForeground'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground'
  | 'border'
  | 'input'
  | 'destructiveForeground'
  | 'successForeground'
  | 'warningForeground'
  | 'infoForeground'
  | 'carbon'
  | 'carbonForeground'
>;

export type PrimaryPresetColorKey = Extract<ThemeColorKey, 'primary' | 'ring'> | keyof ChartColors;

export type FeedbackPresetColorKey = Extract<ThemeColorKey, 'destructive' | 'success' | 'warning' | 'info'>;

export type SidebarPresetColorKey = keyof SidebarColors;

export type SidebarExtendedColorKey = Extract<
  ThemeColorKey,
  'background' | 'foreground' | 'primary' | 'primaryForeground' | 'accent' | 'accentForeground' | 'border' | 'ring'
>;

export type PresetItem<K extends string> = {
  light: {
    [key in K]: ColorValue;
  };
  dark: {
    [key in K]: ColorValue;
  };
};

export type BasePresetItem = PresetItem<BasePresetColorKey>;
export type PrimaryPresetItem = PresetItem<PrimaryPresetColorKey>;
export type FeedbackPresetItem = PresetItem<FeedbackPresetColorKey>;
export type SidebarPresetItem = PresetItem<SidebarPresetColorKey>;
export type SidebarExtendedPresetItem = PresetItem<SidebarExtendedColorKey>;
export type ThemeColorPresetItem = PresetItem<ThemeColorKey>;

export type StyleTarget = 'html' | ':root';

export type DarkSelector = 'class' | 'media';

export type ColorFormat = 'hsl' | 'oklch';

export interface CustomPreset {
  base?: Record<string, BasePresetItem>;
  primary?: Record<string, PrimaryPresetItem>;
  feedback?: Record<string, FeedbackPresetItem>;
  /**
   * the sidebar presets
   *
   * if not set, will use extended colors from base and primary colors
   */
  sidebar?: Record<string, SidebarPresetItem>;
}

export type FullPreset<T extends CustomPreset | undefined> = {
  base: Record<BuiltinBasePresetKey | (T extends CustomPreset ? keyof T['base'] : never), BasePresetItem>;
  primary: Record<BuiltinPrimaryPresetKey | (T extends CustomPreset ? keyof T['primary'] : never), PrimaryPresetItem>;
  feedback: Record<
    BuiltinFeedbackPresetKey | (T extends CustomPreset ? keyof T['feedback'] : never),
    FeedbackPresetItem
  >;
  sidebar?: Record<T extends CustomPreset ? keyof T['sidebar'] : never, SidebarPresetItem>;
};

/**
 * the preset config
 */
export interface PresetConfig<T extends CustomPreset | undefined = undefined> {
  /**
   * the base color key
   *
   * @default 'gray'
   */
  base?: keyof FullPreset<T>['base'];
  /** the primary color key
   *
   * @default 'indigo'
   */
  primary?: keyof FullPreset<T>['primary'];
  /**
   * the feedback color key
   *
   * @default 'classic'
   */
  feedback?: keyof FullPreset<T>['feedback'];
  /**
   * the sidebar style key
   *
   * @default 'extended' it means using extended colors from base and primary colors
   */
  sidebar?: 'extended' | keyof FullPreset<T>['sidebar'];
}

/**
 * theme options
 */
export interface ThemeOptions<T extends CustomPreset | undefined = undefined> extends PresetConfig<T>, ThemeRadius {
  /**
   * custom preset colors
   */
  preset?: T;
  /**
   * the border radius
   *
   * @default 0.625rem
   */
  radius?: string;
  /**
   * the style target
   *
   * @default ':root'
   */
  styleTarget?: StyleTarget;
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
