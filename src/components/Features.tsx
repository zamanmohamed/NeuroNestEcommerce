import { useTranslations } from "next-intl";
import {
  Bell,
  CreditCard,
  Layers,
  LayoutDashboard,
  Search,
  Server,
} from "lucide-react";

const featureKeys = [
  { key: "subscription", icon: Layers },
  { key: "payments", icon: CreditCard },
  { key: "admin", icon: LayoutDashboard },
  { key: "notifications", icon: Bell },
  { key: "seo", icon: Search },
  { key: "scalable", icon: Server },
] as const;

export default function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="card-glow group rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/30"
            >
              <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-brand-blue/10 via-brand-purple/10 to-brand-pink/10 p-3">
                <Icon className="h-6 w-6 text-brand-purple" />
              </div>
              <h3 className="text-lg font-semibold text-brand-navy">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
