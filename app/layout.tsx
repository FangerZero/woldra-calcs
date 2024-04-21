import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Woldra Calculators",
  description: "Ad induced calculators created for you to help with financial situations. These calculators are for informational purposes only, and should not be used as financial advice. By using these calculators you understand that you do cannot hold the creators responsible for your own financial decisions. Please consult a financial advisor for such decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
