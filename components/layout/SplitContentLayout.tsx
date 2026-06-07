"use client";

import { useState } from "react";
import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type ResourceLink = {
  label: string;
  href?: string;
  disabled?: boolean;
};

type SidebarTile = {
  label: string;
  imageSrc: string;
  href?: string;
};

type SplitContentLayoutProps = {
  breadcrumbs: Crumb[];
  imageSrc?: string;
  title: string;
  description: string;
  links?: ResourceLink[];
  tiles?: SidebarTile[];
  children: React.ReactNode;
};

export function SplitContentLayout({
  breadcrumbs,
  imageSrc,
  title,
  description,
  links = [],
  tiles = [],
  children,
}: SplitContentLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* mobile drawer toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed left-0 top-8 z-50 border border-[#c49aae]/40 bg-neutral-950/80 px-3 py-2 text-[#c49aae] backdrop-blur-md lg:hidden"
      >
        {open ? "←" : "→"}
      </button>

      {/* mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/* sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-[82vw] max-w-sm bg-neutral-950/95 px-6 py-20 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-1/3 lg:max-w-none lg:translate-x-0 lg:bg-transparent lg:px-12
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarCard
          breadcrumbs={breadcrumbs}
          imageSrc={imageSrc}
          title={title}
          description={description}
          links={links}
          tiles={tiles}
        />
      </aside>

      {/* content */}
      <section className="overflow-y-auto px-8 pt-20 pb-20 lg:fixed lg:left-1/3 lg:top-0 lg:h-screen lg:w-2/3 lg:px-16 lg:pt-28">
        <article className="max-w-3xl text-sm leading-8 text-neutral-300">
          {children}
        </article>
      </section>
    </main>
  );
}

function SidebarCard({
  breadcrumbs,
  imageSrc,
  title,
  description,
  links,
  tiles,
}: {
  breadcrumbs: Crumb[];
  imageSrc?: string;
  title: string;
  description: string;
  links: ResourceLink[];
  tiles: SidebarTile[];
}) {
  return (
    <div className="mx-auto mt-6 max-w-sm border border-[#c49aae]/40 bg-black/20 p-5 backdrop-blur-md lg:mt-24">
      {/* breadcrumbs */}
      <nav className="mb-5 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.label}>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-[#c49aae]"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[#c49aae]">{crumb.label}</span>
            )}

            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-neutral-700">/</span>
            )}
          </span>
        ))}
      </nav>

      {/* image */}
      {imageSrc && (
        <div className="mb-6 aspect-[4/3] border border-white/10 bg-neutral-900">
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
        </div>
      )}

      {/* title */}
      <h1 className="text-2xl uppercase tracking-[0.16em] text-neutral-100">
        {title}
      </h1>

      {/* description */}
      <p className="mt-5 text-sm leading-7 text-neutral-400">{description}</p>

      {/* text buttons / project resources */}
      {links.length > 0 && (
        <div className="mt-7 grid grid-cols-2 gap-2 border-t border-white/10 pt-5">
          {links.map((link) =>
            link.href && !link.disabled ? (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("/") ? "_self" : "_blank"}
                className="border border-[#c49aae]/40 px-3 py-2 text-center text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:border-[#c49aae] hover:bg-[#c49aae] hover:text-neutral-950"
              >
                {link.label}
              </a>
            ) : (
              <span
                key={link.label}
                className="border border-white/10 px-3 py-2 text-center text-[10px] uppercase tracking-[0.22em] text-neutral-600"
              >
                {link.label}
              </span>
            )
          )}
        </div>
      )}

      {/* image tile collage / fun links */}
      {tiles.length > 0 && (
        <div className="mt-7 grid grid-cols-3 gap-1 border-t border-white/10 pt-5">
          {tiles.map((tile) => {
            const tileContent = (
              <div className="group relative aspect-square overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={tile.imageSrc}
                  alt=""
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/65" />

                <div className="absolute inset-0 flex items-center justify-center px-2 text-center opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="font-serif text-[10px] italic uppercase tracking-[0.16em] text-[#c49aae]">
                    {tile.label}
                  </span>
                </div>
              </div>
            );

            return tile.href ? (
              <a
                key={tile.label}
                href={tile.href}
                target={tile.href.startsWith("/") ? "_self" : "_blank"}
                className="block"
              >
                {tileContent}
              </a>
            ) : (
              <div key={tile.label} className="cursor-default">
                {tileContent}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}