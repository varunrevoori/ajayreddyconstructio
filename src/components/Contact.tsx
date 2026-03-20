import Reveal from "./Reveal";

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="h-px bg-border mb-16" />
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1fr] gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-6">
                Let's work together
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mb-8">
                Have a project in mind or just want to talk? Reach out and we'll
                get back to you.
              </p>
              <a
                href="mailto:pathurinfra@gmail.com"
                className="inline-block bg-accent text-accent-foreground px-6 py-2.5 text-xs font-body font-medium tracking-[0.15em] uppercase rounded-sm hover:opacity-90 transition-opacity duration-200 active:scale-[0.97]"
              >
                Send Message
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="font-body text-sm text-muted-foreground space-y-3">
              <p className="text-foreground font-medium text-base">Pathuri Infra</p>
              <p>Interior and Construction</p>
              <div className="h-px bg-border my-4" />
              <p className="text-foreground">Ajay Reddy Pathuri</p>
              <a href="tel:+918179643726" className="block hover:text-foreground transition-colors">
                +91 8179643726
              </a>
              <a href="mailto:pathurinfra@gmail.com" className="block hover:text-foreground transition-colors">
                pathurinfra@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
