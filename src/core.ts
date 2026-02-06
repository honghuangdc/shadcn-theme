import { DEFAULT_PRESET_KEY } from './constants';
import { generateThemePreset } from './preset';
import { generateCSSVariables, generateRadiusCSSVariable } from './css';
import { getColorPresetCacheKey } from './shared';
import type { PresetConfig, PresetKeyConfig, ThemeOptions } from './types';

export function createShadcnTheme(options?: ThemeOptions) {
  const {
    base = DEFAULT_PRESET_KEY.base,
    primary = DEFAULT_PRESET_KEY.primary,
    feedback = DEFAULT_PRESET_KEY.feedback,
    sidebar = DEFAULT_PRESET_KEY.sidebar,
    preset,
    radius = '0.625rem',
    styleTarget = ':root',
    darkSelector = 'class',
    format = 'hsl'
  } = options || {};

  const colorCssCache = new Map<string, string>();

  const getColorCss = (config?: PresetConfig) => {
    const mergedConfig: Required<PresetKeyConfig> = {
      base: config?.base ?? base,
      primary: config?.primary ?? primary,
      feedback: config?.feedback ?? feedback,
      sidebar: config?.sidebar ?? sidebar
    };

    const cacheKey = getColorPresetCacheKey(mergedConfig);

    if (colorCssCache.has(cacheKey)) {
      return colorCssCache.get(cacheKey)!;
    }

    const themePreset = generateThemePreset(mergedConfig, config?.preset ?? preset);

    const css = generateCSSVariables(themePreset, { styleTarget, darkSelector, format });

    colorCssCache.set(cacheKey, css);

    return css;
  };

  const getRadiusCss = (update?: string) => generateRadiusCSSVariable(update ?? radius, styleTarget);

  const getCss = (config?: PresetConfig, radiusValue?: string) => {
    const radiusCss = getRadiusCss(radiusValue ?? radius);
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
