import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
    title: 'Bus Ticket',
    description: 'Get a bus ticket',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={nunito.className}>
                <Toaster
                    containerStyle={{
                        top: 120,
                    }}
                    toastOptions={{
                        className: 'custom-toaster',
                        duration: 5000,
                        style: {
                            minWidth: 'fit-content',
                        },
                    }}
                />
                {children}
            </body>
        </html>
    );
}
