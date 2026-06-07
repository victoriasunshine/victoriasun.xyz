import type {StructureResolver} from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("playlist").title("Playlists"),
      S.documentTypeListItem("creativeProject").title("Creative Projects"),
    ]);