"use client";

import { Template } from "@/data/templates";
import Link from "next/link";

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <Link href={`/customize/${template.id}`} className="group block">
      <div className="relative overflow-hidden bg-foreground/5 aspect-[3/4]">
        <img
          src={template.imageUrl}
          alt={template.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-block bg-accent text-background px-3 py-1 text-xs font-semibold mb-2">
            {template.category}
          </span>
          <h3 className="text-background font-serif text-xl">{template.title}</h3>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-sm">{template.title}</h3>
          <p className="text-xs text-foreground/60">{template.category}</p>
        </div>
        <span className="text-xs font-semibold bg-foreground text-background px-3 py-1.5 group-hover:bg-accent transition-colors">
          Customize
        </span>
      </div>
    </Link>
  );
}
