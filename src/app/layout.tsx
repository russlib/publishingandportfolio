import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const overused = localFont({
  src: "./fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-overused",
  display: "swap",
  weight: "300 900",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Russell Bilinski | Mechanical Engineering Portfolio",
  description:
    "Actuator design, SolidWorks, Python, and physical testing — targeting robotics internships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${overused.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
