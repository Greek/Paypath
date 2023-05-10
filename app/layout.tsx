import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContext } from "./AuthContext";
import { ThemeProvider } from "@/components/themes-provider";
import { QueryContext } from "./QueryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s - Paypath",
    default: "Paypath"
  },
  description: "Sell access to your Discord server with Paypath.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-screen md:h-full`}>
        <QueryContext>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthContext>{children}</AuthContext>
          </ThemeProvider>
        </QueryContext>
      </body>
    </html>
  );
}
