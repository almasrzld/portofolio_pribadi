"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Sparkles,
  X,
  Send,
  User,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actionLinks?: { label: string; url: string }[];
}

const QUICK_SUGGESTIONS = [
  "What is Almas's current role?",
  "Is Almas open for freelance?",
  "What is Next.js?",
  "How to contact Almas?",
];

interface KnowledgeItem {
  keywords: string[];
  text: string;
  actionLinks?: { label: string; url: string }[];
}

const KNOWLEDGE_BASE: Record<string, KnowledgeItem> = {
  currentRole: {
    keywords: ["work", "job", "company", "solo murni", "kiky", "kerja", "sekarang", "current", "role", "position", "pt"],
    text: "Almas is currently working as a Full Stack Developer at PT. Solo Murni (Kiky) in Boyolali, Indonesia. He architects and develops internal enterprise company system websites (Website Sistem Internal Perusahaan) utilizing Laravel, Bootstrap, MySQL, PHP, and RESTful APIs.",
  },
  freelance: {
    keywords: ["freelance", "hire", "project", "sistem informasi", "open", "terima", "proyek", "collaboration", "available"],
    text: "Yes! Almas is currently OPEN and available for freelance web development projects! He specializes in engineering custom Information Systems (Sistem Informasi), web applications, and API integrations using Next.js, Laravel, React, and modern databases.",
    actionLinks: [
      { label: "WhatsApp Chat", url: "https://wa.me/62895412528975" },
      { label: "Direct Email", url: "mailto:almasrzld@gmail.com" },
    ],
  },
  education: {
    keywords: ["education", "degree", "university", "kuliah", "s1", "teknik informatika", "bachelor", "graduate", "pendidikan"],
    text: "Almas graduated with a Bachelor's Degree in Informatics Engineering (S1 Teknik Informatika). He specialized in Software Engineering, Algorithms & Data Structures, Web Systems Architecture, and Database Systems.",
  },
  internship: {
    keywords: ["internship", "intern", "magang", "dinsos", "dinas sosial", "surakarta"],
    text: "Almas completed a Web Developer Internship at Dinas Sosial Surakarta, where he engineered an integrated assessment web system platform (Website Assessment Terintegrasi) utilizing Next.js and Tailwind CSS.",
  },
  skills: {
    keywords: ["skill", "stack", "technology", "frontend", "backend", "database", "keahlian", "kemampuan"],
    text: "Almas is a Full Stack Software Engineer proficient in:\n• Frontend: Next.js, React, TypeScript, Tailwind CSS, Bootstrap, UI/UX Design\n• Backend: Laravel, Node.js / Express, RESTful APIs, PHP\n• Databases: PostgreSQL, MySQL, MongoDB",
  },
  contact: {
    keywords: ["contact", "email", "whatsapp", "phone", "location", "instagram", "linkedin", "address", "kontak", "hubungi"],
    text: "You can connect with Almas directly:\n• Email: almasrzld@gmail.com\n• WhatsApp: +62 895-4125-28975\n• Location: Rembang / Solo, Indonesia (UTC+7 WIB)\n• Instagram: @almsrzld16\n• LinkedIn: linkedin.com/in/almasrzld",
    actionLinks: [
      { label: "WhatsApp Direct", url: "https://wa.me/62895412528975" },
      { label: "Instagram (@almsrzld16)", url: "https://www.instagram.com/almsrzld16?igsh=MTB5Z243MzlrYmoxdw%3D%3D&utm_source=qr" },
    ],
  },
  nextjs: {
    keywords: ["next.js", "nextjs", "what is next"],
    text: "Next.js is a powerful React framework for building fast, full-stack web applications. It features Server-Side Rendering (SSR), Static Site Generation (SSG), API routes, and optimized routing. Almas uses Next.js extensively for high-performance web projects!",
  },
  laravel: {
    keywords: ["laravel", "what is laravel"],
    text: "Laravel is a modern PHP web application framework with elegant syntax. It provides robust tools for backend APIs, authentication, routing, and database migrations. Almas uses Laravel at PT. Solo Murni (Kiky) and for freelance Information Systems!",
  },
  restApi: {
    keywords: ["rest api", "restful", "api"],
    text: "A RESTful API (Representational State Transfer) allows different software systems to communicate over HTTP using standard methods like GET, POST, PUT, and DELETE. Almas builds secure RESTful APIs with Node.js/Express and Laravel.",
  },
  nasiGoreng: {
    keywords: ["nasi goreng", "bahan baku nasi goreng", "resep nasi goreng", "masak nasi goreng"],
    text: "Berikut bahan baku utama untuk membuat Nasi Goreng lezat 🍳:\n• Nasi putih (dingin/sisa semalam agar tidak lembek)\n• Bumbu halus: Bawang merah, bawang putih, cabai merah/rawit, garam & merica\n• Penyedap & Saus: Kecap manis, saus tiram, minyak wijen (opsional)\n• Pelengkap: Telur (orak-arik/ceplok), daun bawang, ayam suwir, sosis/bakso, kerupuk & acar!",
  },
  culinary: {
    keywords: ["resep", "bahan", "makanan", "masak", "kuliner", "minuman"],
    text: "Wah, membicarakan makanan memang selalu menarik! Selain mengembangkan sistem web, Almas juga mengapresiasi kreativitas di bidang kuliner. Ada resep atau hidangan khusus yang ingin Anda tanyakan?",
  },
  techConcepts: {
    keywords: ["react", "typescript", "javascript", "tailwind", "database", "sql", "git", "html", "css", "express", "node", "ai", "gemini"],
    text: "Teknologi modern sangat pesat! Almas berorientasi pada pengembangan Full Stack dengan ekosistem JavaScript/TypeScript (React, Next.js) serta PHP (Laravel, MySQL). Ada konsep teknologi spesifik yang ingin Anda diskusikan?",
  },
  indonesianGreetings: {
    keywords: ["halo", "hai", "pagi", "siang", "sore", "malam", "apa kabar", "siapa kamu", "bisa apa"],
    text: "Halo! Saya Almas AI Assistant 🤖. Saya siap menjawab pertanyaan apa saja — baik tentang pengalaman karir Almas (PT. Solo Murni Kiky, Freelance, S1 Teknik Informatika), skill teknis, maupun pertanyaan umum lainnya. Ada yang bisa saya bantu?",
  },
  generalThanks: {
    keywords: ["thank", "makasih", "terima kasih", "thx", "awesome", "cool", "mantap", "sip", "ok", "oke"],
    text: "Sama-sama! 😊 Senang bisa membantu. Jika ada pertanyaan lain atau ingin berkonsultasi mengenai proyek web, jangan ragu untuk bertanya!",
    actionLinks: [
      { label: "WhatsApp Almas", url: "https://wa.me/62895412528975" },
    ],
  },
  greeting: {
    keywords: ["hi", "hello", "hey", "p", "siapa", "who", "start"],
    text: "Hello! I'm Almas AI Assistant 🤖✨. Ask me anything — about Almas's career, freelance availability, tech stack, or general random & coding questions!",
  },
};

