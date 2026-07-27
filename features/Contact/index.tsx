"use client";

import { useState, useEffect, useCallback } from "react";
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
  ShieldCheck,
  RotateCw,
  AlertTriangle,
} from "lucide-react";

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
  captcha: z.string().min(1, { message: "CAPTCHA answer is required" }),
  honeypot: z.string().optional(),
});

type IContactSchema = z.infer<typeof ContactSchema>;

const ContactSectionFeature = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Project Collaboration");
  const [captchaCode, setCaptchaCode] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  }, []);

  // Initialize cooldown check from sessionStorage
  useEffect(() => {
    generateCaptcha();
    const storedCooldown = sessionStorage.getItem("contact_cooldown_until");
    if (storedCooldown) {
      const remaining = Math.max(
        0,
        Math.ceil((parseInt(storedCooldown, 10) - Date.now()) / 1000)
      );
      if (remaining > 0) {
        setCooldownRemaining(remaining);
      } else {
        sessionStorage.removeItem("contact_cooldown_until");
      }
    }
  }, [generateCaptcha]);

  // Active Countdown Timer
  useEffect(() => {
    if (cooldownRemaining <= 0) return;

    const timer = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem("contact_cooldown_until");
          setFailedAttempts(0);
          generateCaptcha();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownRemaining, generateCaptcha]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const form = useForm<IContactSchema>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      captcha: "",
      honeypot: "",
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("almasrzld@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: IContactSchema) => {
    // Check active cooldown
    if (cooldownRemaining > 0) {
      toast.error(
        `Cooldown active! Please wait ${formatTime(cooldownRemaining)}.`
      );
      return;
    }

    // Bot honeypot check
    if (data.honeypot) {
      toast.success("Message sent successfully!");
      form.reset();
      generateCaptcha();
      setFailedAttempts(0);
      return;
    }

    // Alphanumeric CAPTCHA verification check (case-insensitive)
    if (data.captcha.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 5) {
        const cooldownSeconds = 120; // 2 Minutes
        const until = Date.now() + cooldownSeconds * 1000;
        sessionStorage.setItem("contact_cooldown_until", until.toString());
        setCooldownRemaining(cooldownSeconds);

        toast.error(
          "Too many failed attempts! Cooldown active for 2 minutes."
        );
        form.setValue("captcha", "");
        return;
      }

      const remainingAttempts = 5 - nextAttempts;
      form.setError("captcha", {
        type: "manual",
        message: `Incorrect CAPTCHA! (${remainingAttempts} attempt${remainingAttempts === 1 ? "" : "s"} left)`,
      });
      toast.error(
        `Incorrect CAPTCHA code. ${remainingAttempts} attempt${remainingAttempts === 1 ? "" : "s"} remaining.`
      );
      generateCaptcha();
      form.setValue("captcha", "");
      return;
    }

    const body = new URLSearchParams({
      name: data.name,
      email: data.email,
      message: data.message,
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
        setFailedAttempts(0);
        generateCaptcha();
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
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-3xl p-6 sm:p-8 bg-card/70 border border-border/60 backdrop-blur-md shadow-xl h-full flex flex-col justify-between space-y-6">

              {/* Top: Status & Availability */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  AVAILABLE FOR WORK
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                  Let’s build something amazing together!
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Open for freelance projects, full-time engineer roles, or tech collaborations.
                </p>
                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground border-t border-border/40">
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
              <div className="space-y-3.5 flex-1 flex flex-col justify-center">
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

                {/* Active Working Hours Box */}
                <div className="p-4 rounded-2xl bg-background/50 border border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-xs">Working Hours</h4>
                      <p className="text-[11px] text-muted-foreground">Mon - Sat: 08:00 - 21:00 WIB</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    Active
                  </span>
                </div>
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
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${isSelected
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

                  {/* Honeypot field for bot protection */}
                  <div className="hidden aria-hidden:true">
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <Input
                          {...field}
                          tabIndex={-1}
                          autoComplete="off"
                        />
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

                  {/* Cooldown Alert Banner */}
                  {cooldownRemaining > 0 && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300 shadow-lg animate-pulse">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-medium">
                          Too many failed attempts. Cooldown active.
                        </span>
                      </div>
                      <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm px-2.5 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
                        {formatTime(cooldownRemaining)}
                      </span>
                    </div>
                  )}

                  {/* CAPTCHA Anti-Spam Challenge */}
                  <FormField
                    control={form.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormItem className="relative pb-4 space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                            Human Verification Code
                          </FormLabel>
                          <button
                            type="button"
                            disabled={cooldownRemaining > 0}
                            onClick={() => {
                              generateCaptcha();
                              form.setValue("captcha", "");
                            }}
                            title="Generate new code"
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors px-2 py-0.5 rounded-md hover:bg-purple-500/10 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>New Code</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Alphanumeric Security Code Visual Badge */}
                          <div
                            className="h-11 w-32 sm:w-36 rounded-xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-500/40 text-purple-300 font-mono tracking-[0.3em] text-sm sm:text-base font-extrabold select-none flex items-center justify-center shadow-md relative overflow-hidden italic line-through decoration-purple-400/40 decoration-2 shrink-0"
                            style={{
                              backgroundImage:
                                "radial-gradient(ellipse at center, rgba(168,85,247,0.15), transparent 70%)",
                            }}
                          >
                            <span className="drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]">
                              {cooldownRemaining > 0 ? "LOCKED" : captchaCode}
                            </span>
                          </div>

                          {/* Answer Input */}
                          <FormControl className="flex-1">
                            <Input
                              type="text"
                              maxLength={6}
                              disabled={cooldownRemaining > 0}
                              placeholder={
                                cooldownRemaining > 0
                                  ? "Locked"
                                  : "Enter code"
                              }
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.value.toUpperCase())
                              }
                              className="h-11 rounded-xl bg-background/60 border-border/60 focus:border-purple-500 focus:ring-purple-500/20 font-mono tracking-wider uppercase text-sm disabled:opacity-50"
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="absolute bottom-0 left-0 text-[11px] leading-none" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || cooldownRemaining > 0}
                    className="w-full rounded-xl py-6 font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cooldownRemaining > 0 ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Cooldown Active ({formatTime(cooldownRemaining)})</span>
                      </>
                    ) : form.formState.isSubmitting ? (
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
