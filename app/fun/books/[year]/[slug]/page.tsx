import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { bookBySlugQuery } from "@/sanity/lib/queries";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";

type PageProps = {
  params: Promise<{ year: string; slug: string }>;
};

function RatingStars({ rating = 0 }: { rating?: number }) {
  return (
    <div className="text-sm tracking-[0.2em] text-dust-blue">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 ? "½" : ""}
      <span className="text-ink-faint">
        {"★".repeat(5 - Math.ceil(rating))}
      </span>
    </div>
  );
}

export default async function BookDetailPage({ params }: PageProps) {
  const { year, slug } = await params;
  const book = await client.fetch(bookBySlugQuery, { slug }, { next: { revalidate: 0 } });

  if (!book) notFound();

  return (
    <main className="min-h-screen px-8 pt-24 pb-16">
      <nav className="fixed left-8 top-8 z-20 bg-cream/80 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-ink-light backdrop-blur-sm">
        <Link href="/" className="hover:text-dust-blue">Victoria Sun</Link>
        <span className="mx-2 text-ink-faint">/</span>
        <Link href="/fun" className="hover:text-dust-blue">For Fun</Link>
        <span className="mx-2 text-ink-faint">/</span>
        <Link href={`/fun/books/${year}`} className="hover:text-dust-blue">Books {year}</Link>
        <span className="mx-2 text-ink-faint">/</span>
        <span className="font-serif italic text-dust-blue">{book.title}</span>
      </nav>

      <article className="mx-auto max-w-5xl">
        {/* book header card */}
        <header className="border-y border-ink-faint/30 py-8">
          <p className="text-[10px] uppercase tracking-[0.32em] text-dust-blue">
            {new Date(book.finishDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-xl uppercase tracking-[0.12em] text-ink">
              {book.title}
            </h1>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.18em] text-ink-light">
              {book.author && <span>{book.author}</span>}
              {book.era && <span>{book.era}</span>}
              {book.genre && <span>{book.genre}</span>}
            </div>
          </div>

          <div className="mt-4">
            <RatingStars rating={book.rating} />
          </div>
        </header>

        {/* review/body */}
        <section className="mx-auto mt-14 max-w-3xl">
          {book.body && <PortableTextRenderer value={book.body} />}
        </section>
      </article>
    </main>
  );
}
