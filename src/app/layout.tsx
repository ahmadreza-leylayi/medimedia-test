import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/providers/ReduxProvider";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Medimedia",
  description: "Medimedia - پلتفرم خدمات پزشکی آنلاین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ReduxProvider>
          <Header />
          
          {children}
          
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
