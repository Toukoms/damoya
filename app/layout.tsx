import { Toaster, WhatsAppButton } from "@/src/shared/ui";
import "@app/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { OrderProvider } from "@entities/order";
import { Footer, Header } from "@widgets/root-layout";
import type { Metadata } from "next";
import { Merriweather, Montserrat, Source_Code_Pro } from "next/font/google";

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Merriweather({
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const mono = Source_Code_Pro({
  variable: "--font-mono",
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
      <html lang="fr" className="dark">
        <body
          className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground font-sans`}
        >
          <OrderProvider>
            <Header className="px-2 md:px-4 lg:px-8" />
            <main className="grow">{children}</main>
            <Footer className="px-2 md:px-4 lg:px-8" />
            <WhatsAppButton />
            <Toaster position="top-center" />
          </OrderProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
