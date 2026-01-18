import { builtinBasePreset, builtinFeedbackPreset, builtinPrimaryPreset } from './constants';
import { generateThemePreset } from './preset';
import { generateCSSVariables, generateRadiusCSSVariable } from './css';
import { getColorPresetCacheKey } from './shared';
import type { CustomPreset, FullPreset, PresetConfig, ThemeOptions } from './types';

export function createShadcnTheme<T extends CustomPreset | undefined = undefined>(options?: ThemeOptions<T>) {
  const {
    base = 'gray',
    primary = 'indigo',
    feedback = 'classic',
    sidebar = 'extended',
    preset,
    radius = '0.625rem',
    styleTarget = ':root',
    darkSelector = 'class',
    format = 'hsl'
  } = options || {};

  const fullPreset = {
    base: {
      ...builtinBasePreset,
      ...preset?.base
    },
    primary: {
      ...builtinPrimaryPreset,
      ...preset?.primary
    },
    feedback: {
      ...builtinFeedbackPreset,
      ...preset?.feedback
    },
    sidebar: {
      ...preset?.sidebar
    }
  } as FullPreset<T>;

  const colorCssCache = new Map<string, string>();

  const getColorCss = (config: PresetConfig<T>) => {
    const mergedConfig: Required<PresetConfig<T>> = {
      base,
      primary,
      feedback,
      sidebar,
      ...config
    };

    const cacheKey = getColorPresetCacheKey(mergedConfig);

    if (colorCssCache.has(cacheKey)) {
      return colorCssCache.get(cacheKey)!;
    }

    const themePreset = generateThemePreset(mergedConfig, fullPreset);

    const css = generateCSSVariables(themePreset, { styleTarget, darkSelector, format });

    colorCssCache.set(cacheKey, css);

    return css;
  };

  const getRadiusCss = (update: string = radius) => generateRadiusCSSVariable(update, styleTarget);

  const getCss = (config: PresetConfig<T> = { base, primary, feedback, sidebar }, radiusValue: string = radius) => {
    const radiusCss = getRadiusCss(radiusValue);
    const css = getColorCss(config);

    return `${radiusCss}\n\n${css}`;
  };

  return {
    /**
     * get the complete css variables string
     *
     * the result is the combination of color css variables and radius css variable
     */
    getCss,
    /**
     * get the color css variables string
     */
    getColorCss,
    /**
     * get the radius css variable string
     */
    getRadiusCss
  };
}
