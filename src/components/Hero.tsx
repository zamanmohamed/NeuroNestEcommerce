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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-1.5 text-sm font-medium text-brand-purple">
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-brand-purple/40 hover:text-brand-purple"
              >
                {t("ctaSecondary")}
              </a>
            </div>

            <p className="mt-10 text-sm font-medium tracking-wide gradient-text">
              {t("tagline")}
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-brand-purple/20 to-brand-pink/20 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
              <Image
                src="/logo.png"
                alt="neuronest eCommerce logo"
                width={400}
                height={400}
                className="mx-auto w-full max-w-sm"
                priority
              />
              <p className="mt-6 text-center text-lg font-semibold tracking-widest text-brand-navy uppercase">
                eCommerce
              </p>
              <p className="mt-2 text-center text-sm text-slate-500">
                {t("tagline")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
