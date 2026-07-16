const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function getSpotifyAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
    }),
    next: { revalidate: 3000 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh Spotify token: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function getPlaylistTracks(playlistId: string) {
  const token = await getSpotifyAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3000 },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
        `Failed to fetch Spotify playlist tracks for ${playlistId}: ${response.status} ${errorText}`
      );
  }

  const data = await response.json();

  return data.items.map((item: any) => {
    const track = item.track;

    return {
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      durationMs: track.duration_ms,
      spotifyUrl: track.external_urls.spotify,
      albumCoverUrl: track.album.images?.[1]?.url ?? track.album.images?.[0]?.url,
    };
  });
}