import { breakpoints } from "foundation/breakpoints";

import { useMediaQuery } from "./useMediaQuery";

export const useIsMobile = (): boolean => useMediaQuery(breakpoints.down("lg"));
