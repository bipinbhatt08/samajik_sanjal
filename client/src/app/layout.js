import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from "@/redux/reduxProvider";
export const metadata = {
  title: "Samajik Sanjal",
  description: "Connect and share with friends",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
     <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
     </head>
      <body
        className={'antialiased'}
        style={{ fontFamily: 'Inter, sans-serif'}}
      > 
    <ReduxProvider>

        <Providers>
        <ToastContainer
          position="top-right"
          autoClose={700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          {children}
        </Providers>

    </ReduxProvider>
      </body>
    </html>
  );
}
