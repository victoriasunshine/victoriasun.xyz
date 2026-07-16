import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { creativeProjectsQuery } from "@/sanity/lib/queries";

type CreativeProject = {
  title: string;
  slug: string;
  description?: string;
  coverImageUrl?: string;
};

export default async function CreativePage() {
  const projects = await client.fetch<CreativeProject[]>(creativeProjectsQuery);

  return (
    <main className="min-h-screen px-8 pt-24 pb-12">
      {/* breadcrumbs */}
      <nav className="fixed left-8 top-8 z-20 bg-cream/80 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-ink-light backdrop-blur-sm">
        <Link href="/" className="transition-colors hover:text-dust-blue">
          Victoria Sun
        </Link>

        <span className="mx-2 text-ink-faint">/</span>

        <Link href="/fun" className="transition-colors hover:text-dust-blue">
          For Fun
        </Link>

        <span className="mx-2 text-ink-faint">/</span>

        <span className="font-serif italic text-dust-blue">Creative</span>
      </nav>

      {/* empty state */}
      {projects.length === 0 && (
        <div className="mt-24 text-sm leading-8 text-ink-light">
          No creative projects yet.
        </div>
      )}

      {/* masonry collage */}
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 2xl:columns-5">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/fun/creative/${project.slug}`}
            className="group relative mb-3 block break-inside-avoid overflow-hidden border border-ink-faint/30 bg-cream-dark"
          >
            {project.coverImageUrl ? (
              <img
                src={project.coverImageUrl}
                alt={project.title}
                className="w-full transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-square w-full bg-cream-dark" />
            )}

            {/* dark overlay on hover so title text stays readable over photos */}
            <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/65" />

            <div className="absolute inset-0 flex items-center justify-center px-4 text-center opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="font-serif text-sm italic uppercase tracking-[0.18em] text-cream">
                {project.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
