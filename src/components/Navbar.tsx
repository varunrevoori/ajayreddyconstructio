import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Pathuri Infra"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className="font-display text-lg md:text-xl text-foreground tracking-wide leading-tight">
            <span className="block">Pathuri Infra</span>
          </span>
        </button>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="h-0.5 w-6 bg-foreground block" />
          <span className="h-0.5 w-6 bg-foreground block" />
          <span className="h-0.5 w-6 bg-foreground block" />
        </button>

        <div className="hidden md:flex items-center gap-10">
          {['projects', 'services', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-display text-sm tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer capitalize"
            >
              {item}
            </button>
          ))}
          <Link
            to="/estimation"
            className="font-display text-sm tracking-[0.08em] text-muted-foreground transition-colors duration-200 capitalize hover:text-foreground"
          >
            estimation
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-3">
            {['projects', 'services', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-left font-display text-sm tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors duration-200 capitalize"
              >
                {item}
              </button>
            ))}
            <Link
              to="/estimation"
              onClick={() => setIsMenuOpen(false)}
              className="text-left font-display text-sm tracking-[0.08em] text-muted-foreground transition-colors duration-200 capitalize hover:text-foreground"
            >
              estimation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
