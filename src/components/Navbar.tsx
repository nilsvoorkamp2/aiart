"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, signOut, setShowAuthModal } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          ArtDrop
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
            Browse
          </Link>
          {user ? (
            <>
              <Link
                href="/gallery"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                My Gallery
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-foreground text-background px-5 py-2 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
