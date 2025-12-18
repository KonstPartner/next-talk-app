import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { QueryProvider } from '@features/layout/model';
import { ToastProvider } from '@features/shared/ui';
import { Header } from '@entities/header';
import { Footer } from '@entities/layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextTalk',
  description: 'Posts & Comments',

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="bg-background text-foreground flex min-h-screen flex-col items-center">
            <Header />
            <main className="flex w-full grow py-3">{children}</main>
            <Footer />
          </div>
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
