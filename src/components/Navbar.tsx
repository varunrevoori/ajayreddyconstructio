import pathuriLogo from "@/assets/pathuri-infra-logo.png";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={pathuriLogo} alt="Pathuri Infra" className="h-10 w-10 object-contain rounded-sm" />
          <div className="leading-tight">
            <span className="font-display text-xl font-medium tracking-wide text-foreground">
              Pathuri Infra
            </span>
          </div>
        </button>
        <div className="hidden md:flex items-center gap-10">
          {["projects", "services", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-display text-sm tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer capitalize"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
