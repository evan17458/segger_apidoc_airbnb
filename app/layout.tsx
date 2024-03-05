import { Nunito } from "next/font/google";



import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Airbnb訂房",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

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
          <div>{children}</div>
        </ClientOnly>
      </body>
    </html>
  );
}
//4:49:28
