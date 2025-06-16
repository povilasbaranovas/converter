import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const Wrapper = ({ children }: React.PropsWithChildren) => {
	const methods = useForm();
	return (
		<QueryClientProvider client={client}>
			<FormProvider {...methods}>{children}</FormProvider>
		</QueryClientProvider>
	);
};

export const renderWrapped = (
	ui: React.ReactElement,
	options?: RenderOptions,
) => {
	return {
		...render(ui, {
			wrapper: Wrapper,
			...options,
		}),
	};
};
