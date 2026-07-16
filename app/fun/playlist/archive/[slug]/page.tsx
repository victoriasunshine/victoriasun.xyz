import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { playlistBySlugQuery } from "@/sanity/lib/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Playlist = {
  month?: string;
  year?: number;
  spotifyUrl?: string;
  coverImageUrl?: string;
};

export default async function ArchivedPlaylistPage({ params }: PageProps) {
  const { slug } = await params;

  const playlist = await client.fetch<Playlist>(
    playlistBySlugQuery,
    { slug },
    { next: { revalidate: 0 } }
  );

  if (!playlist) notFound();

  const title = `${playlist.month ?? "Playlist"} ${playlist.year ?? ""}`.trim();

  return (
    <main className="min-h-screen">
      <nav className="fixed left-8 top-8 z-20 bg-cream/80 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-ink-light backdrop-blur-sm">
        <Link href="/" className="transition-colors hover:text-dust-blue">
          Victoria Sun
        </Link>
        <span className="mx-2 text-ink-faint">/</span>
        <Link href="/fun" className="transition-colors hover:text-dust-blue">
          For Fun
        </Link>
        <span className="mx-2 text-ink-faint">/</span>
        <Link href="/fun/playlist" className="transition-colors hover:text-dust-blue">
          Playlist
        </Link>
        <span className="mx-2 text-ink-faint">/</span>
        <Link href="/fun/playlist/archive" className="transition-colors hover:text-dust-blue">
          Archive
        </Link>
        <span className="mx-2 text-ink-faint">/</span>
        <span className="font-serif italic text-dust-blue">{title}</span>
      </nav>

      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8 py-28">
        <div className="grid gap-10 md:grid-cols-[260px_1fr] md:items-end">
          <div className="aspect-square border border-ink-faint/30 bg-cream-dark">
            {playlist.coverImageUrl ? (
              <img
                src={playlist.coverImageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-cream-dark" />
            )}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-dust-blue">
              Archived Rotation
            </p>

            <h1 className="mt-5 text-4xl uppercase tracking-[0.16em] text-ink md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-ink-light">
              A saved soundtrack from this month.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-ink-faint/30 pt-8">
          {playlist.spotifyUrl ? (
            <iframe
              src={playlist.spotifyUrl}
              width="100%"
              height="380"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-none border border-ink-faint/30"
            />
          ) : (
            <p className="text-sm text-ink-light">
              No Spotify embed has been added for this playlist.
            </p>
          )}
        </div>

        {playlist.spotifyUrl && (
          <div className="mt-10 flex justify-end text-[10px] uppercase tracking-[0.32em] text-ink-light">
            <a
              href={playlist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dust-blue"
            >
              Open in Spotify
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
