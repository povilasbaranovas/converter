import { Input } from "@/components/Inputs/Input";
import { Currency } from "@/constants/currencies";
import { useFormContext } from "react-hook-form";
import { CurrencyFormFields } from "../converter.types";

import { InputWrapperProps } from "@/components/Inputs/InputWrapper";
import { CURRENCY_LIMITS } from "@/constants/limits";

type CurrencyInputProps = {
	name: keyof CurrencyFormFields;
	currency: Currency;
	wrapperProps: Omit<InputWrapperProps, "children">;
	onChange?: (value: string) => void;
};

export const CurrencyInput = ({
	name,
	currency,
	wrapperProps,
	onChange,
}: CurrencyInputProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<CurrencyFormFields>();

	const fieldToUpdate = watch("fieldToUpdate");

	return (
		<Input
			error={errors[name]?.message}
			type="number"
			wrapperProps={wrapperProps}
			placeholder={currency}
			{...register(name, {
				onChange,
				required: "Required",
				validate: (value) => {
					if (typeof value !== "string" || fieldToUpdate === name) {
						return undefined;
					}
					const parsedValue = parseFloat(value);

					if (parsedValue < 1) {
						return `Amount cannot be less than 1 ${currency}`;
					}
					if (parsedValue > CURRENCY_LIMITS[currency]) {
						return `Amount cannot exceed ${CURRENCY_LIMITS[currency]} ${currency}`;
					}
				},
			})}
		/>
	);
};
