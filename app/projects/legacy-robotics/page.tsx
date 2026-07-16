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
      description="Legacy is a project team at UCI that builds a rover for the University Rover Challenge. The Autonomous Navigation Subteam is in charge of the software that allows the rover to complete the Autonomous Navigation mission. This mission requires using a camera to navigate terrain by itself and generate panoramas of its surroundings."
      links={[
        { label: "GitHub", href: "https://github.com/UCI-Legacy-Robotics/URC-2026" },
      ]}
    >
      <p>
        The rover platform&apos;s ZED2 camera captures a limited field of view per
        frame, which constrains situational awareness during operation — an operator
        can only see a narrow slice of the environment at a time. The team needed a way
        to combine multiple overlapping frames into a single wide-field panorama, both
        for better real-time visualization and as groundwork for future mapping
        capabilities. The existing tooling only supported offline, batch-style
        processing of pre-saved images, which meant it couldn&apos;t be used against the
        rover&apos;s live camera feed.
      </p>

      <p className="mt-8">
        I own the image stitching pipeline end-to-end. Each frame is corrected with a
        cylindrical projection warp, then processed with SIFT feature detection and a
        brute-force matcher (with Lowe&apos;s ratio test) to find correspondences between
        adjacent frames. A RANSAC-based homography is computed for each pair and chained
        outward from a center anchor frame, so the full sequence aligns into one
        coordinate space. The final panorama is composed with weighted-average blending
        across overlapping regions, followed by connected-component analysis and
        inpainting to clean up small gaps left after warping and cropping.
      </p>

      <p className="mt-8">
        To make this usable against the live system rather than a one-off script, I
        designed and implemented a ROS2 node that wraps the pipeline: it subscribes to
        the rover&apos;s ZED2 image topic, maintains a rolling buffer of recent frames,
        and exposes an on-demand service that triggers a stitch over whatever&apos;s
        currently buffered, publishing the resulting panorama back onto the ROS2 graph.
        This moved the pipeline from a batch/offline tool into something that integrates
        directly with the rover&apos;s operating stack, alongside its other subsystems
        (arm, drive, embedded).
      </p>

      <p className="mt-8">
        Known limitation: the current blending step averages overlapping pixels rather
        than using a seam-aware blend, which produces visible ghosting when there&apos;s
        parallax or motion between source frames rather than pure camera rotation — a
        natural next step is seam-based or multi-band blending. This work is ongoing;
        next milestones include quantifying stitching accuracy and latency under live
        operating conditions.
      </p>
    </SplitContentLayout>
  );
}