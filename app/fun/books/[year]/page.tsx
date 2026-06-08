import Link from "next/link";
import {client} from "@/sanity/lib/client";
import {booksByYearQuery} from "@/sanity/lib/queries";

type Book = {
  title: string;
  slug: string;
  author?: string;
  finishDate: string;
  rating?: number;
  country?: string;
  era?: string;
  genre?: string;
  hasBody?: boolean;
};

type PageProps = {
  params: Promise<{year: string}>;
};

function RatingStars({rating = 0}: {rating?: number}) {
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

export default async function BooksYearPage({params}: PageProps) {
  const {year} = await params;
  const numericYear = Number(year);

  const books = await client.fetch<Book[]>(
    booksByYearQuery,
    {
      start: `${year}-01-01`,
      end: `${numericYear + 1}-01-01`,
    },
    {next: {revalidate: 0}}
  );

  const currentYear = new Date().getFullYear();
  const previousYear = numericYear - 1;
  const nextYear = numericYear < currentYear ? numericYear + 1 : null;

  return (
    <main className="min-h-screen bg-neutral-950 px-8 pt-24 pb-16 text-neutral-100">
      <nav className="fixed left-8 top-8 z-20 bg-neutral-950/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500 backdrop-blur-sm">
        <Link href="/" className="hover:text-[#c49aae]">Victoria Sun</Link>
        <span className="mx-2 text-neutral-700">/</span>
        <Link href="/fun" className="hover:text-[#c49aae]">For Fun</Link>
        <span className="mx-2 text-neutral-700">/</span>
        <span className="font-serif italic text-[#c49aae]">Books {year}</span>
      </nav>

      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl uppercase tracking-[0.16em] text-neutral-100">
          Books / {year}
        </h1>

        <div className="mt-16">
          {books.map((book) => (
            <article key={book.slug} className="border-b border-white/10 py-8">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#c49aae]">
                {new Date(book.finishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-xl uppercase tracking-[0.12em] text-neutral-100">
                  {book.title}
                </h2>

                <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                  {book.author && <span>{book.author}</span>}
                  {book.era && <span>{book.era}</span>}
                  {book.genre && <span>{book.genre}</span>}
                </div>
              </div>

              <div className="mt-4">
                <RatingStars rating={book.rating} />
              </div>

              {book.hasBody && (
                <div className="mt-5 flex justify-end">
                  <Link
                    href={`/fun/books/${year}/${book.slug}`}
                    className="text-[10px] uppercase tracking-[0.32em] text-neutral-500 transition-colors hover:text-[#c49aae]"
                  >
                    See More →
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-between text-[10px] uppercase tracking-[0.32em] text-neutral-500">
          <Link href={`/fun/books/${previousYear}`} className="hover:text-[#c49aae]">
            ← {previousYear}
          </Link>

          {nextYear && (
            <Link href={`/fun/books/${nextYear}`} className="hover:text-[#c49aae]">
              {nextYear} →
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}