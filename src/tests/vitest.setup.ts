import "@testing-library/jest-dom";
import { mswServer } from "@/tests/msw.server";
import { vi } from "vitest";

const onUnhandledRequest = vi.fn();

beforeAll(() => mswServer.listen({ onUnhandledRequest }));
afterAll(() => mswServer.close());
afterEach(() => {
	mswServer.resetHandlers();
	expect(onUnhandledRequest).not.toHaveBeenCalled();
	onUnhandledRequest.mockClear();
});

window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.setPointerCapture = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();
