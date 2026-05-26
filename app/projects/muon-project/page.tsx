import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

export default function MuonProjectPage() {
  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "Muon Project" },
      ]}
      imageSrc="/images/Muon_Project"
      title="IVC Muon Project"
      description="A redesign of my personal website using Next.js, Tailwind, and more artistic design."
      links={[
        { label: "Paper", href: "LINKKKKKKK" },
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