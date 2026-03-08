import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { expect } from "vitest";

import * as React from "react";

(globalThis as unknown as Record<string, unknown>)["React"] = React;

expect.extend(toHaveNoViolations);

// JSDOM doesn't implement pointer capture APIs, but Radix UI relies on them.
// Polyfill to avoid unhandled errors in unit tests.
if (typeof HTMLElement !== "undefined") {
	const proto = HTMLElement.prototype as unknown as Record<string, unknown>;

	if (typeof proto.hasPointerCapture !== "function") {
		proto.hasPointerCapture = () => false;
	}
	if (typeof proto.setPointerCapture !== "function") {
		proto.setPointerCapture = () => {
			return;
		};
	}
	if (typeof proto.releasePointerCapture !== "function") {
		proto.releasePointerCapture = () => {
			return;
		};
	}
}
