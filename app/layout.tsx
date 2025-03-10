"use client"
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import FollowBar from "@/components/layout/FollowBar";
import LoginModal from "@/components/modals/LogInModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/Hooks/useCurrentUser";
// import { client } from "@/components/Http";
import { QueryClient, QueryClientProvider } from "react-query";
import EditModal from "@/components/modals/EditModal";
// import UserPage from "./users";





const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
export const client = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <>

          <QueryClientProvider client={client}>
            <AuthProvider>
              <Toaster />
              <EditModal/>
              <LoginModal />
              <RegisterModal />
              <div className="grid grid-cols-4 h-full">
                <Sidebar />
                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-500">
                  {children}
                </div>
                <FollowBar />

              </div>
            </AuthProvider>
          </QueryClientProvider>

        </>
      </body>
    </html>
  );
}

