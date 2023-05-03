import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContext } from "./AuthContext";
import { ThemeProvider } from "@/components/themes-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContext>{children}</AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
