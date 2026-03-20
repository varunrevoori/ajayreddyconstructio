import Reveal from "./Reveal";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <Reveal>
            <span className="section-label">— About</span>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-xl">
              <p className="font-body text-sm leading-[1.8] text-foreground mb-6">
                Pathuri Infra is an interior design and construction firm founded
                by Ajay Reddy Pathuri. We bring a keen eye for detail and a deep
                commitment to creating spaces that balance beauty with functionality.
              </p>
              <p className="font-body text-sm leading-[1.8] text-foreground">
                Every project begins with understanding how people live — their
                rhythms, their needs, their aspirations. We translate these into
                environments that feel both considered and effortless, using
                quality materials, clean lines, and warm textures.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
