import { render, screen } from "@testing-library/react";
import { CurrencySelectFooter } from "../CurrencySelectFooter";
import { describe, it, expect } from "vitest";

const renderFooter = (children: React.ReactNode) =>
	render(<CurrencySelectFooter>{children}</CurrencySelectFooter>);

describe("CurrencySelectFooter", () => {
	it("renders children content", () => {
		renderFooter("Test Rate Info");
		expect(screen.getByText("Test Rate Info")).toBeInTheDocument();
	});

	it("renders the info text", () => {
		renderFooter("Info");
		expect(
			screen.getByText(
				"All figures are live mid-market rates, which are for informational purposes only.",
				{ exact: false },
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"To see the rates for money transfer, please select sending money option.",
				{ exact: false },
			),
		).toBeInTheDocument();
	});
});
