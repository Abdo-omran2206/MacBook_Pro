import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple MacBook Pro | Next-Gen Performance",
  description:
    "Experience the ultimate power and elegance with the new MacBook Pro. Featuring M3 Max chip, Liquid Retina XDR display, and pro-level connectivity.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  keywords: [
    "Apple",
    "MacBook Pro",
    "M3 Max",
    "Next.js",
    "Three.js",
    "Web Development",
  ],
  authors: [{ name: "AkiraOmran" }],
  openGraph: {
    title: "Apple MacBook Pro | Next-Gen Performance",
    description:
      "Experience the power of the new MacBook Pro with immersive 3D visualization.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
