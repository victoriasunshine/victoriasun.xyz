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
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
      validation: (Rule) => Rule.required(),
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
  ],
});