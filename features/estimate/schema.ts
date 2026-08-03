import { z } from "zod";

const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Inserisci il tuo nome e cognome.")
  .max(80, "Il nome non può superare 80 caratteri.");

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Inserisci il tuo numero di telefono.")
  .max(24, "Controlla il numero di telefono.")
  .regex(/^[+\d][\d\s().-]*$/, "Inserisci un numero di telefono valido.")
  .refine((value) => {
    const digitCount = value.replace(/\D/g, "").length;
    return digitCount >= 7 && digitCount <= 15;
  }, "Inserisci un numero di telefono valido.");

const emailSchema = z
  .string()
  .trim()
  .max(254, "L'indirizzo email è troppo lungo.")
  .refine(
    (value) => value === "" || z.email().safeParse(value).success,
    "Inserisci un indirizzo email valido.",
  );

const serviceSchema = z.string().trim().min(1, "Seleziona il tipo di intervento.");

const detailsSchema = z
  .string()
  .trim()
  .min(10, "Descrivi il lavoro con almeno 10 caratteri.")
  .max(1000, "La descrizione non può superare 1000 caratteri.");

const consentSchema = z.boolean().refine((value) => value, "Conferma che possiamo ricontattarti.");
const honeypotSchema = z.string().max(200).default("");

export const estimateRequestSchema = z.object({
  consent: consentSchema,
  details: detailsSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  phone: phoneSchema,
  service: serviceSchema,
  website: honeypotSchema,
});

export type EstimateRequestInput = z.input<typeof estimateRequestSchema>;
export type EstimateRequestData = z.output<typeof estimateRequestSchema>;
export type EstimateRequestField = keyof EstimateRequestInput;

const ESTIMATE_FIELD_SCHEMAS: Record<EstimateRequestField, z.ZodType> = {
  consent: consentSchema,
  details: detailsSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  phone: phoneSchema,
  service: serviceSchema,
  website: honeypotSchema,
};

export function validateEstimateField(field: EstimateRequestField, value: unknown) {
  const result = ESTIMATE_FIELD_SCHEMAS[field].safeParse(value);
  return result.success || result.error.issues[0]?.message || "Controlla questo campo.";
}
