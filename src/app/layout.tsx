import type { Metadata } from "next";
import { Space_Grotesk, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { NetworkSwitcher } from "@/components/network-switcher";
import { SplashScreen } from "@/components/splash-screen";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TimeLock Contacts - Send Messages to the Future",
  description: "Send messages, files, and crypto into the future. Time capsules, digital wills, and scheduled crypto transfers on blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${karla.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <SplashScreen />
        <Providers>
          <Navbar />
          <NetworkSwitcher />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Toaster position="top-right" richColors />
        </Providers>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}