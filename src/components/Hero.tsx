import ajayPhoto from "@/assets/ajay-photo.jpeg";
import Reveal from "./Reveal";

const Hero = () => {
  return (
    <section className="min-h-[75vh] flex items-center pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <img
                src={ajayPhoto}
                alt="Ajay Reddy Pathuri"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Founder — Pathuri Infra
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-foreground mb-6">
                Ajay Reddy
                <br />
<span className="font-normal text-[32px]">Interior Designer & Home Planner</span>
              </h1>
              <p className="font-body text-sm text-muted-foreground max-w-md leading-relaxed mb-8">
                Crafting thoughtful residential spaces through interior design,
                construction, and meticulous planning at Pathuri Infra.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-accent text-accent-foreground px-6 py-2.5 text-xs font-body font-medium tracking-[0.15em] uppercase rounded-sm hover:opacity-90 transition-opacity duration-200 active:scale-[0.97]"
              >
                Reach Out
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
