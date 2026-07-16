import {defineField, defineType} from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  type: "document",
  fields: [
    defineField({
      name: "month",
      title: "Month",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "month", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "spotifyPlaylistId",
      title: "Spotify Playlist ID",
      type: "string",
      description: "From the playlist URL, e.g. open.spotify.com/playlist/THIS_PART",
    }),
    defineField({
      name: "coverImage",
      title: "Cover",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({
      name: "isCurrent",
      title: "Current Playlist?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "songs",
      title: "Songs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Song", type: "string" }),
            defineField({ name: "artist", title: "Artist", type: "string" }),
            defineField({ name: "duration", title: "Duration", type: "string" }),
            defineField({
              name: "albumCover",
              title: "Album Cover",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "spotifyUrl",
              title: "Spotify Link",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],
});
