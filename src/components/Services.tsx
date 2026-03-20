import Reveal from "./Reveal";

const services = [
  {
    title: "Interior Design",
    desc: "Thoughtful residential interiors that blend aesthetics with everyday functionality — from material selection to final styling.",
  },
  {
    title: "Construction",
    desc: "End-to-end construction management ensuring quality craftsmanship, timely delivery, and attention to structural detail.",
  },
  {
    title: "Planning & Layout",
    desc: "Spatial planning and layout optimization to make the most of every square foot, tailored to how you live.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-16">
            What I do
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div>
                <h3 className="font-display text-xl text-foreground mb-3">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
