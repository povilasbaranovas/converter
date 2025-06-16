import { faker } from "@faker-js/faker";
import { DefaultBodyType, HttpResponse, http } from "msw";
import { ApiGetFxRates, createEndpoint } from "../api";
import { CURRENCIES } from "@/constants/currencies";

export const currencyConversionHandlers = [
	http.get<
		ApiGetFxRates["RequestQuery"],
		DefaultBodyType,
		ApiGetFxRates["ResponseBody"]
	>(createEndpoint("fxRates"), () =>
		HttpResponse.json({
			from: faker.helpers.arrayElement(
				Object.values(CURRENCIES).map(({ code }) => code),
			),
			to: faker.helpers.arrayElement(
				Object.values(CURRENCIES).map(({ code }) => code),
			),
			fromAmount: faker.number.int({ min: 1, max: 1000 }),
			rate: faker.number.float({ min: 0.1, max: 10 }),
			toAmount: faker.number.int({ min: 1, max: 1000 }),
		}),
	),
];
