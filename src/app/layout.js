import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Hotel Lujo - Sistema de Reservas",
  description: "Sistema de gestión hotelera con reservas online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
