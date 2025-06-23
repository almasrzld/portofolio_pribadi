"use client";

const ContactSectionFeature = () => {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-background text-foreground"
    >
      <div className="container max-w-2xl space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
          Contact Me
        </h2>
        <p className="text-center text-muted-foreground">
          Let’s collaborate or just say hello! Fill the form below or reach me
          via email.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-border bg-transparent px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/40"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-border bg-transparent px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full border border-border bg-transparent px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/40"
              rows={5}
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSectionFeature;
