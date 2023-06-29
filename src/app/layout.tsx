import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContext } from "./AuthContext";
import { ThemeProvider } from "@/components/themes-provider";
import { QueryContext } from "./QueryContext";
import { APP_NAME, WEBSITE_URL } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  openGraph: {
    title: `Monitize your communities and resources on ${APP_NAME}.`,
    description:
      "Sell access to your Discord server with Paypath, the prime platform to sell access to your communities and resources. Easy to use, free for everyone, for life.",
    siteName: `${APP_NAME}`,
    url: `${WEBSITE_URL}`,
    locale: "en_US",
    type: "website",
  },
  title: {
    template: `%s · ${APP_NAME}`,
    default: `Paypath`,
  },
  creator: APP_NAME,
  description:
    "Sell access to your Discord server with Paypath, the prime platform to sell access to your communities and resources. Easy to use, free for everyone, for life.",
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
