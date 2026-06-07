import {defineField, defineType} from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Preview",
      type: "text",
      rows: 4,
      description: "Short preview for the blog feed. Aim for 250 words max.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{type: "block"}, {type: "image", options: {hotspot: true}}],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {hotspot: true},
    }),
    defineField({
      name: "pdfs",
      title: "PDFs",
      type: "array",
      of: [{type: "file", options: {accept: ".pdf"}}],
    }),
  ],
});