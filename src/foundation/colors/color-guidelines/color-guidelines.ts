function colorVar(...path: string[]): string {
  return `var(--mfui-color-${path.join("-").toLowerCase()})`;
}

export const Background = {
  Default: colorVar("Background", "Default"),
  White: colorVar("Background", "White"),
  Muted: colorVar("Background", "Muted"),
  Inverse: colorVar("Background", "Inverse"),
  Overlay: colorVar("Background", "Overlay"),
} as const;

export const Surface = {
  Default: {
    Default: colorVar("Surface", "Default", "Default"),
    Muted: colorVar("Surface", "Default", "Muted"),
    Hover: colorVar("Surface", "Default", "Hover"),
    Pressed: colorVar("Surface", "Default", "Pressed"),
    Active: colorVar("Surface", "Default", "Active"),
    Inverse: colorVar("Surface", "Default", "Inverse"),
  },

  Selected: {
    Soft: colorVar("Surface", "Selected", "Soft"),
    Muted: colorVar("Surface", "Selected", "Muted"),
    Default: colorVar("Surface", "Selected", "Default"),
    Hover: colorVar("Surface", "Selected", "Hover"),
    Pressed: colorVar("Surface", "Selected", "Pressed"),
    Active: colorVar("Surface", "Selected", "Active"),
  },

  Critical: {
    Soft: colorVar("Surface", "Critical", "Soft"),
    Default: colorVar("Surface", "Critical", "Default"),
    Muted: colorVar("Surface", "Critical", "Muted"),
    Hover: colorVar("Surface", "Critical", "Hover"),
    Pressed: colorVar("Surface", "Critical", "Pressed"),
    Active: colorVar("Surface", "Critical", "Active"),
  },

  Warning: {
    Soft: colorVar("Surface", "Warning", "Soft"),
    Hover: colorVar("Surface", "Warning", "Hover"),
    Default: colorVar("Surface", "Warning", "Default"),
    Pressed: colorVar("Surface", "Warning", "Pressed"),
    Muted: colorVar("Surface", "Warning", "Muted"),
    Active: colorVar("Surface", "Warning", "Active"),
  },

  Success: {
    Soft: colorVar("Surface", "Success", "Soft"),
    Hover: colorVar("Surface", "Success", "Hover"),
    Default: colorVar("Surface", "Success", "Default"),
    Pressed: colorVar("Surface", "Success", "Pressed"),
    Muted: colorVar("Surface", "Success", "Muted"),
    Active: colorVar("Surface", "Success", "Active"),
  },

  Highlight: {
    Soft: colorVar("Surface", "Highlight", "Soft"),
    Hover: colorVar("Surface", "Highlight", "Hover"),
    Default: colorVar("Surface", "Highlight", "Default"),
    Pressed: colorVar("Surface", "Highlight", "Pressed"),
    Muted: colorVar("Surface", "Highlight", "Muted"),
    Active: colorVar("Surface", "Highlight", "Active"),
  },

  Neutral: {
    Soft: colorVar("Surface", "Neutral", "Soft"),
    Default: colorVar("Surface", "Neutral", "Default"),
    Muted: colorVar("Surface", "Neutral", "Muted"),
    Hover: colorVar("Surface", "Neutral", "Hover"),
    Pressed: colorVar("Surface", "Neutral", "Pressed"),
    Active: colorVar("Surface", "Neutral", "Active"),
  },

  Violet: {
    Soft: colorVar("Surface", "Violet", "Soft"),
    Hover: colorVar("Surface", "Violet", "Hover"),
    Default: colorVar("Surface", "Violet", "Default"),
    Pressed: colorVar("Surface", "Violet", "Pressed"),
    Muted: colorVar("Surface", "Violet", "Muted"),
    Active: colorVar("Surface", "Violet", "Active"),
  },

  Cyan: {
    Soft: colorVar("Surface", "Cyan", "Soft"),
    Hover: colorVar("Surface", "Cyan", "Hover"),
    Default: colorVar("Surface", "Cyan", "Default"),
    Pressed: colorVar("Surface", "Cyan", "Pressed"),
    Muted: colorVar("Surface", "Cyan", "Muted"),
    Active: colorVar("Surface", "Cyan", "Active"),
  },
} as const;

