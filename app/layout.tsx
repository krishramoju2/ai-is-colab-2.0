// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Multi-Career GPT Terminal',
  description: 'Interact with specialized AI bots across cybersecurity, space, finance, and oceanic domains.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Multi-Career GPT Terminal',
    description: 'Smart multi-domain assistant powered by specialized bots with AI reasoning.',
    type: 'website',
    url: 'https://your-domain.com',
    images: ['/preview.png']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SSR-safe font fallback (client will override via localStorage)
  const fallbackFont = 'font-roboto';

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${fallbackFont} bg-gray-900 text-white font-sans transition-all duration-300`}
        suppressHydrationWarning={true} // avoids hydration mismatch due to dynamic fonts
      >
        {children}
      </body>
    </html>
  );
}

