import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Order Confirmed</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Your custom art print is being prepared. You&apos;ll receive an email confirmation with
          tracking details shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/gallery"
            className="bg-foreground text-background px-8 py-4 text-sm font-semibold hover:bg-accent transition-colors"
          >
            View My Gallery
          </Link>
          <Link
            href="/"
            className="border border-foreground px-8 py-4 text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            Browse More Art
          </Link>
        </div>
      </div>
    </div>
  );
}
