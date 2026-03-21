const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/pathurilogo.jpeg"
            alt="Pathuri Infra"
            className="h-10 w-auto object-contain"
          />
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pathuri Infra
          </p>
        </div>
        <div className="flex gap-6">
          {["projects", "services", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => document.getElementById(item)?.scrollIntoView({ behavior: "smooth" })}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors capitalize cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
