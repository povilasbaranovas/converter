export type Currency = "PLN" | "EUR" | "GBP" | "UAH";

export const CURRENCIES: { code: Currency; flag: string }[] = [
	{ code: "PLN", flag: "🇵🇱" },
	{ code: "EUR", flag: "🇪🇺" },
	{ code: "GBP", flag: "🇬🇧" },
	{ code: "UAH", flag: "🇺🇦" },
];
