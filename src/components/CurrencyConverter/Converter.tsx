"use client";
import { ArrowRightLeft, LoaderCircle } from "lucide-react";
import Button from "../Button";

import { FormProvider } from "react-hook-form";
import { CurrencySelect } from "./components/CurrencySelect";

import { cn } from "@/utils/cn";
import { CurrencyInput } from "./components/CurrencyInput";
import { CurrencySelectFooter } from "./components/CurrencySelectFooter";
import { useCurrencyConversionForm } from "./converter.hooks";

export function Converter() {
	const {
		form: {
			formMethods,
			values: {
				leftSelectName,
				rightSelectName,
				from,
				to,
				isCurrencySwapped,
				fieldToUpdate,
			},
		},
		query: { isLoading, data },
	} = useCurrencyConversionForm();

	const {
		setValue,
		resetField,
		handleSubmit,
		formState: { isSubmitted, isValid },
	} = formMethods;

	const shouldUpdateConvertedAmount = fieldToUpdate === "convertedAmount";

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={handleSubmit(() => null)}
				className="mx-auto bg-background shadow-xl p-8 flex flex-col gap-8"
				data-testid="converter-form"
			>
				<div className="flex items-center gap-3">
					<CurrencySelect name={leftSelectName} label="FROM:" />
					<Button
						className="text-secondary self-end mb-1"
						type="button"
						variant="invisible"
						data-testid="swap-currency-button"
						onClick={() => {
							resetField("amount");
							resetField("convertedAmount");
							setValue("fieldToUpdate", "convertedAmount");
							setValue("isCurrencySwapped", !isCurrencySwapped);
						}}
					>
						<ArrowRightLeft className="text-secondary w-6 h-6" />
					</Button>
					<CurrencySelect name={rightSelectName} label="TO:" />
				</div>
				<div className="flex items-end gap-4">
					<CurrencyInput
						name="amount"
						currency={shouldUpdateConvertedAmount ? from : to}
						wrapperProps={{
							className: cn(!isSubmitted && "w-full"),
							label: "AMOUNT:",
						}}
						onChange={() => {
							setValue("fieldToUpdate", "convertedAmount");
						}}
					/>

					{isSubmitted ? (
						<>
							<div aria-hidden className="w-6 h-6" />
							<CurrencyInput
								name="convertedAmount"
								currency={
									shouldUpdateConvertedAmount ? to : from
								}
								wrapperProps={{ label: "CONVERTED TO:" }}
								onChange={() => {
									setValue("fieldToUpdate", "amount");
								}}
							/>
						</>
					) : null}
				</div>

				{data ? (
					<CurrencySelectFooter>
						<div>
							{`1 ${from} = ${
								isLoading ? (
									<LoaderCircle className="animate-spin w-4 h-4 text-text-secondary" />
								) : (
									`${data?.rate ?? "-"} ${to}`
								)
							}`}
						</div>
					</CurrencySelectFooter>
				) : (
					<Button type="submit" disabled={!isValid}>
						{isLoading ? "Converting..." : "Convert"}
					</Button>
				)}
			</form>
		</FormProvider>
	);
}
