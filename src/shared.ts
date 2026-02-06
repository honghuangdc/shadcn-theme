import { colord } from '@soybeanjs/colord';
import { tailwindPalette, simplePalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey, TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';
import type { ColorFormat, ColorValue, PresetConfig } from './types';

export function keysOf<TRecord extends Record<string, unknown>>(record: TRecord) {
  return Object.keys(record) as (keyof TRecord)[];
}

export function isTailwindPaletteLevelColorKey(color: ColorValue): color is TailwindPaletteLevelColorKey {
  return !color.startsWith('hsl(') && !color.startsWith('oklch(');
}

export function removeHslBrackets(color: string) {
  return color.replace(/hsl\(/g, '').replace(/\)/g, '');
}

export const isUnTransformedColor = (color: ColorValue) => {
  return ['inherit', 'currentColor', 'transparent'].includes(color);
};

export function getColorValue(colorValue: ColorValue, format: ColorFormat) {
  let color: string = colorValue;

  if (isUnTransformedColor(colorValue)) {
    return color;
  }

  if (colorValue === 'black') {
    return simplePalette.black[format];
  }

  if (colorValue === 'white') {
    return simplePalette.white[format];
  }

  if (isTailwindPaletteLevelColorKey(colorValue)) {
    const [paletteKey, level] = colorValue.split('.') as [TailwindPaletteKey, PaletteColorLevel];

    color = tailwindPalette[paletteKey][level][format];
  } else {
    if (format === 'hsl' && colorValue.startsWith('oklch(')) {
      color = colord(colorValue).toHslString();
    }

    if (format === 'oklch' && colorValue.startsWith('hsl(')) {
      color = colord(colorValue).toOklchString();
    }
  }

  return color;
}

export function getColorPresetCacheKey(config: PresetConfig) {
  const { base, primary, feedback, sidebar } = config;

  const key = `base:${base};primary:${primary};feedback:${feedback};sidebar:${sidebar}`;

  return key;
}
