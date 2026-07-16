/*import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { currentPlaylistQuery } from "@/sanity/lib/queries";
import { getPlaylistTracks } from "@/sanity/lib/spotify";

type Playlist = {
  month?: string;
  year?: number;
  spotifyUrl?: string;
  spotifyPlaylistId?: string;
  coverImageUrl?: string;
};

type SpotifyTrack = {
  title: string;
  artist: string;
  durationMs: number;
  spotifyUrl: string;
  albumCoverUrl?: string;
};

function formatDuration(durationMs: number) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default async function PlaylistPage() {
  const playlist = await client.fetch<Playlist>(
    currentPlaylistQuery,
    {},
    { next: { revalidate: 0 } }
  );

  const tracks: SpotifyTrack[] =
    playlist?.spotifyPlaylistId
      ? await getPlaylistTracks(playlist.spotifyPlaylistId)
      : [];

  const title = `${playlist?.month ?? "Monthly Playlist"} ${
    playlist?.year ?? ""
  }`.trim();

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
        <span className="font-serif italic text-dust-blue">Playlist</span>
      </nav>

      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8 py-28">
        <div className="grid gap-10 md:grid-cols-[260px_1fr] md:items-end">
          <div className="aspect-square border border-ink-faint/30 bg-cream-dark">
            {playlist?.coverImageUrl ? (
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
              Current Rotation
            </p>

            <h1 className="mt-5 text-4xl uppercase tracking-[0.16em] text-ink md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-ink-light">
              A small soundtrack for the current month — songs I keep returning
              to while working, reading, walking, and building.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-ink-faint/30 pt-8">
          {tracks.length > 0 ? (
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <div
                  key={`${track.title}-${index}`}
                  className="group grid grid-cols-[32px_48px_1fr_auto] items-center gap-4 border-b border-ink-faint/30 py-3 text-ink-light transition-colors hover:bg-ink-faint/10 hover:text-ink"
                >
                  <span className="text-center text-[10px] text-ink-faint group-hover:text-dust-blue">
                    ▶
                  </span>

                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square w-12 overflow-hidden border border-ink-faint/30 bg-cream-dark"
                  >
                    {track.albumCoverUrl && (
                      <img
                        src={track.albumCoverUrl}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    )}
                  </a>

                  <div>
                    <p className="text-sm uppercase tracking-[0.12em] text-ink">
                      {track.title}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-light">
                      {track.artist}
                    </p>
                  </div>

                  <p className="text-[10px] tracking-[0.18em] text-ink-faint">
                    {formatDuration(track.durationMs)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-light">
              No Spotify tracks found yet.
            </p>
          )}
        </div>

         <div className="mt-10 flex justify-between text-[10px] uppercase tracking-[0.32em] text-ink-light">
          <Link href="/fun/playlist/archive" className="hover:text-dust-blue">
            Archives
          </Link>

          {playlist?.spotifyUrl && (
            <a
              href={playlist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dust-blue"
            >
              Open in Spotify
            </a>
          )}
        </div> 
      </section>
    </main>
  );
}
*/