import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import { ModeToggle } from "@/components/theme-toggle";
import { AppProvider } from "@/context/AppContext";
import { ModeToggle } from "@/components/theme-toggle";

const montserrat = localFont({
  src: "./fonts/Montserrat.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Campus-Cue",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <div className="fixed bottom-3 right-3">
              <ModeToggle/>
            </div>
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
