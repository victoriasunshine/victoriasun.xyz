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
        Long-form writing goes here. This area becomes the project writeup,
        process notes, technical reflection, screenshots, or blog post body.
      </p>

      <p className="mt-8">
        You can keep adding paragraphs, headings, images, code notes, or process
        sections here.
      </p>
    </SplitContentLayout>
  );
}