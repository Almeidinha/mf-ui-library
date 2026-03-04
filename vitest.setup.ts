import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { expect } from "vitest";

import * as React from "react";

(globalThis as unknown as Record<string, unknown>)["React"] = React;

expect.extend(toHaveNoViolations);
