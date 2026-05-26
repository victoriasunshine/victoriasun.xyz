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
        project writeup
      </p>

      <p className="mt-8">
        etc...
      </p>
    </SplitContentLayout>
  );
}