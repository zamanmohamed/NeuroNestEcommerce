"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Calendar, Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { submitConsultation } from "@/lib/api";
import { cn } from "@/lib/utils";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
};

const inputClass =
  "w-full cursor-text rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/10";

const labelClass =
  "mb-1.5 block cursor-pointer text-sm font-medium text-slate-700";

const errorClass = "mt-1 text-xs text-red-500";

function getTouchedFromErrors(
  errors: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(errors).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        acc[key] = getTouchedFromErrors(value as Record<string, unknown>);
      } else {
        acc[key] = true;
      }
      return acc;
    },
    {},
  );
}

export default function ConsultationForm() {
  const t = useTranslations("consultation.form");
  const locale = useLocale() as "en" | "si";
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        fullName: Yup.string()
          .trim()
          .min(2, t("errors.fullNameMin"))
          .max(100, t("errors.fullNameMax"))
          .required(t("errors.fullNameRequired")),
        email: Yup.string()
          .trim()
          .email(t("errors.emailInvalid"))
          .max(150, t("errors.emailMax"))
          .required(t("errors.emailRequired")),
        phone: Yup.string()
          .trim()
          .matches(/^[0-9+\-\s()]+$/, t("errors.phoneInvalid"))
          .min(7, t("errors.phoneMin"))
          .max(20, t("errors.phoneMax"))
          .required(t("errors.phoneRequired")),
        businessName: Yup.string().trim().max(150, t("errors.businessNameMax")),
        message: Yup.string().trim().max(1000, t("errors.messageMax")),
      }),
    [t],
  );

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-ink/15 bg-brand-ink/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-white">
          <Calendar className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-brand-navy">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{t("successMessage")}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 cursor-pointer text-sm font-medium text-brand-ink hover:underline"
        >
          {t("bookAnother")}
        </button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          await submitConsultation({
            fullName: values.fullName.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            businessName: values.businessName.trim() || undefined,
            message: values.message.trim() || undefined,
            locale,
          });
          toast.success(t("successToast"));
          resetForm();
          setSubmitted(true);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : t("errors.submitFailed");
          toast.error(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        isSubmitting,
        touched,
        errors,
        validateForm,
        setTouched,
        submitForm,
      }) => (
        <>
          <Form className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  {t("fullName")} <span className="text-red-500">*</span>
                </label>
                <Field
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={cn(
                    inputClass,
                    touched.fullName && errors.fullName && "border-red-400",
                  )}
                  placeholder={t("fullNamePlaceholder")}
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className={errorClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  {t("email")} <span className="text-red-500">*</span>
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={cn(
                    inputClass,
                    touched.email && errors.email && "border-red-400",
                  )}
                  placeholder={t("emailPlaceholder")}
                />
                <ErrorMessage name="email" component="p" className={errorClass} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={labelClass}>
                  {t("phone")} <span className="text-red-500">*</span>
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  className={cn(
                    inputClass,
                    touched.phone && errors.phone && "border-red-400",
                  )}
                  placeholder={t("phonePlaceholder")}
                />
                <ErrorMessage name="phone" component="p" className={errorClass} />
              </div>

              <div>
                <label htmlFor="businessName" className={labelClass}>
                  {t("businessName")}
                </label>
                <Field
                  id="businessName"
                  name="businessName"
                  type="text"
                  className={inputClass}
                  placeholder={t("businessNamePlaceholder")}
                />
                <ErrorMessage
                  name="businessName"
                  component="p"
                  className={errorClass}
                />
              </div>
            </div>

            <p className="cursor-default rounded-xl border border-brand-ink/10 bg-brand-ink/5 px-4 py-3 text-sm text-slate-600">
              {t("contactNotice")}
            </p>

            <div>
              <label htmlFor="message" className={labelClass}>
                {t("message")}
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={4}
                className={cn(
                  inputClass,
                  "resize-none",
                  touched.message && errors.message && "border-red-400",
                )}
                placeholder={t("messagePlaceholder")}
              />
              <ErrorMessage name="message" component="p" className={errorClass} />
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={async () => {
                const formErrors = await validateForm();
                if (Object.keys(formErrors).length > 0) {
                  setTouched(getTouchedFromErrors(formErrors));
                  return;
                }
                setShowConfirm(true);
              }}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-ink px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t("submit")}
                </>
              )}
            </button>
          </Form>

          {showConfirm ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setShowConfirm(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="consultation-confirm-title"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
              >
                <h3
                  id="consultation-confirm-title"
                  className="text-lg font-semibold text-brand-navy"
                >
                  {t("confirmTitle")}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {t("confirmMessage")}
                </p>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="cursor-pointer rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    {t("confirmNo")}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setShowConfirm(false);
                      void submitForm();
                    }}
                    className="cursor-pointer rounded-full bg-brand-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {t("confirmYes")}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </Formik>
  );
}
