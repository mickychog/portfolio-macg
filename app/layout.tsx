import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "mickychog.is-a.dev";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const siteUrl = `${protocol}://${host}`;
  const title = "Miguel Angel Choque Garcia | Full Stack Developer & Engineer";
  const description = "Portafolio de Miguel Angel Choque Garcia, desarrollador Full Stack e ingeniero especializado en frontend, backend, cloud, DevOps e inteligencia artificial.";
  return {
    metadataBase: new URL(siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`),
    title,
    description,
    authors: [{ name: "Miguel Angel Choque Garcia", url: "https://mickychog.is-a.dev" }],
    creator: "Miguel Angel Choque Garcia",
    keywords: ["Full Stack", "Software Engineer", "React", "Next.js", "TypeScript", "NestJS", "Spring Boot", "DevOps", "AI", "Bolivia"],
    alternates: {
      canonical: "/",
    },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Miguel Angel Choque Garcia — Portafolio",
      type: "website",
      images: [{ url: "/og.png", width: 1731, height: 909, alt: "Miguel Angel Choque Garcia — Full Stack Developer" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const s=localStorage.getItem('portfolio-theme');const t=s||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch{}`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
