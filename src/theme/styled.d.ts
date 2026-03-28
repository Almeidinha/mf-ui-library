import "styled-components";

import type { MfUITheme } from "./theme";

declare module "styled-components" {
  // This module augmentation intentionally only extends the existing theme shape.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends MfUITheme {}
}
