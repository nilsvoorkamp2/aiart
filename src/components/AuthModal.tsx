"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, signIn, signUp, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      setShowAuthModal(false);
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      <div className="bg-background w-full max-w-md p-8 relative">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground text-xl"
        >
          ✕
        </button>
        <h2 className="font-serif text-3xl mb-6">{isSignUp ? "Create Account" : "Welcome Back"}</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background py-3 text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-foreground/20" />
          <span className="text-sm text-foreground/60">or</span>
          <div className="flex-1 h-px bg-foreground/20" />
        </div>

        <button
          onClick={() => signInWithGoogle()}
          className="w-full border border-foreground/20 py-3 text-sm font-semibold hover:bg-foreground/5 transition-colors"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-foreground/60">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-accent font-medium hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
