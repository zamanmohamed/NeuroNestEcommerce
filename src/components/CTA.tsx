import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-purple to-brand-pink px-8 py-16 text-center sm:px-16">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(0,212,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,107,53,0.3) 0%, transparent 50%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {t("subtitle")}
            </p>
            <a
              href="#pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-purple shadow-lg transition-transform hover:scale-105"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-white/60">{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
