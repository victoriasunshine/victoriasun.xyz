/*import Link from "next/link";
import { SplitContentLayout } from "@/components/layout/SplitContentLayout";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery } from "@/sanity/lib/queries";

type BlogPostPreview = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
};

const POSTS_PER_PAGE = 10;
const currentPage = 1;

export default async function FunPage() {
  const posts = await client.fetch<BlogPostPreview[]>(
    blogPostsQuery,
    {},
    { next: { revalidate: 0 } }
  );

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const shouldShowPagination = totalPages > 1;

  const visiblePosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "for fun" },
      ]}
      title="For Fun"
      description="A small archive of books, playlists, notes, and the things I keep returning to outside of code."
      tiles={[
        {
          label: "Beli",
          href: "https://beliapp.com/app/victoriasunbun",
          imageSrc: "/images/fun/beli.PNG",
        },
        {
          label: "Fable",
          href: "https://fable.co/fabler/victoria-sun-584274906046?referalID=9LTqwoB0K1",
          imageSrc: "/images/fun/fable.PNG",
        },
        {
          label: "Creative",
          href: "/fun/creative",
          imageSrc: "/images/fun/Creative.jpg",
        },
        {
          label: "Letterboxd",
          href: "https://letterboxd.com/victoriasun/",
          imageSrc: "/images/fun/Letterboxd.jpg",
        },
        {
          label: "Spotify",
          href: "https://open.spotify.com/user/anonymoushammie?si=b71af1cce9b141ef",
          imageSrc: "/images/fun/Spotify.jpg",
        },
        {
          label: "Playlist",
          href: "/fun/playlist",
          imageSrc: "/images/fun/playlists.jpg",
        },
        {
          label: "Cooking",
          href: "fun/cooking",
          imageSrc: "/images/fun/cooking.jpg",
        },
        {
          label: "Book of All Time",
          href: "fun/books/2026/brothers-karamazov",
          imageSrc: "/images/fun/bookOfAllTime.jpg",
        },
        {
          label: "2026 Reading List",
          href: "/fun/books",
          imageSrc: "/images/fun/books.jpg",
        },
      ]}
    >
      <div className="space-y-12">
        {visiblePosts.map((post) => (
          <article
            key={post.slug}
            className="border-b border-ink-faint/40 pb-10"
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-dust-blue">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Undated"}
            </p>

            <h2 className="mt-4 text-2xl uppercase tracking-[0.14em] text-ink">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="mt-5 max-w-2xl text-sm leading-8 text-ink-light">
                {post.excerpt}
              </p>
            )}

            <Link
              href={`/fun/blog/${post.slug}`}
              className="mt-7 inline-block text-[10px] uppercase tracking-[0.32em] text-ink-light transition-colors hover:text-dust-blue"
            >
              See More
            </Link>
          </article>
        ))}

        {shouldShowPagination && (
          <div className="flex justify-between pt-4 text-[10px] uppercase tracking-[0.32em] text-ink-light">
            {hasPreviousPage ? (
              <button className="border border-dust-blue/40 px-4 py-2 transition-colors hover:bg-dust-blue hover:text-cream">
                ←
              </button>
            ) : (
              <div />
            )}

            {hasNextPage ? (
              <button className="border border-dust-blue/40 px-4 py-2 transition-colors hover:bg-dust-blue hover:text-cream">
                →
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </SplitContentLayout>
  );
}
*/