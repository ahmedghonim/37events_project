"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import "react-hamburger-menus/dist/style.css";
import { ApiContext } from "../context/ApiProvider";
import logoBlack from "./logo-black.png";
import logoWhite from "./logo-white.png";
import Navigation from "./Navigation";

export default function Header() {
  //  const { language, toggleLanguage } = useLanguage();
  const pathName = usePathname();
  const { data, isLoading, language, handleLanguage } = useContext(ApiContext);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("🚀 ~ Header ~ menuOpen:", menuOpen);
  const handleMenuWithLanguage = (e) => {
    e.preventDefault();
    handleLanguage();
  };

  // Update language and direction based on the selected language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.className = language === "ar" ? "lang-ar" : "lang-en";
  }, [language]);

  const isHome = pathName === "/";

  const blackLogo = data ? data.theme_options_data.black_logo : logoBlack.src;
  const whiteLogo = data ? data.theme_options_data.white_logo : logoWhite.src;
  return (
    <section
      className={`${
        isHome ? "header-section" : ""
      } flex align-center justify-between pt-60 pb-60`}
    >
      <div className="container">
        <div className="row header">
          <div className="logo-container-inner logo">
            <Link href="/">
              <img
                src={isHome ? blackLogo : whiteLogo}
                alt="37 Events"
                className="website-logo"
              />
            </Link>
          </div>
          <div className="header-right">
            {/*<div className="language-link">
              <button onClick={handleMenuWithLanguage}>
                {language === "en" ? "عربي" : "EN"}
              </button>
            </div>*/}
            <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      </div>
    </section>
  );
}
