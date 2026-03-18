import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  Libre_Bodoni,
  Noto_Sans_KR,
  Noto_Serif_KR,
} from "next/font/google";

import "./styles/tailwind.css";
import "./styles/theme.css";
import Providers from "./providers";
import { BRAND_NAME } from "@/utils/branding";

const sansFont = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
});

const displayFont = Libre_Bodoni({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

const displayKrFont = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-display-kr",
  weight: ["500", "600", "700"],
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: BRAND_NAME,
  description: `${BRAND_NAME}는 스튜디오 게시물, 커뮤니티, 관리자 기능을 함께 운영하는 아카이브 플랫폼입니다.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${sansFont.variable} ${displayFont.variable} ${displayKrFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
