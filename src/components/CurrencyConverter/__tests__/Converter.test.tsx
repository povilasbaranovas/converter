import { renderWrapped } from "@/tests/helpers";
import {
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Converter } from "../Converter";

function render() {
	return renderWrapped(<Converter />);
}

describe("Converter", () => {
	it("renders default form", () => {
		render();
		expect(screen.getByTestId("converter-form")).toBeInTheDocument();
		expect(screen.getByLabelText("amount-input")).toHaveValue(1);
		expect(screen.getByText("FROM:")).toBeInTheDocument();
		expect(screen.getByText("TO:")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Convert" }),
		).toBeInTheDocument();
	});

	it("inputs value and submits, shows conversion", async () => {
		render();
		const amountInput = screen.getByLabelText("amount-input");
		await userEvent.clear(amountInput);
		await userEvent.type(amountInput, "10");
		expect(amountInput).toHaveValue(10);
		const button = screen.getByRole("button", { name: "Convert" });
		await userEvent.click(button);

		await waitFor(() => {
			expect(button).not.toBeInTheDocument();
			expect(screen.getByText("CONVERTED TO:")).toBeInTheDocument();
			expect(screen.getByText("1 EUR = 2 GBP")).toBeInTheDocument();
		});
		await waitFor(
			() => {
				expect(
					screen.getByLabelText("convertedAmount-input"),
				).toHaveValue(20);
			},
			{ timeout: 3000 },
		);
	});

	it("updates value and toAmount updates automatically", async () => {
		render();
		const amountInput = screen.getByLabelText("amount-input");
		await userEvent.clear(amountInput);
		await userEvent.type(amountInput, "5");
		await userEvent.click(screen.getByRole("button", { name: "Convert" }));
		await waitFor(() => {
			expect(screen.getByLabelText("convertedAmount-input")).toHaveValue(
				10,
			);
		});

		await userEvent.clear(amountInput);
		await userEvent.type(amountInput, "7");
		await waitFor(() => {
			expect(screen.getByLabelText("convertedAmount-input")).toHaveValue(
				14,
			);
		});
	});

	it("changes from one currency to another", async () => {
		render();
		const fromSelect = screen.getAllByRole("combobox")[0];

		await waitForElementToBeRemoved(
			() => screen.getAllByTestId("countries-loading")[0],
		);

		await userEvent.click(fromSelect);
		const optionPLN = screen.getByTestId("option-PLN");

		await userEvent.click(optionPLN);
		// Submit
		await userEvent.click(screen.getByRole("button", { name: "Convert" }));
		await waitFor(() => {
			expect(screen.getByText("1 PLN = 2 GBP")).toBeInTheDocument();
		});
	});

	it("swaps currencies when swap button is clicked", async () => {
		render();
		await userEvent.click(screen.getByRole("button", { name: "Convert" }));
		await waitFor(() => {
			expect(screen.getByText("1 EUR = 2 GBP")).toBeInTheDocument();
		});
		const swapButton = screen.getByTestId("swap-currency-button");

		await userEvent.click(swapButton);
		await waitFor(() => {
			expect(screen.getByText("1 GBP = 2 EUR")).toBeInTheDocument();
		});
	});
});
