import "./globals.css";

export const metadata = {
  title: "Painel de Vagas",
  description: "Sistema de gestão de vagas com Next.js, Prisma e Neon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
