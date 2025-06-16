import { mswServer } from "@/msw/msw.server";
import { vi } from "vitest";

const onUnhandledRequest = vi.fn();

// https://github.com/mswjs/msw/issues/946
// onUnhandledRequest: 'error' does not fail test even though it should
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeAll(() => mswServer.listen({ onUnhandledRequest }));
afterAll(() => mswServer.close());
afterEach(() => {
	mswServer.resetHandlers();
	expect(onUnhandledRequest).not.toHaveBeenCalled();
	onUnhandledRequest.mockClear();
});
