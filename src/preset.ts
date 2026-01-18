import type {
  CustomPreset,
  FullPreset,
  PresetConfig,
  SidebarExtendedPresetItem,
  SidebarPresetItem,
  ThemeColorPresetItem
} from './types';

export function generateThemePreset<T extends CustomPreset | undefined = undefined>(
  config: Required<PresetConfig<T>>,
  fullPreset: FullPreset<T>
) {
  const { base, primary, feedback, sidebar } = config;

  const basePreset = fullPreset.base[base];
  const primaryPreset = fullPreset.primary[primary];
  const feedbackPreset = fullPreset.feedback[feedback];
  const sidebarPreset =
    (sidebar === 'extended' ? undefined : fullPreset.sidebar?.[sidebar]) || ({} as SidebarPresetItem);

  const preset: ThemeColorPresetItem = {
    light: {
      ...basePreset.light,
      ...primaryPreset.light,
      ...feedbackPreset.light,
      ...sidebarPreset.light
    },
    dark: {
      ...basePreset.dark,
      ...primaryPreset.dark,
      ...feedbackPreset.dark,
      ...sidebarPreset.dark
    }
  };

  if (sidebar === 'extended') {
    const extendedSidebar = generateSidebarPreset(preset);

    Object.assign(preset.light, extendedSidebar.light);
    Object.assign(preset.dark, extendedSidebar.dark);
  }

  return preset;
}

/**
 * generate sidebar color preset from base and theme color preset
 * @param extended - extended color preset
 */
function generateSidebarPreset(extended: SidebarExtendedPresetItem) {
  const { light, dark } = extended;

  const preset: SidebarPresetItem = {
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
