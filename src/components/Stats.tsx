import { useTranslations } from "next-intl";

const statKeys = ["stores", "uptime", "languages", "stack"] as const;

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="border-y border-slate-200 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-purple py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statKeys.map((key) => (
            <div key={key} className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl">
                {t(key)}
              </p>
              <p className="mt-1 text-sm font-medium text-white/70">
                {t(`${key}Label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
