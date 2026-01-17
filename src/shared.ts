import type { TailwindPaletteLevelColorKey } from '@soybeanjs/colord/palette';
import type { ColorValue } from './types';

export function keysOf<TRecord extends Record<string, unknown>>(record: TRecord) {
  return Object.keys(record) as (keyof TRecord)[];
}

export function mountCSSVariables(css: string, styleId: string) {
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

export function isTailwindPaletteLevelColorKey(color: ColorValue): color is TailwindPaletteLevelColorKey {
  return !color.startsWith('hsl(') && !color.startsWith('oklch(');
}

export function removeHslBrackets(color: string) {
  return color.replace(/hsl\(/g, '').replace(/\)/g, '');
}
