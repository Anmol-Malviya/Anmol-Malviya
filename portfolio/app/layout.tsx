import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anmol Malviya — Founder & Product Builder",
  description: "I build technology products at the intersection of AI, engineering, and real-world problems.",
  metadataBase: new URL("https://github.com/Anmol-Malviya"),
  openGraph: {
    title: "Anmol Malviya — Founder & Product Builder",
    description: "Building products. Solving real problems. Creating what's next.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}