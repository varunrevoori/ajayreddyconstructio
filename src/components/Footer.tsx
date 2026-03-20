const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pathuri Infra — Interior and Construction
        </p>
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
