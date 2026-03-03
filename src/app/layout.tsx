import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ArtDrop — AI Art for Your Walls",
  description:
    "Design personalized AI art for home decor and gifting. Browse templates, customize styles, and order framed prints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <AuthProvider>
          <Navbar />
          <AuthModal />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
