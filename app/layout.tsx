import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import NetworkBackground from "./components/NetworkBackground";
import PageGate from "./components/PageGate";
import ContactWidget from "./components/ContactWidget";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "I'm Resty",
  description: "My Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <PageGate>
          <NetworkBackground />
          <CustomCursor />
          <ContactWidget />
          {children}
        </PageGate>
      </body>
    </html>
  );
}
