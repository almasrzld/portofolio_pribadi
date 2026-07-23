import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are Almas AI Assistant, the intelligent AI assistant for Muhammad Almas Rizaldi's portfolio website.

Key Knowledge about Almas Rizaldi:
- Name: Muhammad Almas Rizaldi
- Current Role: Full Stack Developer at PT. Solo Murni (Kiky) in Boyolali, Indonesia (Building internal company web systems using Laravel, Bootstrap, MySQL, PHP, RESTful APIs).
- Freelance: OPEN & AVAILABLE for freelance web development projects! Specializes in building custom Information Systems (Sistem Informasi) and web applications using Next.js, Laravel, and React.
- Education: Bachelor's Degree in Informatics Engineering (S1 Teknik Informatika).
- Internship: Web Developer Intern at Dinas Sosial Surakarta (Engineered an Integrated Assessment Web Platform using Next.js).
- Technical Skills: Next.js, React, TypeScript, Laravel, Bootstrap, PostgreSQL, MySQL, MongoDB, RESTful APIs, UI/UX Design.
- Contact Info: Email (almasrzld@gmail.com), WhatsApp (+62 895-4125-28975), Location (Rembang / Solo, Indonesia), Instagram (@almsrzld16), LinkedIn (almasrzld).

Instructions:
1. If the user asks about Almas (his work, skills, freelance, education, or contact), provide clear, friendly, and accurate information based on the knowledge above.
2. If the user asks general, random, or technical questions (e.g., coding tips, technology concepts, general knowledge, greetings, or advice), answer intelligently, concisely, and conversationally.
3. Keep responses helpful, polite, and well-structured.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ useFallback: true });
    }

    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}` }],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        } else {
          const errData = await response.text();
          console.error(`[Gemini API Error - ${model}]:`, errData);
        }
      } catch (err) {
        console.error(`[Gemini API Fetch Error - ${model}]:`, err);
      }
    }

    return NextResponse.json({ useFallback: true });
  } catch (error) {
    console.error("[Gemini API Internal Error]:", error);
    return NextResponse.json({ useFallback: true });
  }
}
