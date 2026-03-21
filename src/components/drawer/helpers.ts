import { DrawerAnchor } from "./types";

export const SIGNED_DELTA: Record<DrawerAnchor, (raw: number) => number> = {
  left: (raw) => raw,
  right: (raw) => -raw,
  top: (raw) => raw,
  bottom: (raw) => -raw,
};
