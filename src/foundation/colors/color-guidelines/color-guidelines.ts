import { clamp, concatHex, Hex, toHex } from "@helpers";

import { BLUE, GRAY, GREEN, ORANGE, RED, WHITE } from "../base-palette";

function addOpacity(hex: Hex, opacity: number): Hex {
  const opacityHex = toHex(clamp(Math.floor(0xff * opacity), 0, 0xff), 2);
  return concatHex(hex, opacityHex);
}

export const Background = {
  Default: GRAY[100],
  Overlay: addOpacity(GRAY[800], 0.6),
} as const;

export const Surface = {
  Default: {
    Default: WHITE,
    Subdued: GRAY[50],
    Hover: GRAY[100],
    Pressed: GRAY[200],
    Depressed: GRAY[200],
    Inverse: GRAY[800],
  },

  Selected: {
    Default: BLUE[50],
    Hover: BLUE[100],
    Pressed: BLUE[200],
  },

  Critical: {
    Default: RED[200],
    Subdued: RED[50],
    Hover: RED[50],
    Pressed: RED[100],
  },

  Warning: {
    Default: ORANGE[200],
    Subdued: ORANGE[50],
  },

  Success: {
    Default: GREEN[200],
    Subdued: GREEN[50],
    Depressed: GREEN[500],
  },

  Highlight: {
    Default: BLUE[200],
    Subdued: BLUE[50],
  },

  Neutral: {
    Default: GRAY[200],
    Subdued: GRAY[100],
    Hover: GRAY[300],
    Pressed: GRAY[400],
  },
};

export const Borders = {
  Default: {
    Default: GRAY[300],
    Subdued: GRAY[200],
    Light: WHITE,
    Dark: GRAY[400],
  },
  Critical: {
    Default: RED[600],
    Subdued: RED[300],
  },
  Warning: {
    Subdued: ORANGE[300],
  },
  Success: {
    Subdued: GREEN[300],
  },
  Highlight: {
    Default: BLUE[600],
    Subdued: BLUE[300],
  },
};

export const Focused = {
  Default: BLUE[400],
  Critical: RED[400],
};

export const Text = {
  Default: GRAY[800],
  Subdued: GRAY[500],
  Light: GRAY[400],
  Critical: RED[600],
  Success: GREEN[600],
  OnPrimary: WHITE,
  OnCritical: WHITE,
};

export const Icons = {
  Default: GRAY[500],
  Subdued: GRAY[400],
  Hover: GRAY[800],
  Pressed: GRAY[600],
  Disabled: GRAY[300],
  Critical: RED[600],
  Warning: ORANGE[500],
  Success: GREEN[600],
  Highlight: BLUE[600],
  OnPrimary: WHITE,
  OnCritical: WHITE,
};

export const Interactive = {
  Default: {
    Default: BLUE[600],
    Hover: BLUE[800],
    Pressed: BLUE[800],
    Disabled: GRAY[400],
  },
  Subtle: {
    Default: GRAY[800],
    Hover: GRAY[800],
    Pressed: GRAY[800],
    Disabled: GRAY[400],
  },
};

const DisabledGray = addOpacity(GRAY[800], 0.06);
const PressedGray = addOpacity(GRAY[800], 0.12);

export const Actions = {
  Primary: {
    Default: BLUE[600],
    Hover: BLUE[700],
    Pressed: BLUE[800],
    Depressed: BLUE[900],
    Disabled: DisabledGray,
  },
  Secondary: {
    Default: WHITE,
    Hover: DisabledGray,
    Pressed: PressedGray,
    Depressed: GRAY[500],
    Disabled: DisabledGray,
  },
  Critical: {
    Default: RED[600],
    Hover: RED[700],
    Pressed: RED[800],
    Disabled: DisabledGray,
  },
  SecondaryCritical: {
    Default: WHITE,
    Hover: RED[700],
    Pressed: RED[800],
    Disabled: DisabledGray,
  },
};
