"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Loader } from "./components/Loader/Loader";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${josefin.variable}`}
    >
      <body>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


// const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
//   const {isLoading} = useLoadUserQuery({});
//   return (
//     <>
//     {
//       isLoading ? <Loader /> : <>{children} </>
//     }
//     </>
//   )
// }

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  const { isLoading } = useLoadUserQuery(undefined, { skip: !mounted });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};