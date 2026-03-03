"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface SavedDesign {
  id: string;
  template_id: string;
  prompt: string;
  style: string;
  palette: string;
  image_url: string;
  created_at: string;
}

export default function GalleryPage() {
  const { user, loading: authLoading, setShowAuthModal } = useAuth();
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      setShowAuthModal(true);
    }
  }, [user, authLoading, setShowAuthModal]);

  useEffect(() => {
    if (user) {
      // For demo, show empty state
      setDesigns([]);
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (designId: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== designId));
  };

  if (authLoading) {
    return (
      <div className="pt-32 max-w-7xl mx-auto px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-foreground/10 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-foreground/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <h1 className="font-serif text-4xl mb-4">Sign in to view your gallery</h1>
        <p className="text-foreground/60 mb-6">
          Save and manage your AI art designs.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-foreground text-background px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-4xl md:text-5xl">My Gallery</h1>
          <Link
            href="/"
            className="bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
          >
            + New Design
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-foreground/10 animate-pulse" />
            ))}
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-foreground/60 text-lg mb-6">
              No saved designs yet. Start creating!
            </p>
            <Link
              href="/"
              className="inline-block bg-foreground text-background px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {designs.map((design) => (
              <div key={design.id} className="group">
                <div className="relative aspect-[3/4] bg-foreground/5 overflow-hidden">
                  <img
                    src={design.image_url}
                    alt={design.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Link
                      href={`/customize/${design.template_id}`}
                      className="bg-background text-foreground px-4 py-2 text-xs font-semibold hover:bg-accent hover:text-background transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/order/${design.id}`}
                      className="bg-accent text-background px-4 py-2 text-xs font-semibold hover:bg-accent-hover transition-colors"
                    >
                      Order
                    </Link>
                    <button
                      onClick={() => handleDelete(design.id)}
                      className="bg-red-600 text-white px-4 py-2 text-xs font-semibold hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium truncate">{design.prompt}</p>
                  <p className="text-xs text-foreground/60">{design.style}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
