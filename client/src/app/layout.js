import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Samajik Sanjal",
  description: "Connect and share with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      <body
        className={'antialiased'}
        style={{ fontFamily: 'Inter, sans-serif'}}
      > 

      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
