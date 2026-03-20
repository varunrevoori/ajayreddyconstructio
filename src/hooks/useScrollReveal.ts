import { useEffect, useRef } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationPlayState = "running";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    el.style.opacity = "0";
    el.style.animationPlayState = "paused";
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default useScrollReveal;
