import type { Metadata } from "next";
import { Karla, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import LoadingOverlay from "@/components/LoadingOverlay";


const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lets build Your Ideas",
  description:
    "Are you looking for professional Developer to Elevate your business?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} ${karla.variable}`}>
          <LoadingOverlay/>
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}
