import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

export default function MuonProjectPage() {
  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "Muon Project" },
      ]}
      imageSrc="/images/projects/Muon_Project.png"
      title="IVC Muon Project"
      description="desc"
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