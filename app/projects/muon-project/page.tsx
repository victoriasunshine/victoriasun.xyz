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
      description="Build a Muon Detector based on the Cosmic Watch detector. Founding class. Presented at Bay Honors Symposium."
      links={[
        { label: "Paper", href: "/files/Muon_paper.pdf" },
      ]}
    >
      <p>
        Muon tomography — using naturally occurring cosmic ray muons to &quot;x-ray&quot;
        objects — is a promising, non-invasive imaging technique with applications in
        archaeology, materials science, and civil engineering. But existing muon
        tomography research relies on large-scale, expensive detection apparatuses,
        which limits accessibility for smaller labs and undergraduate research. Our team
        set out to test a narrower question: could an inexpensive, handheld muon
        detector reliably detect the relationship between material density and muon
        attenuation — the fundamental physical principle underlying muon tomography —
        well enough to make a case for accessible, low-cost detectors as a viable
        research tool?
      </p>

      <p className="mt-8">
        The team built a detector modeled on the MIT CosmicWatch design (plastic
        scintillator, SiPM photodetection, Arduino-based signal processing), and ran two
        experiments: one holding barrier thickness constant while varying material
        density (steel vs. aluminum vs. no barrier), and one holding material constant
        (steel) while incrementally increasing barrier thickness. My role was on the
        analysis and reporting side: I took the raw Arduino-logged event data
        (timestamps and detection counts) and calculated the average muon flux rate for
        each trial, normalized by detector surface area, so the density and thickness
        experiments could be compared on a consistent basis. I also authored the full
        paper — methodology, theoretical background on muon production and energy loss,
        results, and conclusion.
      </p>

      <p className="mt-8">
        Both experiments supported the underlying hypothesis: increasing either the
        density or the thickness of the barrier material produced a consistent,
        measurable decrease in muon detection rate. The thickness experiment in
        particular produced a clean linear trend (slope of -0.25 detections/min per cm
        of steel), and the no-barrier control came reasonably close to the accepted
        literature value for muon flux at sea level (~1 muon/cm²/min). The paper was
        accepted to the Bay Honors Symposium and received an honorable mention for the
        Heslet Scholar Award, given to five groups conference-wide based on abstract and
        presentation. It&apos;s currently under review by the rest of the team ahead of
        a submission for publication.
      </p>
    </SplitContentLayout>
  );
}