// TODO: Add logo
import Header from "@/components/Header";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weights: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {/* <StairTransition /> */}
        {/* Include Page Transition?  */}
        {/* <PageTransition> */}
        {children}
        {/* </PageTransition> */}
      </body>
    </html>
  );
}
