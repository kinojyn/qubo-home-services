import quotesConfig from "@/data/quotes-config.json";
import { QuotesData } from "@/types/quotes";

// The public quote wizard and the admin fallback intentionally share one source of truth.
export const DEFAULT_QUOTES_DATA = quotesConfig as QuotesData;
