"use client";

import { useState } from "react";
import { ResponsiveHeroImage } from "@/components/responsive-hero-image";

const quotes = [
  {
    quote:
      "After drinking the liver detox tea for a month, my energy levels improved noticeably. No more afternoon sluggishness.",
    name: "Minh Anh",
    role: "Trà Cà Gai Leo Rau Má TDG customer",
  },
  {
    quote:
      "I have struggled with sleep for years. The passionflower tea helps me fall asleep faster and wake up refreshed.",
    name: "Tran Huu Binh",
    role: "Trà Đinh Lăng Lạc Tiên TDG customer",
  },
  {
    quote:
      "My blood sugar readings have stabilized since I started drinking the guava leaf tea daily. It is now part of my morning routine.",
    name: "Le Thi Huong",
    role: "Trà Búp Ổi Thìa Canh TDG customer",
  },
];

export function TestimonialsSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="about" className="bg-background">
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="text-xs uppercase tracking-widest text-muted-foreground text-center">
          Loved by the community
        </p>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {quotes.map((item) => (
            <blockquote key={item.name}>
              <p className="text-lg leading-relaxed text-foreground md:text-xl">“{item.quote}”</p>
              <footer className="mt-6 text-sm text-muted-foreground">
                <span className="block text-foreground font-medium">{item.name}</span>
                {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <ResponsiveHeroImage alt="Misty highland herb garden at dawn" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div id="reserve" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Come visit</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-5xl">
            Book a tasting
          </h2>
          <p className="mt-4 text-muted-foreground">
            Come visit our tea space. This form currently simulates a successful request — we will
            confirm your appointment by email.
          </p>

          {submitted ? (
            <p className="mt-10 rounded-2xl border border-border px-6 py-8 text-foreground">
              Request received. Thank you — our team will be in touch to confirm your appointment.
            </p>
          ) : (
            <form
              className="mt-10 space-y-4 text-left"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-foreground"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-foreground"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  What would you like to experience?
                </span>
                <textarea
                  name="note"
                  rows={3}
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-foreground"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
              >
                Request a visit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
