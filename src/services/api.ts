// Ideally api client and endpoints should be exposed as a package

import { Currency } from "@/constants/currencies";

const API_BASE_URL = "https://my.transfergo.com/api";

const ENDPOINTS = {
	fxRates: "/fx-rates",
};

export const createEndpoint = (endpoint: keyof typeof ENDPOINTS) => {
	return `${API_BASE_URL}${ENDPOINTS[endpoint]}`;
};

export interface ApiGetFxRates {
	RequestQuery: {
		from: Currency;
		to: Currency;
		amount: string;
	};
	RequestBody: never;
	ResponseBody: {
		from: Currency;
		fromAmount: number;
		rate: number;
		to: Currency;
		toAmount: number;
	};
}

export interface Api {
	getFxRates: (
		params: ApiGetFxRates["RequestQuery"],
	) => Promise<ApiGetFxRates["ResponseBody"]>;
}

export const API: Api = {
	getFxRates: async ({ amount, from, to }) => {
		const url = new URL(createEndpoint("fxRates"));
		url.searchParams.set("from", from);
		url.searchParams.set("to", to);
		url.searchParams.set("amount", amount);

		const res = await fetch(url.toString());
		const data = await res.json();
		return data;
	},
};
