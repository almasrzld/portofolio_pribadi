import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cards = [
  { src: "/images/hero-img-1.jpeg", label: "Midodaren" },
  { src: "/images/hero-img-2.jpeg", label: "Karimun Jawa" },
  { src: "/images/hero-img-3.jpeg", label: "My Love" },
  { src: "/images/hero-img-4.jpeg", label: "SUGBK" },
];

const MobileCardCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div
      className="md:hidden relative w-64 h-72 pt-3 mx-auto"
      onClick={handleNext}
    >
      {cards.map((card, i) => {
        const offset = (i - index + cards.length) % cards.length;
        if (offset > 2) return null;

        return (
          <Card
            key={i}
            className={cn(
              "absolute w-56 h-60 transition-all duration-300 cursor-pointer",
              offset === 2 && "z-30 scale-100 rotate-0",
              offset === 1 && "z-20 scale-95 rotate-[6deg] translate-x-4",
              offset === 0 && "z-10 scale-90 rotate-[9deg] translate-x-8"
            )}
          >
            <img
              src={card.src}
              alt={card.label}
              className="h-40 w-48 mx-auto object-cover rounded-md"
            />
            <p className="-mt-2 text-primary text-center">{card.label}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default MobileCardCarousel;
