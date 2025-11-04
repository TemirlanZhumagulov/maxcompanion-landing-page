"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bolt, Palette, Brain, ArrowRight, ChevronDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const particleStyles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: 0.15 + Math.random() * 0.3,
    }));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();
    const telegram = String(data.get("telegram") || "").trim();
    const user_note = String(data.get("user_note") || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, whatsapp, telegram, user_note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setSuccess("You're on the list! We'll be in touch soon.");
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0C10]/60 backdrop-blur supports-[backdrop-filter]:bg-[#0B0C10]/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="MaxCompanion Logo" 
              className="h-8 w-8 rounded-sm object-contain"
            />
            <span className="font-semibold tracking-tight">MaxCompanion</span>
          </div>
          <Button variant="accent" size="sm" onClick={scrollToForm}>
            Join Waitlist
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 min-h-[calc(100vh-4rem)]">
        <div className="pointer-events-none absolute inset-0">
          {/* gradient blur */}
          <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,209,0.25),rgba(0,119,255,0.1)_60%,transparent_70%)] blur-3xl" />
          {/* subtle particles */}
          {particleStyles.map((s, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={s as any}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="container relative z-10 h-full flex items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold tracking-tight md:text-6xl"
              >
                Merge 3D Assets <span className="text-gradient">Instantly</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-4 text-white/70 md:text-lg"
              >
                No more manual extraction or re-linking — one click, done.
              </motion.p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Button variant="accent" size="lg" onClick={scrollToForm}>
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Video Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[90%] mx-auto"
            >
              <div className="glass rounded-2xl p-2">
                <video
                  className="h-auto w-full rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="MaxCompanion demo video showing 3D asset import workflow"
                >
                  <source 
                    src="/20251017_2110_New Video_simple_compose_01k7sez6xkeh8rzabndbgrtc3x.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <ChevronDown className="h-6 w-6 text-white/40" aria-hidden />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-3"
        >
          <Card className="hover:translate-y-[-2px] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bolt className="h-5 w-5 text-[#00FFD1]" />
                Speed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Import in seconds and keep your creative flow uninterrupted.
            </CardContent>
          </Card>
          <Card className="hover:translate-y-[-2px] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#00FFD1]" />
                Integrity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Materials and textures preserved perfectly — no relinking hassles.
            </CardContent>
          </Card>
          <Card className="hover:translate-y-[-2px] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#00FFD1]" />
                Smart Library
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Organize, search, and insert assets effortlessly across projects.
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Workflow */}
      <section className="container py-8 md:py-12">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-6 text-2xl font-semibold tracking-tight"
        >
          Workflow
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Old Workflow</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                Manual extraction, relinking textures, broken materials, endless folders.
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>With MaxCompanion</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                One-click import with materials intact, organized libraries, consistent scenes.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-6 text-2xl font-semibold tracking-tight"
        >
          Designers love the speed
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Card className="flex items-center gap-4 p-5">
                <img
                  src={`https://i.pravatar.cc/80?img=${i + 10}`}
                  alt="Designer avatar"
                  className="h-12 w-12 rounded-full border border-white/10"
                />
                <p className="text-white/80">
                  “MaxCompanion cuts my asset setup time dramatically. It just works.”
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Signup */}
      <section className="container py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-6 text-2xl font-semibold tracking-tight"
        >
          Join the Waitlist
        </motion.h2>
        <Card>
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">
                Email <span className="text-red-400">*</span>
              </label>
              <Input id="email" name="email" type="email" placeholder="you@studio.com" required aria-required="true" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="whatsapp">
                WhatsApp
              </label>
              <Input id="whatsapp" name="whatsapp" type="tel" placeholder="+1 555 123 4567" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="telegram">
                Telegram
              </label>
              <Input id="telegram" name="telegram" type="text" placeholder="@yourhandle" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="user_note">
                Notes
              </label>
              <Textarea id="user_note" name="user_note" placeholder="Your use-case or tools (e.g. Corona, V-Ray)" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
              <div className="text-sm text-white/50" aria-live="polite">
                {success && <span className="text-[#00FFD1]">{success}</span>}
                {error && <span className="text-red-400">{error}</span>}
              </div>
              <Button type="submit" variant="accent" disabled={loading}>
                {loading ? "Submitting..." : "Join Waitlist"}
              </Button>
            </div>
          </form>
        </Card>
        <p className="mt-3 text-xs text-white/40">Protected by Supabase. We never share your info.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-white/50">© 2025 MaxCompanion</p>
          <div className="flex gap-4 text-white/60">
            <a href="#" aria-label="Twitter" className="hover:text-white">Twitter</a>
            <a href="#" aria-label="Instagram" className="hover:text-white">Instagram</a>
            <a href="#" aria-label="YouTube" className="hover:text-white">YouTube</a>
          </div>
        </div>
      </footer>
    </main>
  );
}


