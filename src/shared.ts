import { colord } from '@soybeanjs/colord';
import { tailwindPalette, tailwindPaletteHsl } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey, TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';
import type { ColorFormat, ColorValue, CustomPreset, PresetConfig } from './types';

export function keysOf<TRecord extends Record<string, unknown>>(record: TRecord) {
  return Object.keys(record) as (keyof TRecord)[];
}

export function isTailwindPaletteLevelColorKey(color: ColorValue): color is TailwindPaletteLevelColorKey {
  return !color.startsWith('hsl(') && !color.startsWith('oklch(');
}

export function removeHslBrackets(color: string) {
  return color.replace(/hsl\(/g, '').replace(/\)/g, '');
}

export function getColorValue(colorValue: ColorValue, format: ColorFormat) {
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

  return color;
}

export function getColorPresetCacheKey<T extends CustomPreset | undefined>(config: Required<PresetConfig<T>>) {
  // @ts-expect-error ignore generic in template string
  const key = `base:${config.base};primary:${config.primary};feedback:${config.feedback};sidebar:${config.sidebar}`;

  return key;
}
