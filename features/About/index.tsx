const AboutSectionFeature = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-background text-foreground"
    >
      <div className="container max-w-3xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          About Me
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I'm <span className="text-primary font-semibold">Almas Rizaldi</span>,
          a passionate{" "}
          <span className="text-accent font-semibold">Fullstack Developer</span>{" "}
          based in Indonesia. With a background in both frontend and backend
          development, I enjoy building complete web applications — from UI/UX
          to database architecture.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I’ve built and maintained various systems such as an{" "}
          <strong>Online Taekwondo Championship Management System</strong> using
          <span className="font-medium">
            {" "}
            React.js, Next.js, Express, MongoDB, Laravel
          </span>
          , and integrated it with services like <strong>
            Midtrans
          </strong> and <strong>Cloudinary</strong>. I am also experienced in
          collaborating with teams and continuously improving my skills through
          <strong> MSIB programs</strong> and <strong>bootcamps</strong>.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          I’m currently focused on building high-performance, accessible, and
          modern web applications that solve real-world problems.
        </p>
      </div>
    </section>
  );
};

export default AboutSectionFeature;
