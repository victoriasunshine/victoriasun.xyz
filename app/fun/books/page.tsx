import { redirect } from "next/navigation";

export default function BooksPage() {
  const currentYear = new Date().getFullYear();
  redirect(`/fun/books/${currentYear}`);
}