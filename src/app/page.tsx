"use client";

import { useState } from "react";
import { templates, Template } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";

const categories = ["All", "Abstract", "Portrait", "Nature", "Minimal", "Retro"] as const;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered: Template[] =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl">
          Art Made for
          <br />
          <span className="text-accent">Your Walls</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-xl">
          Design personalized AI art. Choose a style, customize it, and get a framed print
          delivered to your door.
        </p>
        <a
          href="#browse"
          className="inline-block mt-8 bg-foreground text-background px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors"
        >
          Design Your Art
        </a>
      </section>

      {/* Browse Section */}
      <section id="browse" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl md:text-4xl">Templates</h2>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((template) => (
            <div key={template.id} className="break-inside-avoid">
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
