import { Footer, Header } from "@shared/layout";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Damoya Traiteur",
  description: "L’Excellence de la Gastronomie Cacher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" className="light">
        <body
          className={`${playfair.variable} ${inter.variable} antialiased flex flex-col min-h-screen bg-background text-foreground font-sans`}
        >
          <Header className="px-2 md:px-4 lg:px-8" />
          <main className="grow">{children}</main>
          <Footer className="px-2 md:px-4 lg:px-8" />
        </body>
      </html>
    </ClerkProvider>
  );
}
