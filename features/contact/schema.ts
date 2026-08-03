import { z } from "zod";

const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Inserisci il tuo nome e cognome.")
  .max(80, "Il nome non può superare 80 caratteri.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Inserisci il tuo indirizzo email.")
  .max(254, "L'indirizzo email è troppo lungo.")
  .refine((value) => z.email().safeParse(value).success, "Inserisci un indirizzo email valido.");

const subjectSchema = z.string().trim().min(1, "Seleziona l'argomento del messaggio.");

const messageSchema = z
  .string()
  .trim()
  .min(10, "Scrivi un messaggio di almeno 10 caratteri.")
  .max(1000, "Il messaggio non può superare 1000 caratteri.");

const consentSchema = z.boolean().refine((value) => value, "Conferma che possiamo ricontattarti.");
const honeypotSchema = z.string().max(200).default("");

export const contactRequestSchema = z.object({
  consent: consentSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  message: messageSchema,
  subject: subjectSchema,
  website: honeypotSchema,
});

export type ContactRequestInput = z.input<typeof contactRequestSchema>;
export type ContactRequestData = z.output<typeof contactRequestSchema>;
export type ContactRequestField = keyof ContactRequestInput;

const CONTACT_FIELD_SCHEMAS: Record<ContactRequestField, z.ZodType> = {
  consent: consentSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  message: messageSchema,
  subject: subjectSchema,
  website: honeypotSchema,
};

export function validateContactField(field: ContactRequestField, value: unknown) {
  const result = CONTACT_FIELD_SCHEMAS[field].safeParse(value);
  return result.success || result.error.issues[0]?.message || "Controlla questo campo.";
}
