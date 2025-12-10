import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitApp - Votre Coach Fitness Personnel",
  description: "Application de fitness avec essai gratuit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
