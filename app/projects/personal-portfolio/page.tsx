import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

export default function PersonalPortfolioPage() {
  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "portfolio" },
      ]}
      imageSrc="/images/background_home.jpg"
      title="Personal Portfolio"
      description="A redesign of my personal website using Next.js, Tailwind, and more artistic design."
      links={[
        { label: "GitHub", href: "https://github.com/victoriasunshine/victoriasun.xyz" },
      ]}
    >
      <p>
        This site itself is a project: a personal site meant to hold engineering work,
        writing, and art in one place, without treating any of them as the &quot;real&quot;
        content and the rest as decoration. Most portfolio templates are built around a
        single track (usually just projects), which meant building something more
        flexible from scratch rather than adapting an existing template.
      </p>

      <p className="mt-8">
        The site is built with Next.js and TypeScript, styled with Tailwind CSS, and
        deployed on Vercel. Content — projects, writing, and other sections — is managed
        through Sanity CMS and pulled in via its API, rather than hardcoded into page
        components. That separation means adding or editing a project, essay, or piece
        doesn&apos;t require a code change or redeploy; it&apos;s a content update against
        a structured schema, which keeps the site itself stable while what&apos;s on it
        keeps growing.
      </p>

      <p className="mt-8">
        This page you&apos;re reading is part of that same system — the project pages
        under this site are built on a shared layout component, with per-project content
        (title, description, links, images, body) rendered consistently across each one.
      </p>
    </SplitContentLayout>
  );
}