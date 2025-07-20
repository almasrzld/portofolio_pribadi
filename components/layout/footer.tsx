const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Almas Rizaldi. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/almasrzld"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/almasrzld/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:almasrizaldi@gmail.com"
            className="hover:text-primary transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
