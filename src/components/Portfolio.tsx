import Reveal from "./Reveal";
import projectLiving from "@/assets/project-living-room.jpeg";
import projectBA1 from "@/assets/project-before-after-1.jpeg";
import projectBA2 from "@/assets/project-before-after-2.jpeg";
import projectBlue from "@/assets/project-bedroom-blue.jpeg";
import projectGrey from "@/assets/project-bedroom-grey.jpeg";
import projectArt from "@/assets/project-bedroom-art.jpeg";
import projectSiteUpdate from "@/assets/project-site-update.jpeg";

const projects = [
  { src: projectLiving, title: "Living Room — Pinmark Distature", category: "Interior Design" },
  { src: projectBlue, title: "Bedroom — Study & Wardrobe", category: "Interior Design" },
  { src: projectGrey, title: "Master Bedroom — Minimal Elegance", category: "Interior Design" },
  { src: projectArt, title: "Bedroom — Art Wall & Accents", category: "Interior Design" },
  { src: projectBA1, title: "Before & After — Hallway Transformation", category: "Construction" },
  { src: projectBA2, title: "Before & After — Living Space", category: "Construction" },
  { src: projectSiteUpdate, title: "Site Progress — New Update", category: "Construction" },
  { src: "/reel-web.mp4", title: "Site Walkthrough Reel", category: "Construction", mediaType: "video" },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  {project.mediaType === "video" ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={project.title}
                    >
                      <source src={project.src} type="video/mp4" />
                      <source src="/reel.mp4" type="video/mp4" />
                      Your browser does not support this video format.
                    </video>
                  ) : (
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
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
