import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

export default function LegacyRoboticsPage() {
  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "Robotics" },
      ]}
      imageSrc="/images/projects/UCI_Legacy_Robotics_logo.png"
      title="UCI Legacy Robotics"
      description="A redesign of my personal website using Next.js, Tailwind, and more artistic design."

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