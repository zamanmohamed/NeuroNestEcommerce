import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const planKeys = ["starter", "growth", "business"] as const;

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {planKeys.map((plan, index) => {
            const isPopular = index === 1;
            const features = t.raw(`plans.${plan}.features`) as string[];

            return (
              <div
                key={plan}
                className={cn(
                  "relative rounded-2xl border bg-white p-8 transition-all duration-300",
                  isPopular
                    ? "border-brand-purple shadow-xl shadow-brand-purple/10 scale-[1.02]"
                    : "border-slate-200 hover:border-brand-purple/30 hover:shadow-lg"
                )}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink px-4 py-1 text-xs font-semibold text-white">
                    {t("popular")}
                  </span>
                )}

                <h3 className="text-xl font-semibold text-brand-navy">
                  {t(`plans.${plan}.name`)}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {t(`plans.${plan}.description`)}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-brand-navy">
                    {t("currency")} {t(`plans.${plan}.price`)}
                  </span>
                  <span className="text-sm text-slate-500">{t("monthly")}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    "mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-transform hover:scale-105",
                    isPopular
                      ? "bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink text-white shadow-md"
                      : "border border-slate-300 text-slate-700 hover:border-brand-purple hover:text-brand-purple"
                  )}
                >
                  {t("cta")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
