import { Geist, Geist_Mono } from "next/font/google";
import ThemeWrapper from "@/components/ThemeToggle/ThemeWrapper";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Share ME",
  description: "ShareMe - is a minimalistic, no-signup-needed web app to instantly share text, links, images, and documents with just a 4-digit code! No login. No fuss. Just pure, simple sharing 🔄",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeWrapper>
          <ThemeToggle />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
