import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { EditProvider } from "@/components/edit/edit-context";

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
  metadataBase: new URL("https://www.russlib.ca"),
  title: {
    default: "Russell Bilinski | Mechanical Engineering Portfolio",
    template: "%s | Russell Bilinski",
  },
  description:
    "Mechanical engineering student at the University of Victoria and Performance Manager for UVic Formula Student. Prior Tesla battery pack mechanical engineering internship, with published work in physical testing and first-principles analysis.",
  alternates: { canonical: "/" },
  authors: [{ name: "Russell Bilinski" }],
  creator: "Russell Bilinski",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "Russell Bilinski Engineering Portfolio",
    title: "Russell Bilinski | Mechanical Engineering Portfolio",
    description:
      "Mechanical engineering student at the University of Victoria and Performance Manager for UVic Formula Student.",
    images: [
      {
        url: "/me/driver-wide.jpg",
        alt: "Russell Bilinski in a formula-style race car",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Russell Bilinski | Mechanical Engineering Portfolio",
    description:
      "Mechanical engineering student at the University of Victoria and Performance Manager for UVic Formula Student.",
    images: ["/me/driver-wide.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <EditProvider>{children}</EditProvider>
      </body>
    </html>
  );
}
