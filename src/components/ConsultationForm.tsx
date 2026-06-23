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
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/10";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const errorClass = "mt-1 text-xs text-red-500";

function getMinDate() {
  return new Date().toISOString().split("T")[0];
}

export default function ConsultationForm() {
  const t = useTranslations("consultation.form");
  const locale = useLocale() as "en" | "si";
  const [submitted, setSubmitted] = useState(false);

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
        preferredDate: Yup.string()
          .required(t("errors.preferredDateRequired"))
          .matches(/^\d{4}-\d{2}-\d{2}$/, t("errors.preferredDateInvalid")),
        preferredTime: Yup.string().trim().max(30, t("errors.preferredTimeMax")),
        message: Yup.string().trim().max(1000, t("errors.messageMax")),
      }),
    [t],
  );

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    preferredDate: "",
    preferredTime: "",
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
          className="mt-6 text-sm font-medium text-brand-ink hover:underline"
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
            preferredDate: values.preferredDate,
            preferredTime: values.preferredTime.trim() || undefined,
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
      {({ isSubmitting, touched, errors }) => (
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
              <ErrorMessage name="fullName" component="p" className={errorClass} />
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="preferredDate" className={labelClass}>
                {t("preferredDate")} <span className="text-red-500">*</span>
              </label>
              <Field
                id="preferredDate"
                name="preferredDate"
                type="date"
                min={getMinDate()}
                className={cn(
                  inputClass,
                  touched.preferredDate &&
                    errors.preferredDate &&
                    "border-red-400",
                )}
              />
              <ErrorMessage
                name="preferredDate"
                component="p"
                className={errorClass}
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className={labelClass}>
                {t("preferredTime")}
              </label>
              <Field
                as="select"
                id="preferredTime"
                name="preferredTime"
                className={inputClass}
              >
                <option value="">{t("preferredTimePlaceholder")}</option>
                <option value="09:00-11:00">{t("timeSlots.morning")}</option>
                <option value="11:00-13:00">{t("timeSlots.midday")}</option>
                <option value="14:00-16:00">{t("timeSlots.afternoon")}</option>
                <option value="16:00-18:00">{t("timeSlots.evening")}</option>
              </Field>
              <ErrorMessage
                name="preferredTime"
                component="p"
                className={errorClass}
              />
            </div>
          </div>

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
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
      )}
    </Formik>
  );
}
