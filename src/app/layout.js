import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import NavBar from "./_components/Navbar/NavBar";
import Provider from "./_components/Providers/Provider";
import ToastProvider from "./_components/Providers/ToastProvider";
import Footer from "./_components/Footer/Footer";
import SessionContextProvider from "./_components/Providers/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const airbnbCerealArabic = localFont({
  src: "./fonts/AirbnbCerealVF_Arabic_W_Wght.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const airbnbCereal = localFont({
  src: "./fonts/AirbnbCerealVF_W_Wght.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb | book trips anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${airbnbCereal.variable} ${airbnbCerealArabic.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SessionContextProvider>
            <ToastProvider />
            {/* <Header /> */}
            {/* <NavBar /> */}
            {children}
            <Footer />
          </SessionContextProvider>
        </Provider>
      </body>
    </html>
  );
}
