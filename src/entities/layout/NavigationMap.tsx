import Link from 'next/link';

import { NAV_LINKS } from '@features/layout/model';

const NavigationMap = () => {
  const links = NAV_LINKS.filter((link) => link.href !== '/');

  return (
    <section className="border-border bg-background-secondary/60 rounded-2xl border p-6">
      <h2 className="text-foreground text-lg font-semibold">
        Explore NextTalk
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-border bg-background hover:bg-background-secondary group rounded-xl border p-4 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-foreground text-base font-semibold">
                  {item.label}
                </h3>
                <p className="text-foreground/70 text-sm">{item.description}</p>
              </div>

              <span className="bg-primary text-primary-foreground group-hover:bg-primary/90 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold shadow-sm transition">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NavigationMap;
