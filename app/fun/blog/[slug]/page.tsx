import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { blogPostBySlugQuery } from "@/sanity/lib/queries";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type BlogPost = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  body?: any;
  coverImageUrl?: string;
  pdfs?: {
    asset?: {
      url?: string;
      originalFilename?: string;
    };
  }[];
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await client.fetch<BlogPost>(
    blogPostBySlugQuery,
    { slug },
    { next: { revalidate: 0 } }
  );

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* floating breadcrumbs */}
      <nav className="fixed left-8 top-8 z-30 bg-neutral-950/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-neutral-500 backdrop-blur-sm">
        <Link href="/" className="transition-colors hover:text-[#c49aae]">
          Victoria Sun
        </Link>
        <span className="mx-2 text-neutral-700">/</span>
        <Link href="/fun" className="transition-colors hover:text-[#c49aae]">
          For Fun
        </Link>
        <span className="mx-2 text-neutral-700">/</span>
        <span className="font-serif italic text-[#c49aae]">Blog Posts        
          <span className="mx-2 text-neutral-700">/</span>
          { post.title }
        </span>
      </nav>

      {/* hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden border-b border-white/10">
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
        )}

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-8 pb-16 pt-28">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#c49aae]">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Undated"}
          </p>

          <h1 className="mt-6 text-4xl uppercase tracking-[0.18em] text-neutral-100 md:text-5xl">
            {post.title}
          </h1>

        </div>
      </section>

      {/* body */}
      <article className="mx-auto max-w-3xl px-8 py-16">

        {post.body && <PortableTextRenderer value={post.body} />}
        {post.pdfs && post.pdfs.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-8">
            <h2 className="text-[10px] uppercase tracking-[0.34em] text-[#c49aae]">
              Attachments
            </h2>

            <div className="mt-6 space-y-3">
              {post.pdfs.map((pdf) => (
                <a
                  key={pdf.asset?.url}
                  href={pdf.asset?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-[#c49aae]/40 px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-neutral-400 transition-colors hover:bg-[#c49aae] hover:text-neutral-950"
                >
                  {pdf.asset?.originalFilename ?? "PDF"}
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}