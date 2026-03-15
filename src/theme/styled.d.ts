import "styled-components";

import type { MfUITheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends MfUITheme {}
}
