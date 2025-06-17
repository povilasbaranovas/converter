import { useCurrencyConversion } from "@/services/currency.service/currency.service";

import { useEffect } from "react";
import { convertCurrencyValues } from "./converter.utils";
import { DEFAULT_CURRENCY_VALUES } from "./converter.constants";
import { CurrencyFormFields } from "./converter.types";
import { useForm } from "react-hook-form";

export const useCurrencyConversionForm = () => {
	const formMethods = useForm<CurrencyFormFields>({
		mode: "onTouched",
		defaultValues: DEFAULT_CURRENCY_VALUES,
	});

	const {
		watch,
		setValue,
		formState: { isSubmitted, isValid, isValidating, errors },
	} = formMethods;
	console.log(errors, isValid);
	const {
		amount,
		from,
		to,
		leftSelectName,
		rightSelectName,
		fieldToUpdate,
		isCurrencySwapped,
	} = convertCurrencyValues(watch());

	const query = useCurrencyConversion({
		deps: [fieldToUpdate, isCurrencySwapped],
		values: {
			amount,
			from,
			to,
		},
		enabled: isSubmitted && isValid && !isValidating,
	});

	useEffect(() => {
		const amount = query.data?.toAmount?.toString();

		if (!query.isFetching && amount && !isValidating) {
			setValue(fieldToUpdate, amount, {
				shouldDirty: true,
				shouldValidate: true,
			});
		}
	}, [
		query.data?.toAmount,
		query.isFetching,
		isValidating,
		fieldToUpdate,
		setValue,
	]);

	return {
		query,
		form: {
			formMethods,
			values: {
				from,
				to,
				leftSelectName,
				rightSelectName,
				amount,
				fieldToUpdate,
				isCurrencySwapped,
			},
		},
	};
};
