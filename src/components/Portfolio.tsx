import Reveal from "./Reveal";
import projectLiving from "@/assets/project-living-room.jpeg";
import projectBA1 from "@/assets/project-before-after-1.jpeg";
import projectBA2 from "@/assets/project-before-after-2.jpeg";
import projectBlue from "@/assets/project-bedroom-blue.jpeg";
import projectGrey from "@/assets/project-bedroom-grey.jpeg";
import projectArt from "@/assets/project-bedroom-art.jpeg";
import projectSiteUpdate from "@/assets/project-site-update.jpeg";
import render3d01 from "@/assets/WhatsApp Image 2026-03-30 at 10.10.23 PM.jpeg";
import render3d02 from "@/assets/WhatsApp Image 2026-03-30 at 10.10.26 PM.jpeg";
import render3d03 from "@/assets/WhatsApp Image 2026-03-30 at 10.10.27 PM (1).jpeg";
import render3d04 from "@/assets/WhatsApp Image 2026-03-30 at 10.10.27 PM (2).jpeg";
import render3d05 from "@/assets/WhatsApp Image 2026-03-30 at 10.10.27 PM.jpeg";
import render3d06 from "@/assets/WhatsApp Image 2026-03-30 at 10.10.28 PM.jpeg";

const projects = [
  { src: projectLiving, title: "Living Room — Pinmark Distature", category: "Interior Design" },
  { src: projectBlue, title: "Bedroom — Study & Wardrobe", category: "Interior Design" },
  { src: projectGrey, title: "Master Bedroom — Minimal Elegance", category: "Interior Design" },
  { src: projectArt, title: "Bedroom — Art Wall & Accents", category: "Interior Design" },
  { src: render3d01, title: "3D Concept — Bedroom Mood", category: "3D Images" },
  { src: render3d02, title: "3D Concept — Wardrobe Elevation", category: "3D Images" },
  { src: render3d03, title: "3D Concept — TV Area", category: "3D Images" },
  { src: render3d04, title: "3D Concept — Accent Wall", category: "3D Images" },
  { src: render3d05, title: "3D Concept — Full Room View", category: "3D Images" },
  { src: render3d06, title: "3D Concept — Alternate Layout", category: "3D Images" },
  { src: projectBA1, title: "Before & After — Hallway Transformation", category: "Construction" },
  { src: projectBA2, title: "Before & After — Living Space", category: "Construction" },
  { src: projectSiteUpdate, title: "Site Progress — New Update", category: "Construction" },
];

const reels = [
  { src: "/reel-web.mp4", fallbackSrc: "/reel.mp4", title: "Site Walkthrough Reel", category: "Reels" },
  { src: "/REEL4.mp4", fallbackSrc: "/REEL4.mp4", title: "Construction Reel 4", category: "Reels" },
];

const Portfolio = () => {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-16">
            Our Projects
          </h2>
        </Reveal>

        <Reveal delay={50}>
          <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-6">Motion View</h3>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {reels.map((reel, i) => (
            <Reveal key={reel.title} delay={i * 80}>
              <div className="group">
                <div className="aspect-[9/16] overflow-hidden rounded-sm bg-black">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    loop
                    muted
                    playsInline
                    aria-label={reel.title}
                  >
                    <source src={reel.src} type="video/mp4" />
                    <source src={reel.fallbackSrc} type="video/mp4" />
                    Your browser does not support this video format.
                  </video>
                </div>
                <div className="mt-3 mb-8">
                  <p className="font-body text-xs text-muted-foreground tracking-wide uppercase mb-1">
                    {reel.category}
                  </p>
                  <p className="font-display text-base text-foreground">
                    {reel.title}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-6">Images & 3D Concepts</h3>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 mb-8">
                  <p className="font-body text-xs text-muted-foreground tracking-wide uppercase mb-1">
                    {project.category}
                  </p>
                  <p className="font-display text-base text-foreground">
                    {project.title}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
