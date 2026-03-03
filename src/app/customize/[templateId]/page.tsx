"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { templates, styleOptions, colorPalettes } from "@/data/templates";
import { useAuth } from "@/context/AuthContext";

export default function CustomizePage() {
  const params = useParams();
  const router = useRouter();
  const { user, setShowAuthModal } = useAuth();
  const templateId = params.templateId as string;
  const template = templates.find((t) => t.id === templateId);

  const [prompt, setPrompt] = useState(template?.prompt || "");
  const [style, setStyle] = useState(styleOptions[0]);
  const [palette, setPalette] = useState(colorPalettes[0].name);
  const [imageUrl, setImageUrl] = useState(template?.imageUrl || "");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    try {
      const composedPrompt = `${prompt}, ${style} style, ${palette} color palette`;
      let body: Record<string, string> = { prompt: composedPrompt, style };

      if (uploadedPhoto) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(uploadedPhoto);
        });
        body = { ...body, imageBase64: base64 };
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch {
      // Show fallback on error
    } finally {
      setGenerating(false);
    }
  }, [prompt, style, palette, uploadedPhoto]);

  const handleSaveDesign = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/save-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          prompt,
          style,
          palette,
          imageUrl,
        }),
      });
      const data = await res.json();
      if (data.designId) {
        router.push("/gallery");
      }
    } catch {
      // handle error
    } finally {
      setSaving(false);
    }
  };

  const handleOrderPrint = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // First save design, then redirect to order
    setSaving(true);
    try {
      const res = await fetch("/api/save-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          prompt,
          style,
          palette,
          imageUrl,
        }),
      });
      const data = await res.json();
      if (data.designId) {
        router.push(`/order/${data.designId}`);
      }
    } catch {
      // handle error
    } finally {
      setSaving(false);
    }
  };

  if (!template) {
    return (
      <div className="pt-32 text-center">
        <h1 className="font-serif text-4xl">Template not found</h1>
        <p className="mt-4 text-foreground/60">The template you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Customize Your Art</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Panel - Preview */}
          <div>
            <div className="relative aspect-[3/4] bg-foreground/5 overflow-hidden">
              {generating ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 w-full p-8">
                    <div className="h-4 bg-foreground/10 animate-pulse" />
                    <div className="h-4 bg-foreground/10 animate-pulse w-3/4" />
                    <div className="h-64 bg-foreground/10 animate-pulse" />
                    <div className="h-4 bg-foreground/10 animate-pulse w-1/2" />
                  </div>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt="Art preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Right Panel - Controls */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Describe Your Scene
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Add a name, quote, or describe your ideal scene..."
                className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-accent"
              >
                {styleOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Color Palette
              </label>
              <div className="space-y-3">
                {colorPalettes.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPalette(p.name)}
                    className={`w-full flex items-center gap-3 p-3 border transition-colors ${
                      palette === p.name ? "border-accent" : "border-foreground/10"
                    }`}
                  >
                    <div className="flex gap-1">
                      {p.colors.map((c) => (
                        <div
                          key={c}
                          className="w-6 h-6"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Upload Photo (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadedPhoto(e.target.files?.[0] || null)}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-foreground file:text-background file:font-semibold file:text-sm hover:file:bg-accent file:cursor-pointer file:transition-colors"
              />
              {uploadedPhoto && (
                <p className="mt-2 text-xs text-foreground/60">
                  Selected: {uploadedPhoto.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt}
                className="w-full bg-accent text-background py-4 text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {generating ? "Generating..." : "Generate"}
              </button>
              <button
                onClick={handleSaveDesign}
                disabled={saving}
                className="w-full border border-foreground py-4 text-sm font-semibold hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Design"}
              </button>
              <button
                onClick={handleOrderPrint}
                disabled={saving}
                className="w-full bg-foreground text-background py-4 text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-50"
              >
                Order Print →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
