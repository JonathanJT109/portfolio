import Header from "@/components/Header";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weights: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased h-screen flex flex-col overflow-hidden`}
      >
        <Header />
        <main className="flex-1 min-h-0 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
