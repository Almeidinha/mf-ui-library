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
    Muted: GRAY[50],
    Hover: GRAY[100],
    Pressed: GRAY[200],
    Active: GRAY[200],
    Inverse: GRAY[800],
  },

  Selected: {
    Soft: BLUE[50],
    Muted: BLUE[50],
    Default: BLUE[50],
    Hover: BLUE[100],
    Pressed: BLUE[200],
    Active: BLUE[500],
  },

  Critical: {
    Soft: RED[50],
    Default: RED[200],
    Muted: RED[50],
    Hover: RED[50],
    Pressed: RED[100],
    Active: RED[300],
  },

  Warning: {
    Soft: ORANGE[50],
    Hover: ORANGE[100],
    Default: ORANGE[200],
    Pressed: ORANGE[300],
    Muted: ORANGE[50],
    Active: ORANGE[500],
  },

  Success: {
    Soft: GREEN[50],
    Hover: GREEN[100],
    Default: GREEN[200],
    Pressed: GREEN[300],
    Muted: GREEN[50],
    Active: GREEN[500],
  },

  Highlight: {
    Soft: BLUE[50],
    Hover: BLUE[100],
    Default: BLUE[200],
    Pressed: BLUE[300],
    Muted: BLUE[50],
    Active: BLUE[500],
  },

  Neutral: {
    Soft: GRAY[50],
    Default: GRAY[200],
    Muted: GRAY[100],
    Hover: GRAY[300],
    Pressed: GRAY[400],
    Active: GRAY[500],
  },
};

export const Borders = {
  Default: {
    Default: GRAY[300],
    Muted: GRAY[200],
    Soft: WHITE,
    Dark: GRAY[400],
    Active: GRAY[500],
  },
  Critical: {
    Soft: RED[50],
    Default: RED[600],
    Muted: RED[300],
    Active: RED[700],
  },
  Warning: {
    Soft: ORANGE[50],
    Default: ORANGE[300],
    Muted: ORANGE[300],
    Active: ORANGE[500],
  },
  Success: {
    Soft: GREEN[50],
    Default: GREEN[200],
    Dark: GREEN[300],
    Muted: GREEN[50],
    Active: GREEN[500],
  },
  Highlight: {
    Soft: BLUE[50],
    Default: BLUE[200],
    Muted: BLUE[50],
    Active: BLUE[500],
  },
};

export const Focus = {
  Default: BLUE[400],
  Critical: RED[400],
};

export const Text = {
  Default: GRAY[800],
  Muted: GRAY[500],
  Soft: GRAY[400],
  Disabled: GRAY[500],
  Critical: RED[600],
  Warning: ORANGE[700],
  Success: GREEN[600],
  Active: BLUE[600],
  OnPrimary: WHITE,
  OnCritical: WHITE,
  OnInverse: WHITE,
};

export const Icons = {
  Default: GRAY[500],
  Muted: GRAY[400],
  Hover: GRAY[800],
  Pressed: GRAY[600],
  Disabled: GRAY[400],
  Critical: RED[600],
  Warning: ORANGE[500],
  Success: GREEN[600],
  Highlight: BLUE[600],
  OnPrimary: WHITE,
  OnCritical: WHITE,
  OnInverse: WHITE,
};

export const Interactive = {
  Default: {
    Default: BLUE[600],
    Hover: BLUE[800],
    Pressed: BLUE[800],
    Active: BLUE[900],
    Disabled: GRAY[400],
  },
  Subtle: {
    Default: GRAY[800],
    Hover: GRAY[800],
    Pressed: GRAY[800],
    Active: GRAY[900],
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
    Active: BLUE[900],
    Disabled: DisabledGray,
  },
  Secondary: {
    Default: WHITE,
    Hover: DisabledGray,
    Pressed: PressedGray,
    Active: GRAY[500],
    Disabled: DisabledGray,
  },
  Critical: {
    Default: RED[600],
    Hover: RED[700],
    Pressed: RED[800],
    Active: RED[900],
    Disabled: DisabledGray,
  },
  SecondaryCritical: {
    Default: WHITE,
    Hover: RED[700],
    Pressed: RED[800],
    Active: RED[900],
    Disabled: DisabledGray,
  },
};
