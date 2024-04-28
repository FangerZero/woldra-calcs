import type { Metadata } from "next";
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";

import { PaymentsOutlined, AccountBalanceWalletOutlined, HomeOutlined } from '@mui/icons-material';

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
      <body className={inter.className}>
        <div className="m-2 mt-4 flex justify-center px-4 lg:px-24">
          <Link href="/" className="rounded border-black border-2 p-2 pr-4 m-1"><HomeOutlined className="mx-2"/>Home</Link>
          <Link href="/bill-splitter" className="rounded border-black border-2 p-2 pr-4 m-1"><PaymentsOutlined className="mx-2"/> Bill Splitter</Link>
          <Link href="/budget-rater" className="rounded border-black border-2 p-2 pr-4 m-1"><AccountBalanceWalletOutlined className="mx-2"/>Budget Rater</Link>
        </div>
      <div className="m-2 mt-4 flex justify-center px-4 lg:px-24">
      {children}
      </div>
      </body>
    </html>
  );
}
