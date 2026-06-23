import { useTranslations } from "next-intl";
import { CalendarCheck } from "lucide-react";
import ConsultationForm from "./ConsultationForm";

export default function Consultation() {
  const t = useTranslations("consultation");

  return (
    <section id="consultation" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-ink/15 bg-brand-ink/5 px-4 py-1.5 text-sm font-medium text-brand-ink">
              <CalendarCheck className="h-4 w-4" />
              {t("badge")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {t("subtitle")}
            </p>
            <ul className="mt-8 space-y-4">
              {(["step1", "step2", "step3"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-ink text-xs font-bold text-white">
                    {key === "step1" ? "1" : key === "step2" ? "2" : "3"}
                  </span>
                  <span className="text-sm text-slate-600">{t(`steps.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-brand-navy">
              {t("formTitle")}
            </h3>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
