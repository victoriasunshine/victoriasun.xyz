export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    coverImage
  }`;

export const creativeProjectsQuery = `*[_type == "creativeProject"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    "coverImageUrl": coverImage.asset->url
  }`;