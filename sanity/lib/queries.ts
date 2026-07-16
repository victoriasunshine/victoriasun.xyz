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
export const booksByYearQuery = `
  *[_type == "bookEntry" && finishDate >= $start && finishDate < $end]
  | order(finishDate asc) {
    title,
    "slug": slug.current,
    author,
    finishDate,
    rating,
    country,
    era,
    genre,
    "hasBody": defined(body[0])
  }
`;

export const bookBySlugQuery = `
  *[_type == "bookEntry" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    author,
    finishDate,
    rating,
    country,
    era,
    genre,
    body
  }
`;
export const currentPlaylistQuery = `
  *[_type == "playlist" && isCurrent == true][0] {
    month,
    year,
    spotifyUrl,
    spotifyPlaylistId,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const playlistArchiveQuery = `
  *[_type == "playlist"] | order(year desc, month desc) {
    month,
    year,
    "slug": slug.current,
    spotifyUrl,
    "coverImageUrl": coverImage.asset->url
  }
`;
export const playlistBySlugQuery = `
  *[_type == "playlist" && slug.current == $slug][0] {
    month,
    year,
    spotifyUrl,
    "coverImageUrl": coverImage.asset->url
  }
`;