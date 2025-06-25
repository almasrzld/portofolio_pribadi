const SkillSectionFeature = () => {
  return (
    <section
      id="skill"
      className="min-h-screen py-20 bg-background text-foreground relative"
    >
      <div className="container space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary font-instrumentserif">
          <span className="text-purple-500/30">My</span> Skills
        </h2>

        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          I specialize in both frontend and backend development using modern
          frameworks and technologies. Below are the core tools and skills I use
          to build performant and scalable web applications.
        </p>
      </div>

      <div className="absolute top-[11%] left-1/2 -translate-x-1/2 opacity-10 font-instrumentserif font-bold text-8xl tracking-wide select-none z-0">
        Skills
      </div>
    </section>
  );
};

export default SkillSectionFeature;
