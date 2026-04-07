import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meu Blog",
  description: "Blog profissional com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}