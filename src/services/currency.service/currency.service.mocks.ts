import { faker } from "@faker-js/faker";
import { DefaultBodyType, HttpResponse, http } from "msw";
import { ApiGetFxRates, createEndpoint } from "../api";
import { CURRENCIES } from "@/constants/currencies";

export const currencyConversionHandlers = [
	http.get<
		ApiGetFxRates["RequestQuery"],
		DefaultBodyType,
		ApiGetFxRates["ResponseBody"]
	>(createEndpoint("fxRates"), ({ params: { amount } }) => {
		const rate = 2;

		return HttpResponse.json({
			from: faker.helpers.arrayElement(
				Object.values(CURRENCIES).map(({ code }) => code),
			),
			to: faker.helpers.arrayElement(
				Object.values(CURRENCIES).map(({ code }) => code),
			),
			fromAmount: Number(amount),
			toAmount: Number(amount) * rate,
			rate,
		});
	}),
];
