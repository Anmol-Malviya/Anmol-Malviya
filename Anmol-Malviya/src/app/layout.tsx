import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Anmol Malviya | Full-Stack Developer & Product Builder",
  description:
    "Explore Anmol Malviya's portfolio — full-stack developer, project manager, AI enthusiast, and technology product builder based in Indore, India.",
  openGraph: {
    title: "Anmol Malviya | Full-Stack Developer & Product Builder",
    description:
      "Explore Anmol Malviya's portfolio — full-stack developer, project manager, AI enthusiast, and technology product builder based in Indore, India.",
    type: "website",
    locale: "en_US",
    siteName: "Anmol Malviya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anmol Malviya | Full-Stack Developer & Product Builder",
    description:
      "Explore Anmol Malviya's portfolio — full-stack developer, project manager, AI enthusiast, and technology product builder based in Indore, India.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-[#FFFCF8] text-[#4B4B4B] antialiased selection:bg-[#FFE0C2] selection:text-[#4B4B4B]">
        {children}
      </body>
    </html>
  );
}
