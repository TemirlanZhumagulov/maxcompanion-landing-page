"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bolt, Palette, Brain, ArrowRight, ChevronDown, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Page() {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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
      setSuccess(t("signup.success"));
      if (e.currentTarget) {
        e.currentTarget.reset();
      }
      // Show feedback modal after successful submission
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 500);
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
            <span className="font-semibold tracking-tight">{t("header.logo")}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="accent" size="sm" onClick={scrollToForm}>
              {t("header.joinWaitlist")}
            </Button>
          </div>
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
                {t("hero.title")} <span className="text-gradient">{t("hero.titleHighlight")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-4 text-white/70 md:text-lg"
              >
                {t("hero.subtitle")}
              </motion.p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0,255,209,0.3)",
                      "0 0 40px rgba(0,255,209,0.6)",
                      "0 0 20px rgba(0,255,209,0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Button variant="accent" size="lg" onClick={scrollToForm} className="relative overflow-hidden">
                    <motion.span
                      animate={{
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {t("hero.cta")}
                    </motion.span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Why Choose <span className="text-gradient">MaxCompanion</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-3"
        >
          <Card className="hover:translate-y-[-2px] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bolt className="h-5 w-5 text-[#00FFD1]" />
                {t("features.speed.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              {t("features.speed.description")}
            </CardContent>
          </Card>
          <Card className="hover:translate-y-[-2px] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#00FFD1]" />
                {t("features.integrity.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              {t("features.integrity.description")}
            </CardContent>
          </Card>
          <Card className="hover:translate-y-[-2px] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#00FFD1]" />
                {t("features.smartLibrary.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              {t("features.smartLibrary.description")}
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Workflow */}
      <section className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            <span className="text-gradient">Workflow</span> Transformation
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t("workflow.subtitle")}
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("workflow.old.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                {t("workflow.old.description")}
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
                <CardTitle>{t("workflow.new.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                {t("workflow.new.description")}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What <span className="text-gradient">Designers</span> Say
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>
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
                  "{t("testimonials.quote")}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Signup */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to <span className="text-gradient">Transform</span> Your Workflow?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t("signup.subtitle")}
          </p>
        </motion.div>
        <Card>
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="email">
                {t("signup.email")} <span className="text-red-400">{t("signup.emailRequired")}</span>
              </label>
              <Input id="email" name="email" type="email" placeholder={t("signup.emailPlaceholder")} required aria-required="true" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="whatsapp">
                {t("signup.whatsapp")}
              </label>
              <Input id="whatsapp" name="whatsapp" type="tel" placeholder={t("signup.whatsappPlaceholder")} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="telegram">
                {t("signup.telegram")}
              </label>
              <Input id="telegram" name="telegram" type="text" placeholder={t("signup.telegramPlaceholder")} />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/80" htmlFor="user_note">
                {t("signup.notes")}
              </label>
              <Textarea id="user_note" name="user_note" placeholder={t("signup.notesPlaceholder")} />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
              <div className="text-sm text-white/50" aria-live="polite">
                {success && <span className="text-[#00FFD1]">{success}</span>}
                {error && <span className="text-red-400">{error}</span>}
              </div>
              <Button type="submit" variant="accent" disabled={loading}>
                {loading ? t("signup.submitting") : t("signup.submit")}
              </Button>
            </div>
          </form>
        </Card>
        <p className="mt-3 text-xs text-white/40">{t("signup.privacy")}</p>
      </section>

       {/* Feedback Form */}
       <section className="container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {t("feedback.title").replace("MaxCompanion", "").trim()} <span className="text-gradient">MaxCompanion</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t("feedback.subtitle")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="overflow-hidden rounded-lg">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdCNiTeSQ6GUjniBYSNmm0oSRnHCN3HMSTPOxRU2rU_0YfQ2Q/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="MaxCompanion Feedback Form"
              >
                Loading…
              </iframe>              
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-white/50">{t("footer.copyright")}</p>
          <div className="flex gap-4 text-white/60">
            <a href="#" aria-label={t("footer.social.twitter")} className="hover:text-white">{t("footer.social.twitter")}</a>
            <a href="#" aria-label={t("footer.social.instagram")} className="hover:text-white">{t("footer.social.instagram")}</a>
            <a href="#" aria-label={t("footer.social.youtube")} className="hover:text-white">{t("footer.social.youtube")}</a>
          </div>
        </div>
      </footer>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl glass rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-white/70" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-3">
                {t("feedback.title").replace("MaxCompanion", "").trim()} <span className="text-gradient">MaxCompanion</span>
              </h3>
              <p className="text-white/70 text-lg">
                {t("feedback.subtitle")}
              </p>
            </div>

            <div className="mb-6">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdCNiTeSQ6GUjniBYSNmm0oSRnHCN3HMSTPOxRU2rU_0YfQ2Q/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full rounded-lg"
                title="MaxCompanion Feedback Form"
              >
                Loading…
              </iframe>
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant="accent"
                onClick={() => setShowFeedbackModal(false)}
                className="min-w-[120px]"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
