/**
 * Root Layout
 * 
 * Main application layout.
 * Includes font configuration, metadata and base HTML structure.
 */

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.scss";
import { Header, Footer } from "@/components";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Light, Regular, Medium, Bold
  display: "swap", // Mejora la performance de carga
});

export const metadata: Metadata = {
  title: "Descubre Boyacá - What to do in Boyacá",
  description: "Find activities, events and places in Boyacá. Plan your visit or discover something new near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${roboto.variable} antialiased flex min-h-screen flex-col`}
      >
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
