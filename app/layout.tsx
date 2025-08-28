import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelify = Pixelify_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pinit",
    description: "Um gerenciador de tarefas com estética retro pixelada",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`${pixelify.className} bg-[#ede7ce] text-[#6f5642]  antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
