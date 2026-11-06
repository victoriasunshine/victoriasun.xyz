import { readdir, readFile } from "fs/promises";
import path from "path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

// One file per entry, named by date: notes/2026-11-01.md next to this page
const NOTES_DIR = path.join(
  process.cwd(), "app", "projects", "book-tracker-notes", "notes",
);

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-11-01" -> "Nov 1, 2026", without Date so the day never shifts by time zone.
function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

async function getEntries() {
  const files = (await readdir(NOTES_DIR))
    .filter((f) => /^\d{4}-\d{2}-\d{2}.*\.md$/.test(f))
    .sort()
    .reverse(); // newest first

  return Promise.all(
    files.map(async (file) => ({
      date: file.slice(0, 10),
      body: await readFile(path.join(NOTES_DIR, file), "utf8"),
    })),
  );
}

export default async function BookTrackerNotesPage() {
  const entries = await getEntries();

  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "Book Tracker (notes)" },
      ]}
      imageSrc="/images/projects/BookTracker.png"
      title="Book Tracker"
      description="A web app for tracking books you own, have read, or want to read."
      links={[
        { label: "Tracker Website", href: "/projects/book-tracker" },
        { label: "GitHub", href: "https://github.com/victoriasunshine/book-tracker" },
      ]}
    >
      <p>A running log of building the tracker, one entry per work session.</p>

      {entries.map((entry, i) => (
        // Each day is a toggle. Only the newest starts open.
        <details key={entry.date} open={i === 0} className="mt-8 border-b pb-4">
          <summary className="cursor-pointer text-xl font-semibold">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          </summary>
          <article className="prose dark:prose-invert max-w-none mt-4">
            {/* rehypeRaw lets <details> toggles render; safe because you write these files. */}
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {entry.body}
            </Markdown>
          </article>
        </details>
      ))}
    </SplitContentLayout>
  );
}
