import { SplitContentLayout } from "@/components/layout/SplitContentLayout";

export default function FoundationFixPage() {
  return (
    <SplitContentLayout
      breadcrumbs={[
        { label: "Victoria Sun", href: "/" },
        { label: "projects", href: "/projects" },
        { label: "Foundation Fix" },
      ]}
      imageSrc="/images/projects/Foundation_Fix.png"
      title="Foundation Fix"
      description="desc"
      links={[
        { label: "Paper", href: "/files/engineer_report.pdf" }, 
        { label: "GitHub", href: "https://github.com/dalenas/foundation-fix"},
      ]}
    >
      <p>
        Foundation Fix is a team-built system that scans a person&apos;s face, determines
        their skin tone under real, uncontrolled lighting, and dispenses a custom-mixed
        foundation shade to match. The core problem it addresses: skin tone detection
        from a camera is only as good as the lighting it&apos;s captured under, and most
        consumer shade-matching tools ignore this, producing inconsistent results across
        different rooms, times of day, and devices.
      </p>

      <p className="mt-8">
        My role was on the computer vision front end of the pipeline. I built the face
        detection and sampling stage: a Haar cascade classifier locates the largest face
        in frame, then the system samples skin tone from four weighted regions
        (forehead, nose, and both cheeks) rather than a single point, to reduce noise
        from local lighting variation and blemishes. In parallel, the system detects a
        Macbeth ColorChecker reference sheet held in frame, isolates it from the
        background, and extracts the mean color of each of its 24 reference patches.
        Those reference values are what let the rest of the pipeline correct for the
        actual lighting conditions in the room, rather than assuming a controlled studio
        setup. I also authored the full engineering design report documenting the
        system&apos;s requirements, iterations, and technical basis.
      </p>

      <p className="mt-8">
        From there, a teammate handled the color science: converting the sampled RGB
        values into a lighting-corrected, gamma-linearized representation, transforming
        into CIE Lab space, and solving for the linear combination of five base
        colorants (white, black, red, blue, yellow) that best reproduces the target
        skin tone, using a simplex-projected least-squares solve to keep the mix
        proportions physically valid (non-negative, summing to one). Those proportions
        were then translated into stepper motor step counts to drive a physical
        dispensing rig, with a Flask API tying the camera capture, analysis, and
        dispensing steps together into one workflow.
      </p>
    </SplitContentLayout>
  );
}