import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { QueryProvider } from '@features/layout/model';
import { ToastProvider } from '@features/shared/ui';
import { Header } from '@entities/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Next app',
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
            <main className="flex w-full grow">{children}</main>
            <footer></footer>
          </div>
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
