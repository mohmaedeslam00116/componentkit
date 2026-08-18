import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/hooks/useTheme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://mohmaedeslam00116.github.io/componentkit";

export const metadata: Metadata = {
  title: "ComponentKit — Beautiful UI Components",
  description:
    "A collection of 50+ accessible, customizable UI components. Copy-paste into your Next.js, React, or HTML project in seconds.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ComponentKit — Beautiful UI Components",
    description:
      "A collection of 50+ accessible, customizable UI components. Copy-paste into your Next.js, React, or HTML project in seconds.",
    url: SITE_URL,
    siteName: "ComponentKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComponentKit — Beautiful UI Components",
    description:
      "A collection of 50+ accessible, customizable UI components. Copy-paste into your Next.js, React, or HTML project in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
