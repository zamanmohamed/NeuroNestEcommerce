import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="hero-glow neural-grid absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-ink/15 bg-brand-ink/5 px-4 py-1.5 text-sm font-medium text-brand-ink">
              <Sparkles className="h-4 w-4" />
              {t("badge")}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
              {t("title")}
              <br />
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 mx-auto">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-blue"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-brand-ink hover:text-brand-ink"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-ink/10 via-slate-400/10 to-brand-ink/10 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-12">
              <Image
                src="/logo.png"
                alt="NeuroNest eCommerce logo"
                width={500}
                height={140}
                className="mx-auto w-full max-w-md"
                priority
              />
              <p className="mt-8 text-center text-base font-semibold uppercase tracking-[0.2em] gradient-text sm:text-lg">
                {t("tagline")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
