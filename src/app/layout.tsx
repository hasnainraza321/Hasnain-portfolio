import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LayeredWaveDivider, sectionSurface } from "@/components/ui/LayeredWaveDivider";
import { ThemeProvider } from "@/context/ThemeContext";
import { getProductionSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = getProductionSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon" }],
    apple: [{ url: "/apple-icon" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050811" },
    { media: "(prefers-color-scheme: light)", color: "#F2E9D8" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Inline Anti-FOUC script.
 * Synchronously reads the user's stored preference from localStorage before first paint.
 * Defaults to "dark" mode to preserve the original visual experience.
 */
const antiFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

/**
 * Structured Data (JSON-LD) for Search Engines.
 * Safely adheres to strict governance:
 * - Emits Person, WebSite, and WebPage schemas.
 * - Strictly omits LocalBusiness, physical address, ratings, or fake coordinates.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.name,
      jobTitle: siteConfig.author.role,
      description: siteConfig.description,
      url: siteUrl,
      sameAs: [
        siteConfig.author.linkedin,
        siteConfig.author.github,
        siteConfig.author.instagram,
      ],
      knowsAbout: [
        "Agentic AI",
        "Artificial Intelligence",
        "AI Voice Agent Automation",
        "Retell AI",
        "N8N Automation",
        "Next.js",
        "React",
        "TypeScript",
        "Python",
        "Workflow Automation",
        "API Integration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${siteConfig.name} Portfolio`,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteConfig.title,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      description: siteConfig.description,
      inLanguage: "en-US",
    },
  ],
};

const sanitizedJsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: antiFlashScript,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizedJsonLd,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-[#F2E9D8] text-[#171717] dark:bg-[#050811] dark:text-cream antialiased selection:bg-[#E87527] selection:text-white dark:selection:bg-sky-400 dark:selection:text-[#050811] transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#E87527] dark:focus:bg-sky-400 focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:font-bold focus:text-white dark:focus:text-[#050811] focus:shadow-[0_0_24px_rgba(232,117,39,0.5)] dark:focus:shadow-[0_0_24px_rgba(56,189,248,0.6)]"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <LayeredWaveDivider
            size="footer"
            flip
            from={sectionSurface.raised}
            to={sectionSurface.footer}
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
