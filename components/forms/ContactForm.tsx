"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { CONTACT_CONTENT, CONTACT_SUBJECT_OPTIONS } from "@/locales/contact";
import {
  contactRequestSchema,
  type ContactRequestData,
  type ContactRequestField,
  type ContactRequestInput,
  submitContact,
  validateContactField,
} from "@/features/contact";

type SubmissionState = "idle" | "success" | "error";
type ContactFormProps = {
  submitContact?: (request: ContactRequestData) => Promise<void>;
};

const DEFAULT_VALUES: ContactRequestInput = {
  consent: false,
  email: "",
  fullName: "",
  message: "",
  subject: "",
  website: "",
};

export function ContactForm({
  submitContact: submitContactRequest = submitContact,
}: ContactFormProps) {
  const { locale } = useLocale();
  const content = CONTACT_CONTENT[locale];
  const subjectOptions = CONTACT_SUBJECT_OPTIONS[locale];
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.modal;
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
    setFocus,
  } = useForm<ContactRequestInput>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    shouldFocusError: true,
  });

  const focusStatus = useCallback((node: HTMLDivElement | null) => node?.focus(), []);

  function registerField(field: ContactRequestField) {
    return register(field, { validate: (value) => validateContactField(field, value) });
  }

  async function handleValid(values: ContactRequestInput) {
    clearErrors();
    const result = contactRequestSchema.safeParse(values);

    if (!result.success) {
      let firstField: ContactRequestField | undefined;
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && field in DEFAULT_VALUES) {
          const fieldName = field as ContactRequestField;
          firstField ??= fieldName;
          setError(fieldName, { message: issue.message, type: "validation" });
        }
      });
      if (firstField) setFocus(firstField);
      return;
    }

    setSubmissionState("idle");
    try {
      await submitContactRequest(result.data);
      reset(DEFAULT_VALUES);
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {submissionState === "success" ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[var(--ds-size-card-wide)] flex-col items-start justify-center rounded-2xl bg-success-surface p-8 tablet:p-10"
          exit={{ opacity: 0, y: "var(--ds-motion-distance-md)" }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: "var(--ds-motion-distance-md)" }}
          key="success"
          ref={focusStatus}
          role="status"
          tabIndex={-1}
          transition={transition}
        >
          <CheckCircle2 aria-hidden="true" className="size-icon-xl text-success" />
          <h3 className="mt-6 font-heading text-2xl font-semibold text-text-primary">
            {content.successTitle}
          </h3>
          <p className="mt-4 max-w-reading text-sm leading-relaxed text-text-secondary">
            {content.successMessage}
          </p>
          <Button
            className="mt-8"
            onClick={() => {
              reset(DEFAULT_VALUES);
              setSubmissionState("idle");
            }}
            variant="secondary"
          >
            {content.newMessageLabel}
          </Button>
        </motion.div>
      ) : (
        <motion.form
          animate={{ opacity: 1, y: 0 }}
          aria-label={content.formLabel}
          className="premium-form-surface rounded-2xl bg-surface p-6 shadow-lg tablet:p-10"
          exit={{ opacity: 0, y: "var(--ds-motion-distance-md)" }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: "var(--ds-motion-distance-md)" }}
          key="form"
          noValidate
          onSubmit={handleSubmit(handleValid, () => setSubmissionState("idle"))}
          transition={transition}
        >
          {submissionState === "error" && (
            <div
              className="mb-8 rounded-xl bg-error-surface p-4 outline-none"
              ref={focusStatus}
              role="alert"
              tabIndex={-1}
            >
              <div className="flex items-start gap-3">
                <AlertCircle aria-hidden="true" className="mt-1 size-icon-md shrink-0 text-error" />
                <div>
                  <h3 className="font-heading text-md font-semibold text-text-primary">
                    {content.errorTitle}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{content.errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          <fieldset disabled={isSubmitting}>
            <legend className="sr-only">{content.formLabel}</legend>
            <div
              aria-hidden="true"
              className="absolute -left-[10000px] top-auto size-px overflow-hidden"
            >
              <label htmlFor="contact-website">Website</label>
              <input
                autoComplete="off"
                id="contact-website"
                tabIndex={-1}
                {...registerField("website")}
              />
            </div>
            <div className="grid gap-6 tablet:grid-cols-2">
              <Input
                autoComplete="name"
                error={errors.fullName?.message}
                label={content.fullNameLabel}
                placeholder={content.fullNamePlaceholder}
                required
                {...registerField("fullName")}
              />
              <Input
                autoComplete="email"
                error={errors.email?.message}
                inputMode="email"
                label={content.emailLabel}
                placeholder={content.emailPlaceholder}
                required
                type="email"
                {...registerField("email")}
              />
            </div>
            <div className="mt-6">
              <Select
                defaultValue=""
                error={errors.subject?.message}
                label={content.subjectLabel}
                options={[...subjectOptions]}
                placeholder={content.subjectPlaceholder}
                required
                {...registerField("subject")}
              />
            </div>
            <div className="mt-6">
              <Textarea
                error={errors.message?.message}
                hint={content.messageHint}
                label={content.messageLabel}
                maxLength={1000}
                placeholder={content.messagePlaceholder}
                required
                {...registerField("message")}
              />
            </div>
            <div className="mt-6 border-t border-divider pt-6">
              <Checkbox
                description={content.consentDescription}
                error={errors.consent?.message}
                label={content.consentLabel}
                required
                {...registerField("consent")}
              />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-text-muted">{content.demoNotice}</p>
            <Button
              className="mt-8 w-full tablet:w-auto"
              isLoading={isSubmitting}
              loadingLabel={content.loadingLabel}
              trailingIcon={<Send aria-hidden="true" className="size-icon-md" />}
              type="submit"
            >
              {submissionState === "error" ? content.retryLabel : content.submitLabel}
            </Button>
          </fieldset>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
