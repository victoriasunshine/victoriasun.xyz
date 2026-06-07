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
    <main className="min-h-screen bg-neutral-950 px-8 pt-24 pb-12 text-neutral-100">
      {/* breadcrumbs */}
      <nav className="fixed left-8 top-8 z-20 bg-neutral-950/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500 backdrop-blur-sm">
        <Link href="/" className="transition-colors hover:text-[#c49aae]">
          Victoria Sun
        </Link>

        <span className="mx-2 text-neutral-700">/</span>

        <Link href="/fun" className="transition-colors hover:text-[#c49aae]">
          For Fun
        </Link>

        <span className="mx-2 text-neutral-700">/</span>

        <span className="font-serif italic text-[#c49aae]">Creative</span>
      </nav>

      {/* empty state */}
      {projects.length === 0 && (
        <div className="mt-24 text-sm leading-8 text-neutral-500">
          No creative projects yet.
        </div>
      )}

      {/* masonry collage */}
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 2xl:columns-5">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/fun/creative/${project.slug}`}
            className="group relative mb-3 block break-inside-avoid overflow-hidden border border-white/10 bg-neutral-900"
          >
            {project.coverImageUrl ? (
              <img
                src={project.coverImageUrl}
                alt={project.title}
                className="w-full transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-square w-full bg-neutral-900" />
            )}

            <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/65" />

            <div className="absolute inset-0 flex items-center justify-center px-4 text-center opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="font-serif text-sm italic uppercase tracking-[0.18em] text-[#c49aae]">
                {project.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}