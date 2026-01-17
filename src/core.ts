import { colord } from '@soybeanjs/colord';
import { generatePalette, tailwindPalette, tailwindPaletteHsl } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import {
  BASE_PALETTE_PRESET,
  DARK_SELECTOR,
  FEEDBACK_PALETTE_PRESET,
  THEME_PALETTE_PRESET,
  THEME_VARIABLES
} from './constants';
import { isTailwindPaletteLevelColorKey, keysOf, mountCSSVariables, removeHslBrackets } from './shared';
import type {
  ColorValue,
  DarkSelector,
  OKLCHColor,
  PresetConfig,
  SidebarExtendedPalettePreset,
  SidebarPalettePreset,
  ThemeColorPreset,
  ThemeColors,
  ThemeOptions
} from './types';

export function createShadcnTheme(options?: ThemeOptions) {
  const {
    presets,
    theme,
    radius = '0.625rem',
    styleId = 'SHADCN_THEME_STYLES',
    styleTarget = ':root',
    darkSelector = 'class',
    format = 'hsl'
  } = options || {};

  const colorPreset = presets || !theme ? generateColorPreset(presets) : generateColorPresetByTheme(theme);

  const css = generateCSSVariables(colorPreset, { radius, styleTarget, darkSelector, format });

  mountCSSVariables(css, styleId);
}

function generateColorPreset(presets?: PresetConfig) {
  const { base = 'slate', theme = 'indigo', feedback = 'classic' } = presets || {};

  const basePalette = BASE_PALETTE_PRESET[base];
  const themePalette = THEME_PALETTE_PRESET[theme];
  const feedbackPalette = FEEDBACK_PALETTE_PRESET[feedback];

  const preset = {
    light: {
      ...basePalette.light,
      ...themePalette.light,
      ...feedbackPalette.light
    },
    dark: {
      ...basePalette.dark,
      ...themePalette.dark,
      ...feedbackPalette.dark
    }
  };

  const sidebarPalette = generateSidebarPalettePreset(preset);

  const colorPreset: ThemeColorPreset = {
    light: {
      ...preset.light,
      ...sidebarPalette.light
    },
    dark: {
      ...preset.dark,
      ...sidebarPalette.dark
    }
  };

  return colorPreset;
}

/**
 * generate sidebar palette preset from base and theme palette preset
 * @param extended - extended palette preset
 */
function generateSidebarPalettePreset(extended: SidebarExtendedPalettePreset) {
  const { light, dark } = extended;

  const preset: SidebarPalettePreset = {
    light: {
      sidebar: light.background,
      sidebarForeground: light.foreground,
      sidebarPrimary: light.primary,
      sidebarPrimaryForeground: light.primaryForeground,
      sidebarAccent: light.accent,
      sidebarAccentForeground: light.accentForeground,
      sidebarBorder: light.border,
      sidebarRing: light.ring
    },
    dark: {
      sidebar: dark.background,
      sidebarForeground: dark.foreground,
      sidebarPrimary: dark.primary,
      sidebarPrimaryForeground: dark.primaryForeground,
      sidebarAccent: dark.accent,
      sidebarAccentForeground: dark.accentForeground,
      sidebarBorder: dark.border,
      sidebarRing: dark.ring
    }
  };

  return preset;
}

function generateColorPresetByTheme(theme: NonNullable<ThemeOptions['theme']>) {
  const { light, dark } = theme;

  const colorPreset = {
    light,
    dark
  } as ThemeColorPreset;

  if (!dark) {
    const darkTheme = {} as Required<ThemeColors>;

    keysOf(light).forEach(key => {
      darkTheme[key] = generateDarkVariant(light[key]) as OKLCHColor;
    });

    colorPreset.dark = darkTheme;
  }

  return colorPreset;
}

/**
 * generate dark variant color from light color
 * @param lightColor
 */
function generateDarkVariant(lightColor: ColorValue): string {
  const colorValue = getColorValue(lightColor, 'oklch');

  let color = colord(colorValue);

  color = color.isLight() ? color.darken(0.3) : color.lighten(0.1);

  return color.toOklchString();
}

function getColorValue(colorValue: ColorValue, format: 'hsl' | 'oklch', removeHslBracket: boolean = false) {
  let color: string = colorValue;

  if (!isTailwindPaletteLevelColorKey(colorValue)) {
    if (format === 'hsl' && colorValue.startsWith('oklch(')) {
      color = colord(colorValue).toHslString();
    }

    if (format === 'oklch' && colorValue.startsWith('hsl(')) {
      color = colord(colorValue).toOklchString();
    }
  } else {
    const [paletteKey, level] = colorValue.split('.') as [TailwindPaletteKey, PaletteColorLevel];

    color = format === 'hsl' ? tailwindPaletteHsl[paletteKey][level] : tailwindPalette[paletteKey][level];
  }

  if (removeHslBracket) {
    color = removeHslBrackets(color);
  }

  return color;
}

function generateCSSVariables(
  colorPreset: ThemeColorPreset,
  options: Required<Pick<ThemeOptions, 'radius' | 'styleTarget' | 'darkSelector' | 'format'>>
) {
  const { light, dark } = colorPreset;
  const { radius, format, styleTarget } = options;

  let lightCss = '';
  let darkCss = '';

  keysOf(THEME_VARIABLES).forEach(key => {
    if (key === 'radius') {
      lightCss += `${THEME_VARIABLES[key]}: ${radius};\n`;
    } else {
      const lightColor = getColorValue(light[key], format, true);
      const darkColor = getColorValue(dark[key], format, true);

      lightCss += `${THEME_VARIABLES[key]}: ${lightColor};\n`;
      darkCss += `${THEME_VARIABLES[key]}: ${darkColor};\n`;
    }
  });

  const paletteCss = generateCSSVariablesPalette(light, format);

  let css = `${styleTarget} {\n${lightCss}\n${paletteCss}\n}`;

  let darkSelector = options.darkSelector;
  if (darkSelector === 'class' || darkSelector === 'media') {
    darkSelector = DARK_SELECTOR[darkSelector as DarkSelector];
  }

  css += `\n\n${darkSelector} {\n${darkCss}\n}`;

  return css;
}

type CSSVariablesPalette = Pick<
  Required<ThemeColors>,
  'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon'
>;

function generateCSSVariablesPalette(themeColors: CSSVariablesPalette, format: 'hsl' | 'oklch') {
  const keys: (keyof CSSVariablesPalette)[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon'];

  let css = '';

  keys.forEach(key => {
    const color = getColorValue(themeColors[key], format);
    const palette = generatePalette(color, format === 'hsl' ? 'hslString' : 'oklchString');

    keysOf(palette).forEach(level => {
      let value = palette[level];
      if (format === 'hsl') {
        value = removeHslBrackets(value);
      }

      css += `${key}-${level}: ${value};\n`;
    });
  });

  return css;
}
