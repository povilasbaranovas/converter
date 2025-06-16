import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CurrencySelect } from "../CurrencySelect";
import { renderWrapped } from "@/tests/helpers";
import userEvent from "@testing-library/user-event";
import { CURRENCIES } from "@/constants/currencies";

describe("CurrencySelect", () => {
	it("disables select when loading", () => {
		vi.doMock("@/services/currency.service/currency.service", () => ({
			useGetCurrencies: () => ({ data: [], isLoading: true }),
		}));
		renderWrapped(<CurrencySelect name="from" label="From" />);
		expect(screen.getByRole("combobox")).toBeDisabled();
	});
	it("renders label", () => {
		renderWrapped(<CurrencySelect name="from" label="From Currency" />);
		expect(screen.getByText("From Currency")).toBeInTheDocument();
	});

	it("renders currency options", async () => {
		renderWrapped(<CurrencySelect name="from" label="From" />);
		await waitForElementToBeRemoved(() =>
			screen.getByTestId("countries-loading"),
		);
		await userEvent.click(screen.getByRole("combobox"));

		Object.values(CURRENCIES).forEach(({ code }) => {
			expect(
				screen.getByText(code, { exact: false }),
			).toBeInTheDocument();
		});
	});
});