function getLocalResponse(query: string): { text: string; actionLinks?: { label: string; url: string }[] } {
  const q = query.toLowerCase();

  for (const item of Object.values(KNOWLEDGE_BASE)) {
    if (item.keywords.some((k) => q.includes(k))) {
      return { text: item.text, actionLinks: item.actionLinks };
    }
  }

  return {
    text: `Pertanyaan menarik! Sebagai Almas AI Assistant 🤖, saya bisa menjawab pertanyaan seputar karir Almas (PT. Solo Murni Kiky, Freelance, S1 Teknik Informatika), tech stack (Next.js, Laravel, React, MySQL), maupun pertanyaan seputar pemrograman & teknologi. Apa yang ingin Anda ketahui lebih lanjut?`,
    actionLinks: [
      { label: "WhatsApp Almas", url: "https://wa.me/62895412528975" },
      { label: "Send Email", url: "mailto:almasrzld@gmail.com" },
    ],
  };
}

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! 👋 I'm Almas AI Assistant. Ask me anything — about Almas's career at PT. Solo Murni (Kiky), freelance availability, tech stack, or general coding & random questions!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      // 1. Try Live Next.js AI API endpoint
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      // Fallthrough to local conversational engine
    }

    // 2. Fallback to Local Conversational Intent Engine
    setTimeout(() => {
      const response = getLocalResponse(query);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionLinks: response.actionLinks,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Chat reset! Ask me anything about Almas's experience, freelance availability, skills, or general tech questions!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right Corner) */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[999]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3 sm:p-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-xl shadow-purple-500/30 flex items-center justify-center border border-purple-400/40 transition-all duration-300"
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <>
              <Bot className="w-5 h-5" />
              {/* Glowing Unread Ping Badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background animate-pulse" />
            </>
          )}
        </motion.button>
      </div>

      {/* Slide-Up AI Chat Modal (Compact Dimensions) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-18 right-4 sm:bottom-20 sm:right-5 z-[999] w-[calc(100vw-2rem)] sm:w-[340px] md:w-[350px] h-[430px] sm:h-[450px] rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-3 bg-purple-600/10 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative p-1.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Bot className="w-4 h-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-background" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xs flex items-center gap-1">
                    Almas AI Assistant
                    <Sparkles className="w-3 h-3 text-purple-400 inline" />
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    Online • Portfolio & General AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear Chat History"
                  className="p-1.5 rounded-xl hover:bg-background/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-background/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  <div className={`max-w-[80%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white rounded-tr-none shadow-md"
                          : "bg-background/60 border border-border/60 text-foreground rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Action Links if available */}
                    {msg.actionLinks && msg.actionLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.actionLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-400 hover:bg-purple-500/25 transition-all"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}

                    <span className="block text-[10px] text-muted-foreground/60 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-background/60 border border-border/60 rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-background/40 border-t border-border/40 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="text-[11px] font-medium px-3 py-1 rounded-full bg-card border border-border/60 hover:border-purple-500/50 hover:text-purple-400 text-muted-foreground transition-colors shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-card border-t border-border/60 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask any question (portfolio, tech, random...)"
                className="flex-1 bg-background/60 border border-border/60 rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
