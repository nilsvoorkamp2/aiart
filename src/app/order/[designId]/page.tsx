"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { frameSizes, frameStyles } from "@/data/templates";
import { useAuth } from "@/context/AuthContext";

interface Design {
  id: string;
  image_url: string;
  prompt: string;
  style: string;
}

export default function OrderPage() {
  const params = useParams();
  const { user, setShowAuthModal } = useAuth();
  const designId = params.designId as string;

  const [design, setDesign] = useState<Design | null>(null);
  const [frameStyle, setFrameStyle] = useState(frameStyles[0].value);
  const [size, setSize] = useState(frameSizes[0].value);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    // For demo, create a placeholder design
    setDesign({
      id: designId,
      image_url: "/samples/abstract-01.svg",
      prompt: "Custom design",
      style: "Watercolor",
    });
    setLoading(false);
  }, [designId]);

  const selectedSize = frameSizes.find((s) => s.value === size) || frameSizes[0];
  const selectedFrame = frameStyles.find((f) => f.value === frameStyle) || frameStyles[0];
  const totalPrice = selectedSize.price + selectedFrame.priceAdd;

  const handleOrder = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setOrdering(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designId,
          frameStyle,
          size,
          price: totalPrice,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // handle error
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 max-w-7xl mx-auto px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-foreground/10 w-64" />
          <div className="h-96 bg-foreground/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-10">Order Your Print</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Art Preview */}
          <div>
            <div className="relative aspect-[3/4] bg-foreground/5 overflow-hidden border-8 border-foreground/80 shadow-2xl">
              <img
                src={design?.image_url}
                alt="Your art"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-foreground/60 text-center">
              {design?.prompt} — {design?.style}
            </p>
          </div>

          {/* Order Options */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold mb-4 uppercase tracking-wide">
                Frame Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {frameStyles.map((frame) => (
                  <button
                    key={frame.value}
                    onClick={() => setFrameStyle(frame.value)}
                    className={`p-4 border text-center transition-colors ${
                      frameStyle === frame.value
                        ? "border-accent bg-accent/5"
                        : "border-foreground/10 hover:border-foreground/30"
                    }`}
                  >
                    <div
                      className="w-12 h-12 mx-auto mb-2 border-4"
                      style={{
                        borderColor:
                          frame.value === "black"
                            ? "#111"
                            : frame.value === "white"
                            ? "#eee"
                            : "#C4A35A",
                        backgroundColor: "#F5F5F0",
                      }}
                    />
                    <span className="text-sm font-medium">{frame.label}</span>
                    {frame.priceAdd > 0 && (
                      <p className="text-xs text-foreground/60">+${frame.priceAdd}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-4 uppercase tracking-wide">
                Print Size
              </label>
              <div className="space-y-3">
                {frameSizes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSize(s.value)}
                    className={`w-full flex items-center justify-between p-4 border transition-colors ${
                      size === s.value
                        ? "border-accent bg-accent/5"
                        : "border-foreground/10 hover:border-foreground/30"
                    }`}
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="font-semibold">${s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-3xl font-serif">${totalPrice}</span>
              </div>
              <button
                onClick={handleOrder}
                disabled={ordering}
                className="w-full bg-foreground text-background py-4 text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-50"
              >
                {ordering ? "Processing..." : `Order Now — $${totalPrice}`}
              </button>
              <p className="mt-3 text-xs text-foreground/40 text-center">
                Free shipping • 30-day returns • Stripe secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
