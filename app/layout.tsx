import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ReactQueryProvider from '@/providers/ReactQueryProvider';

import { SideBar } from '@/components/SideBar';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Movie Database - Discover Movies & TV Shows',
  description:
    'Explore a vast collection of movies and TV shows with ratings, reviews, trailers, and more. Stay updated with trending films, top-rated series, and the latest releases.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SideBar />
        <div>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
