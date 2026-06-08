import Link from "next/link";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {bookBySlugQuery} from "@/sanity/lib/queries";
import {PortableTextRenderer} from "@/components/sanity/PortableTextRenderer";

type PageProps = {
  params: Promise<{year: string; slug: string}>;
};

function RatingStars({ rating = 0 }: { rating?: number }) {
    return (
      <div className="text-sm tracking-[0.2em] text-[#c49aae]">
        {"★".repeat(Math.floor(rating))}
        {rating % 1 ? "½" : ""}
        <span className="text-neutral-700">
          {"★".repeat(5 - Math.ceil(rating))}
        </span>
      </div>
    );
}
export default async function BookDetailPage({params}: PageProps) {
  const {year, slug} = await params;
  const book = await client.fetch(bookBySlugQuery, {slug}, {next: {revalidate: 0}});

  if (!book) notFound();

  return (
    <main className="min-h-screen bg-neutral-950 px-8 pt-24 pb-16 text-neutral-100">
      <nav className="fixed left-8 top-8 z-20 bg-neutral-950/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500 backdrop-blur-sm">
        <Link href="/" className="hover:text-[#c49aae]">Victoria Sun</Link>
        <span className="mx-2 text-neutral-700">/</span>
        <Link href="/fun" className="hover:text-[#c49aae]">For Fun</Link>
        <span className="mx-2 text-neutral-700">/</span>
        <Link href={`/fun/books/${year}`} className="hover:text-[#c49aae]">Books {year}</Link>
        <span className="mx-2 text-neutral-700">/</span>
        <span className="font-serif italic text-[#c49aae]">{book.title}</span>
      </nav>

      <article className="mx-auto max-w-5xl">
        {/* book header card */}
        <header className="border-y border-white/10 py-8">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#c49aae]">
            {new Date(book.finishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })}
            </p>

            <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-xl uppercase tracking-[0.12em] text-neutral-100">
                {book.title}
            </h1>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
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