"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Mail,
  Copy,
  Check,
  MessageSquare,
  Send,
  Loader2,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Lock,
  Clock,
  Globe,
} from "lucide-react";

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type IContactSchema = z.infer<typeof ContactSchema>;

const ContactSectionFeature = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Project Collaboration");

  const form = useForm<IContactSchema>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("almasrzld@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: IContactSchema) => {
    const body = new URLSearchParams({
      ...data,
      _subject: `New Request [${selectedTopic}]!`,
      _captcha: "false",
      _template: "box",
    });

    try {
      const res = await fetch("https://formsubmit.co/almasrzld@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <section
      id="contact"
      className="bg-background text-foreground relative py-20 overflow-hidden"
    >
      <div className="container relative z-10 space-y-12">
        {/* Section Header */}
        <div className="relative flex justify-center items-center py-2">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-primary font-instrumentserif tracking-wide relative z-10">
            <span className="text-purple-500/30">Contact</span> Me
          </h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 font-instrumentserif font-bold text-7xl sm:text-8xl md:text-9xl tracking-widest select-none z-0 pointer-events-none whitespace-nowrap">
            Contact
          </div>
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Got a project in mind or want to collaborate? Feel free to reach out via form or direct contact below!
        </p>

        {/* 2-Column Split Layout (Full Width & Precision Symmetrical Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
          
          {/* Left Column: Single Unified Glassmorphic Contact Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-3xl p-6 sm:p-8 bg-card/70 border border-border/60 backdrop-blur-md shadow-xl h-full flex flex-col justify-between space-y-4">
              
              {/* Top: Status & Availability */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  AVAILABLE FOR WORK
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                  Let’s build something amazing together!
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Open for freelance projects, full-time engineering roles, or tech collaborations.
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Rembang, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>UTC+7 (WIB)</span>
                  </div>
                </div>
              </div>

              {/* Middle: Direct Contact Boxes */}
              <div className="space-y-3">
                {/* Direct Email Box */}
                <div className="p-4 rounded-2xl bg-background/50 border border-border/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-400" /> Direct Email
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors px-2.5 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    almasrzld@gmail.com
                  </p>
                </div>

                {/* WhatsApp Direct Chat Link */}
                <a
                  href="https://wa.me/62895412528975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-background/50 to-background/50 border border-emerald-500/30 shadow-md flex items-center justify-between transition-all duration-300 hover:border-emerald-500/60 block"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-xs group-hover:text-emerald-400 transition-colors">
                        WhatsApp Direct Chat
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Fast Response (+62 895-4125-28975)
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>

              {/* Bottom: Social / Quick Links Footer */}
              <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <span className="text-purple-400 font-medium">Quick Connect:</span>
                <div className="flex items-center gap-2.5 font-semibold text-foreground">
                  <a
                    href="https://www.instagram.com/almsrzld16?igsh=MTB5Z243MzlrYmoxdw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Instagram
                  </a>
                  <span>•</span>
                  <a
                    href="https://linkedin.com/in/almasrzld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Glassmorphic Message Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-card/70 border border-border/60 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-purple-500/30 h-full flex flex-col justify-between space-y-4">
              
              {/* Top: Header & Topic Chips */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-purple-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send a Message</span>
                </div>

                {/* Interactive Topic Selector Chips */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-foreground">
                    What can I help you with?
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Project Collaboration",
                      "Freelance Role",
                      "General Inquiry",
                    ].map((topic) => {
                      const isSelected = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                            isSelected
                              ? "bg-purple-500/20 border-purple-500 text-purple-400 font-semibold"
                              : "bg-background/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Middle: Form Fields */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <Input
                    type="hidden"
                    name="_subject"
                    value={`New Request [${selectedTopic}]!`}
                  />
                  <Input type="hidden" name="_captcha" value="false" />
                  <Input type="hidden" name="_template" value="box" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="relative pb-4 space-y-1">
                          <FormLabel className="text-xs font-semibold text-foreground">
                            Your Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="rounded-xl bg-background/60 border-border/60 focus:border-purple-500 focus:ring-purple-500/20"
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-0 left-0 text-[11px] leading-none" />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="relative pb-4 space-y-1">
                          <FormLabel className="text-xs font-semibold text-foreground">
                            Your Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              className="rounded-xl bg-background/60 border-border/60 focus:border-purple-500 focus:ring-purple-500/20"
                            />
                          </FormControl>
                          <FormMessage className="absolute bottom-0 left-0 text-[11px] leading-none" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="relative pb-4 space-y-1">
                        <FormLabel className="text-xs font-semibold text-foreground">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Hi Almas, I'd like to collaborate on..."
                            {...field}
                            className="rounded-xl bg-background/60 border-border/60 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-0 left-0 text-[11px] leading-none" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full rounded-xl py-6 font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Bottom: Security & Response Guarantee Footer */}
              <div className="pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5 text-purple-400">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Direct & Encrypted Inbox Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>24-48h Guaranteed Response</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSectionFeature;
