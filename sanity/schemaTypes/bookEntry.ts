import {defineField, defineType} from "sanity";

export const bookEntry = defineType({
  name: "bookEntry",
  title: "Book Entries",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "finishDate", title: "Finish Date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (Rule) => Rule.min(0).max(5) }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "era", title: "Era / Tradition", type: "string" }),
    defineField({ name: "genre", title: "Genre", type: "string" }),
    defineField({
      name: "body",
      title: "Review / Notes",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});