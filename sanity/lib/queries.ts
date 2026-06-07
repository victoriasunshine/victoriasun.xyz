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
export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    "coverImageUrl": coverImage.asset->url,
    pdfs[]{
      asset->{
        url,
        originalFilename
      }
    }
  }
`;