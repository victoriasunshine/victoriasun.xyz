import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

export default function FoundationFixPage() {
  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "Foundation Fix" },
      ]}
      imageSrc="/images/Foundation_Fix"
      title="Foundation Fix"
      description="desc"
      links={[
        { label: "Paper", href: "LINKKKKKKK" }, 
        { label: "Repo", href: "LINKKKKKKK"},
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