import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css"; // Import AOS styles
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import "../assets/css/style.css";
import "../assets/css/custom.css";
import "../assets/css/fonts.css";
import { ApiProvider } from "@/context/ApiProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`lang-en`}>
        <ReactQueryProvider>
          <ApiProvider>
            {<Header />}
            <main>{children}</main>
            <Footer />
          </ApiProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
