"use client";
import { useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "react-hamburger-menus/dist/style.css";
import Navigation from "./Navigation";
import { useLanguage } from "../hooks/useLanguage";
import { ApiContext } from "../context/ApiProvider";
import logoWhite from "./logo-white.png";
import logoBlack from "./logo-black.png";

export default function Header() {
  //  const { language, toggleLanguage } = useLanguage();
  const pathName = usePathname();
  const { push } = useRouter();
  const { data, isLoading, language, handleLanguage } = useContext(ApiContext);

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
          <div className="logo-container-inner logo z-[10000] w-fit">
            <Link href="/" className="z-[10000]">
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
            <Navigation />
          </div>
        </div>
      </div>
    </section>
  );
}
