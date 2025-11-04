import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MaxCompanion – Merge 3D Assets Instantly",
  description:
    "Smart desktop companion for 3ds Max designers. Import assets with materials intact in one click.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MaxCompanion – Merge 3D Assets Instantly",
    description:
      "Smart desktop companion for 3ds Max designers. Import assets with materials intact in one click.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MaxCompanion Preview",
      },
    ],
  },
  metadataBase: new URL("https://maxcompanion.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}




