import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production";

// Zod Schema for input payload validation & sanitization
const chatRequestSchema = z.object({
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message cannot exceed 500 characters"),
});

const SYSTEM_PROMPT = `
You are Almas AI Assistant, the intelligent AI assistant for Muhammad Almas Rizaldi's portfolio website.

Key Knowledge about Almas Rizaldi:
- Name: Muhammad Almas Rizaldi
- Current Role: Full Stack Developer at PT. Solo Murni (Kiky) in Boyolali, Indonesia (Building internal company web systems using Laravel, Bootstrap, MySQL, PHP, RESTful APIs).
- Freelance: OPEN & AVAILABLE for freelance web development projects! Specializes in building custom Information Systems (Sistem Informasi) and web applications using Next.js, Laravel, and React.
- Education: Bachelor's Degree in Informatics Engineering (S1 Teknik Informatika) from Universitas Muhammadiyah Surakarta (UMS).
- Internship: Web Developer Intern at Dinas Sosial Surakarta (Engineered an Integrated Assessment Web Platform using Next.js).
- Technical Skills: Next.js, React, TypeScript, Laravel, Bootstrap, PostgreSQL, MySQL, MongoDB, RESTful APIs, UI/UX Design.
- Contact Info: Email (almasrzld@gmail.com), WhatsApp (+62 895-4125-28975), Location (Rembang / Solo, Indonesia), Instagram (@almsrzld16), LinkedIn (almasrzld).

Instructions:
1. If the user asks about Almas (his work, skills, freelance, education, or contact), provide clear, friendly, and accurate information based on the knowledge above.
2. If the user asks general, random, or technical questions (e.g., coding tips, technology concepts, general knowledge, greetings, or advice), answer intelligently, concisely, and conversationally.
3. Keep responses helpful, polite, and well-structured.
`;

export async function POST(req: Request) {
  // 1. Rate Limiting Protection (10 requests per minute per client IP)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(clientIp, 10, 60 * 1000);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Please wait before sending more messages.",
        retryAfter: rateLimitResult.resetInSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimitResult.resetInSeconds.toString(),
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // 2. Input Payload Parsing & Zod Validation
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body payload" },
      { status: 400 }
    );
  }

  const validation = chatRequestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        ...(isProduction
          ? {}
          : { details: validation.error.flatten().fieldErrors }),
      },
      { status: 400 }
    );
  }

  const { message } = validation.data;

  // 3. Secure API Key Access (strictly server-side process.env.GEMINI_API_KEY)
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // If no key is set on server, tell client to use client-side local engine fallback
    return NextResponse.json({ useFallback: true });
  }

  // 4. Upstream API Execution with Timeout Safeguard & Token Cap
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
          signal: AbortSignal.timeout(8000), // 8 seconds timeout cap per attempt
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}` }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.7,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return NextResponse.json(
            { reply: replyText },
            {
              headers: {
                "X-RateLimit-Limit": rateLimitResult.limit.toString(),
                "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
              },
            }
          );
        }
      } else {
        if (!isProduction) {
          const errData = await response.text();
          console.error(`[Gemini API Error - ${model}]:`, errData);
        }
      }
    } catch (err) {
      if (!isProduction) {
        console.error(`[Gemini API Fetch Error - ${model}]:`, err);
      }
    }
  }

  return NextResponse.json({ useFallback: true });
}
