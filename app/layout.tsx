import "./globals.css";
import { Inter } from "next/font/google";
import ChatWrapper from "../components/chatWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Optimus Primark",
  description: "AI Generated Product Recommondations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full`}>
        <div className="relative top-4 w-full flex">
          <ChatWrapper />
        </div>
        {children}
      </body>
    </html>
  );
}