export const Borders = {
  Default: {
    Default: colorVar("Borders", "Default", "Default"),
    Muted: colorVar("Borders", "Default", "Muted"),
    Soft: colorVar("Borders", "Default", "Soft"),
    Dark: colorVar("Borders", "Default", "Dark"),
    Active: colorVar("Borders", "Default", "Active"),
  },
  Critical: {
    Soft: colorVar("Borders", "Critical", "Soft"),
    Default: colorVar("Borders", "Critical", "Default"),
    Muted: colorVar("Borders", "Critical", "Muted"),
    Active: colorVar("Borders", "Critical", "Active"),
  },
  Warning: {
    Soft: colorVar("Borders", "Warning", "Soft"),
    Default: colorVar("Borders", "Warning", "Default"),
    Muted: colorVar("Borders", "Warning", "Muted"),
    Active: colorVar("Borders", "Warning", "Active"),
  },
  Success: {
    Soft: colorVar("Borders", "Success", "Soft"),
    Default: colorVar("Borders", "Success", "Default"),
    Dark: colorVar("Borders", "Success", "Dark"),
    Muted: colorVar("Borders", "Success", "Muted"),
    Active: colorVar("Borders", "Success", "Active"),
  },
  Highlight: {
    Soft: colorVar("Borders", "Highlight", "Soft"),
    Default: colorVar("Borders", "Highlight", "Default"),
    Muted: colorVar("Borders", "Highlight", "Muted"),
    Active: colorVar("Borders", "Highlight", "Active"),
  },
  Neutral: {
    Soft: colorVar("Borders", "Neutral", "Soft"),
    Default: colorVar("Borders", "Neutral", "Default"),
    Muted: colorVar("Borders", "Neutral", "Muted"),
    Active: colorVar("Borders", "Neutral", "Active"),
  },
  Violet: {
    Soft: colorVar("Borders", "Violet", "Soft"),
    Default: colorVar("Borders", "Violet", "Default"),
    Muted: colorVar("Borders", "Violet", "Muted"),
    Active: colorVar("Borders", "Violet", "Active"),
  },
  Cyan: {
    Soft: colorVar("Borders", "Cyan", "Soft"),
    Default: colorVar("Borders", "Cyan", "Default"),
    Muted: colorVar("Borders", "Cyan", "Muted"),
    Active: colorVar("Borders", "Cyan", "Active"),
  },
} as const;

export const Focus = {
  Default: colorVar("Focus", "Default"),
  Critical: colorVar("Focus", "Critical"),
} as const;

export const TextColors = {
  Default: colorVar("Text", "Default"),
  Neutral: colorVar("Text", "Neutral"),
  Muted: colorVar("Text", "Muted"),
  Soft: colorVar("Text", "Soft"),
  Disabled: colorVar("Text", "Disabled"),
  Critical: colorVar("Text", "Critical"),
  Warning: colorVar("Text", "Warning"),
  Success: colorVar("Text", "Success"),
  Active: colorVar("Text", "Active"),
  Highlight: colorVar("Text", "Highlight"),
  Violet: colorVar("Text", "Violet"),
  Cyan: colorVar("Text", "Cyan"),
  OnPrimary: colorVar("Text", "OnPrimary"),
  OnCritical: colorVar("Text", "OnCritical"),
  OnInverse: colorVar("Text", "OnInverse"),
} as const;

export const Icons = {
  Default: colorVar("Icons", "Default"),
  Muted: colorVar("Icons", "Muted"),
  Hover: colorVar("Icons", "Hover"),
  Pressed: colorVar("Icons", "Pressed"),
  Disabled: colorVar("Icons", "Disabled"),
  Critical: colorVar("Icons", "Critical"),
  Warning: colorVar("Icons", "Warning"),
  Success: colorVar("Icons", "Success"),
  Highlight: colorVar("Icons", "Highlight"),
  OnPrimary: colorVar("Icons", "OnPrimary"),
  OnCritical: colorVar("Icons", "OnCritical"),
  OnInverse: colorVar("Icons", "OnInverse"),
} as const;

export const Interactive = {
  Default: {
    Default: colorVar("Interactive", "Default", "Default"),
    Hover: colorVar("Interactive", "Default", "Hover"),
    Pressed: colorVar("Interactive", "Default", "Pressed"),
    Active: colorVar("Interactive", "Default", "Active"),
    Disabled: colorVar("Interactive", "Default", "Disabled"),
  },
  Subtle: {
    Default: colorVar("Interactive", "Subtle", "Default"),
    Hover: colorVar("Interactive", "Subtle", "Hover"),
    Pressed: colorVar("Interactive", "Subtle", "Pressed"),
    Active: colorVar("Interactive", "Subtle", "Active"),
    Disabled: colorVar("Interactive", "Subtle", "Disabled"),
  },
} as const;

export const Actions = {
  Primary: {
    Default: colorVar("Actions", "Primary", "Default"),
    Hover: colorVar("Actions", "Primary", "Hover"),
    Pressed: colorVar("Actions", "Primary", "Pressed"),
    Active: colorVar("Actions", "Primary", "Active"),
    Disabled: colorVar("Actions", "Primary", "Disabled"),
  },
  Secondary: {
    Default: colorVar("Actions", "Secondary", "Default"),
    Hover: colorVar("Actions", "Secondary", "Hover"),
    Pressed: colorVar("Actions", "Secondary", "Pressed"),
    Active: colorVar("Actions", "Secondary", "Active"),
    Disabled: colorVar("Actions", "Secondary", "Disabled"),
  },
  Critical: {
    Default: colorVar("Actions", "Critical", "Default"),
    Hover: colorVar("Actions", "Critical", "Hover"),
    Pressed: colorVar("Actions", "Critical", "Pressed"),
    Active: colorVar("Actions", "Critical", "Active"),
    Disabled: colorVar("Actions", "Critical", "Disabled"),
  },
  SecondaryCritical: {
    Default: colorVar("Actions", "SecondaryCritical", "Default"),
    Hover: colorVar("Actions", "SecondaryCritical", "Hover"),
    Pressed: colorVar("Actions", "SecondaryCritical", "Pressed"),
    Active: colorVar("Actions", "SecondaryCritical", "Active"),
    Disabled: colorVar("Actions", "SecondaryCritical", "Disabled"),
  },
} as const;
