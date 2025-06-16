import { currencyConversionHandlers } from "@/services/currency.service/currency.service.mocks";
import { setupServer } from "msw/node";

export const mswServer = setupServer(...currencyConversionHandlers);
