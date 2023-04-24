import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";

import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";

import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

import Navbar from "./components/navbar/Navbar";

import "./globals.css";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
