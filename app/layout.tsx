import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PATRONO — Barbearia",
  description:
    "PATRONO Barbearia. Pra homem que não complica. Corte, barba e cuidados masculinos. Agende seu horário.",
  openGraph: {
    title: "PATRONO — Barbearia",
    description:
      "Pra homem que não complica. Corte, barba e cuidados masculinos. Agende seu horário.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600&family=Oswald:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
