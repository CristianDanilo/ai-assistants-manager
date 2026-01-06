import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin']});

export const metadata: Metadata = {
  title: 'IA Assistant Manager',
  description: 'Gestiona tus asistentes de IA de forma eficiente',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <header className='bg-wh border-b border-slate-200 py-4 px-6'>
          <div className='max-2-7xl mx-auto flex justify-between items-center'>
            <h1 className='text-xl font-bold text-indigo-600'>Funnelhot AI</h1>
            <nav className='text-sm text-slate-500'>Gestión de Asistentes</nav>
          </div>
        </header>
        <main className='w-full max-auto p-4 md:p-8'>{children}</main>
      </body>
    </html>
  );
}
