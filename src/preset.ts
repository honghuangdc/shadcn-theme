import { builtinBasePreset, builtinFeedbackPreset, builtinPrimaryPreset } from './constants';
import type {
  PresetKeyConfig,
  ThemeColorPresetItem,
  CustomPreset,
  BasePresetItem,
  PrimaryPresetItem,
  FeedbackPresetItem,
  SidebarPresetItem
} from './types';

export function generateThemePreset(config: Required<PresetKeyConfig>, customPreset?: ThemeColorPresetItem) {
  let basePreset: BasePresetItem | undefined;
  let primaryPreset: PrimaryPresetItem | undefined;
  let feedbackPreset: FeedbackPresetItem | undefined;
  let sidebarPreset: SidebarPresetItem | undefined;

  if (customPreset) {
    const custom = generateCustomPreset(customPreset);
    basePreset = custom.base;
    primaryPreset = custom.primary;
    feedbackPreset = custom.feedback;
    sidebarPreset = custom.sidebar;
  } else {
    const { base, primary, feedback } = config;
    basePreset = builtinBasePreset[base];
    primaryPreset = builtinPrimaryPreset[primary];
    feedbackPreset = builtinFeedbackPreset[feedback];
    sidebarPreset = generateSidebarPreset(basePreset, primaryPreset);
  }

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

  return preset;
}

/**
 * generate sidebar color preset from base and theme color preset
 */
export function generateSidebarPreset(basePreset: BasePresetItem, themePreset: PrimaryPresetItem) {
  const preset: SidebarPresetItem = {
    light: {
      sidebar: basePreset.light.background,
      sidebarForeground: basePreset.light.foreground,
      sidebarPrimary: themePreset.light.primary,
      sidebarPrimaryForeground: basePreset.light.primaryForeground,
      sidebarAccent: basePreset.light.accent,
      sidebarAccentForeground: basePreset.light.accentForeground,
      sidebarBorder: basePreset.light.border,
      sidebarRing: themePreset.light.ring
    },
    dark: {
      sidebar: basePreset.dark.card,
      sidebarForeground: basePreset.dark.foreground,
      sidebarPrimary: themePreset.dark.primary,
      sidebarPrimaryForeground: basePreset.dark.primaryForeground,
      sidebarAccent: basePreset.dark.accent,
      sidebarAccentForeground: basePreset.dark.accentForeground,
      sidebarBorder: basePreset.dark.border,
      sidebarRing: themePreset.dark.ring
    }
  };

  return preset;
}

export function generateCustomPreset(preset: ThemeColorPresetItem) {
  const { light, dark } = preset;

  const classified: CustomPreset = {
    base: {
      light: {
        background: light.background,
        foreground: light.background,
        card: light.background,
        cardForeground: light.background,
        popover: light.background,
        popoverForeground: light.background,
        primaryForeground: light.background,
        secondary: light.background,
        secondaryForeground: light.background,
        muted: light.background,
        mutedForeground: light.background,
        accent: light.background,
        accentForeground: light.background,
        destructiveForeground: light.background,
        successForeground: light.background,
        warningForeground: light.background,
        infoForeground: light.background,
        carbon: light.background,
        carbonForeground: light.background,
        border: light.background,
        input: light.background
      },
      dark: {
        background: dark.background,
        foreground: dark.background,
        card: dark.background,
        cardForeground: dark.background,
        popover: dark.background,
        popoverForeground: dark.background,
        primaryForeground: dark.background,
        secondary: dark.background,
        secondaryForeground: dark.background,
        muted: dark.background,
        mutedForeground: dark.background,
        accent: dark.background,
        accentForeground: dark.background,
        destructiveForeground: dark.background,
        successForeground: dark.background,
        warningForeground: dark.background,
        infoForeground: dark.background,
        carbon: dark.background,
        carbonForeground: dark.background,
        border: dark.background,
        input: dark.background
      }
    },
    primary: {
      light: {
        primary: light.primary,
        ring: light.ring,
        chart1: light.chart1,
        chart2: light.chart2,
        chart3: light.chart3,
        chart4: light.chart4,
        chart5: light.chart5
      },
      dark: {
        primary: dark.primary,
        ring: dark.ring,
        chart1: dark.chart1,
        chart2: dark.chart2,
        chart3: dark.chart3,
        chart4: dark.chart4,
        chart5: dark.chart5
      }
    },
    feedback: {
      light: {
        destructive: light.destructive,
        success: light.success,
        warning: light.warning,
        info: light.info
      },
      dark: {
        destructive: dark.destructive,
        success: dark.success,
        warning: dark.warning,
        info: dark.info
      }
    },
    sidebar: {
      light: {
        sidebar: light.sidebar,
        sidebarForeground: light.sidebarForeground,
        sidebarPrimary: light.sidebarPrimary,
        sidebarPrimaryForeground: light.sidebarPrimaryForeground,
        sidebarAccent: light.sidebarAccent,
        sidebarAccentForeground: light.sidebarAccentForeground,
        sidebarBorder: light.sidebarBorder,
        sidebarRing: light.sidebarRing
      },
      dark: {
        sidebar: dark.sidebar,
        sidebarForeground: dark.sidebarForeground,
        sidebarPrimary: dark.sidebarPrimary,
        sidebarPrimaryForeground: dark.sidebarPrimaryForeground,
        sidebarAccent: dark.sidebarAccent,
        sidebarAccentForeground: dark.sidebarAccentForeground,
        sidebarBorder: dark.sidebarBorder,
        sidebarRing: dark.sidebarRing
      }
    }
  };

  return classified;
}
