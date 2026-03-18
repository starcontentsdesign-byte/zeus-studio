import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEUS Studio",
  description: "Recording studio, localization, sound production and dubbing."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
