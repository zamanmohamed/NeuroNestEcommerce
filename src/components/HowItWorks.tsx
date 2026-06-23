import { useTranslations } from "next-intl";

const stepKeys = ["create", "catalog", "sell"] as const;

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div
            className="absolute top-12 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-brand-ink/40 to-transparent md:block"
            aria-hidden
          />

          {stepKeys.map((key, index) => (
            <div key={key} className="relative text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-xl font-bold text-white shadow-lg ring-4 ring-white">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-brand-navy">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {t(`steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
