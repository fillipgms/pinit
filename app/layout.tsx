import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelify = Pixelify_Sans({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pinit",
    description: "Gerencie suas músicas favoritas. Crie listas e até mesmo de destaque às suas SUPER favoritas!",
,
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
