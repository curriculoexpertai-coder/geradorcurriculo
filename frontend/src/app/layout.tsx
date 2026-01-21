import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CurriculoExpert | Crie Currículos com IA em Segundos",
  description: "Destaque-se no mercado com currículos, cartas de apresentação e análises de vagas potencializados por Inteligência Artificial (Gemini Pro). Otimizado para ATS.",
  keywords: ["currículo", "ia", "gerador de currículo", "cover letter", "análise de vaga", "emprego", "carreira", "ats"],
  authors: [{ name: "CurriculoExpert Team" }],
  openGraph: {
    title: "CurriculoExpert | Seu Próximo Emprego Começa Aqui",
    description: "Use IA avançada para criar currículos e cartas de apresentação que passam nos filtros dos recrutadores.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CurriculoExpert AI",
    description: "Crie currículos de alto impacto com IA.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased selection:bg-blue-500/30`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
