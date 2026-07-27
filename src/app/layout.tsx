import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import UTMCapture from "@/components/UTMCapture";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Plus: Luxury Dating, Subtly Done",
  description: "Sugar dating done right. Verified profiles, real privacy, $99.99/month vs Seeking's $274.99. Free for attractive members. The modern alternative to Seeking Arrangement.",
  keywords: "sugar dating, luxury dating app, seeking arrangement alternative, upscale dating, arrangement dating, wealthy dating, elite dating",
  openGraph: {
    title: "Plus: Luxury Dating, Subtly Done",
    description: "Verified profiles. Real privacy. Free for attractive members. The modern alternative to Seeking.",
    url: "https://meetyourplus.com",
    siteName: "Plus",
    type: "website",
    images: [{ url: "https://meetyourplus.com/og-image.png", width: 1200, height: 630, alt: "Plus: Luxury Dating, Subtly Done" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plus: Luxury Dating, Subtly Done",
    description: "Verified profiles. Real privacy. Free for attractive members. The modern alternative to Seeking.",
    images: ["https://meetyourplus.com/twitter-card.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://meetyourplus.com",
    languages: {
      en: "https://meetyourplus.com",
      es: "https://meetyourplus.com/es/blog",
      pt: "https://meetyourplus.com/pt/blog",
      tr: "https://meetyourplus.com/tr/blog",
      "x-default": "https://meetyourplus.com",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Plus",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#141210",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* GA4 — loads with consent denied; CookieConsent component upgrades on acceptance */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JF6T2QL8EL" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});gtag('js',new Date());gtag('config','G-JF6T2QL8EL');
// Restore consent if previously accepted
if(localStorage.getItem('cookie_consent')==='accepted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted'})}
// Web Vitals reporting to GA4
if(!sessionStorage.getItem('landing_page')){sessionStorage.setItem('landing_page',window.location.pathname)}
if('PerformanceObserver' in window){try{new PerformanceObserver(function(l){l.getEntries().forEach(function(e){gtag('event',e.name,{value:Math.round(e.name==='CLS'?e.value*1000:e.value),event_category:'Web Vitals',event_label:e.id,non_interaction:true})})}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(function(l){l.getEntries().forEach(function(e){gtag('event','CLS',{value:Math.round(e.value*1000),event_category:'Web Vitals',non_interaction:true})})}).observe({type:'layout-shift',buffered:true})}catch(e){}}` }} />
        {/* Meta Pixel, Google Ads, and Clarity are loaded dynamically by CookieConsent component after user consent */}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Suspense><UTMCapture /></Suspense>
        <ErrorBoundary>{children}</ErrorBoundary>
        <CookieConsent />
      </body>
    </html>
  );
}
