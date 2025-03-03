"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GhostNavbar } from "react-hamburger-menus";
import "react-hamburger-menus/dist/style.css";
import { ApiContext } from "../context/ApiProvider";

export default function Navigation() {
  const { data, language, handleLanguage } = useContext(ApiContext);
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const normalizePath = (path) => path.replace(/\/+$/, ""); // Remove trailing slash

  const handleMenuToggle = () => {
    setIsOpen(!isOpen); // Toggle the menu open or closed
  };

  const handleLinkClick = () => {
    const checkbox = document.querySelector(
      '[data-testid="GhostNavbar-checkbox"]'
    );
    checkbox.click();
    setIsOpen(false); // Close the menu when a link is clicked
  };

  const handleMenuWithLanguage = (e) => {
    e.preventDefault();
    handleLanguage();
    handleLinkClick();
  };

  const menuItems = [
    { name: "HOME", link: "/" },
    //{ name: "Who We Are", link: "/about/" },
    { name: "Our Services", link: "/services" },
    { name: "Our Projects", link: "/projects" },
    { name: "Blog", link: "/blog" },
    { name: "Careers", link: "/careers" },
    { name: "Contact", link: "/contact" },
    { name: "عربية", link: "#", action: handleMenuWithLanguage },
  ];

  const menuItemsAR = [
    { name: "رئيسيه", link: "/" },
    //{ name: "من نحن", link: "/about/" },
    { name: "خدماتنا", link: "/services" },
    { name: "مشاريعنا ", link: "/projects" },
    { name: "مدوناتنا", link: "/blog" },
    { name: "وظائفنا", link: "/careers" },
    { name: "تواصل معنا", link: "/contact" },
    { name: "ENGLISH", link: "/#", action: handleMenuWithLanguage },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  console.log("Current Path is", currentPath);

  return (
    <div className="relative">
      <div className="header-menu">
        <GhostNavbar
          //isOpen={isOpen}
          // menuClicked={handleMenuToggle}
          logo={<p>Logo</p>}
          styles={{
            display: isOpen ? "block" : "none",
            fontColor: "#000",
            fontHoverColor: "black",
            floatButtonSize: 0.9,
            floatButtonX: 6,
            floatButtonY: 15,

            iconColor: "#fff",
          }}
        >
          <div className="relative flex lg:!p-10 !px-10 !pt-28 max-lg:flex-col h-100 bg-black z-[0]">
            <div className="absolute z-10 end-0 bottom-0 flex justify-end p-4">
              <div className="flex gap-1">
                <li className="max-lg:!text-[10px]">
                  <a
                    href={data ? data.theme_options_data.linkedin_link : "#"}
                    target="_blank"
                    className="me-2"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
                <li className="max-lg:!text-[10px]">
                  <a
                    href={data ? data.theme_options_data.instagram_link : "#"}
                    target="_blank"
                    className="me-2"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
                <li className="max-lg:!text-[10px]">
                  <a
                    href={data ? data.theme_options_data.youtube_link : "#"}
                    target="_blank"
                    className="me-2"
                  >
                    <i className="bi bi-youtube"></i>
                  </a>
                </li>
                <li className="max-lg:!text-[10px]">
                  <a
                    href={data ? data.theme_options_data.twitter_link : "#"}
                    target="_blank"
                    className="me-2"
                  >
                    <i className="bi bi-twitter-x"></i>
                  </a>
                </li>
                <li className="max-lg:!text-[10px]">
                  <a
                    href={data ? data.theme_options_data.tiktok_link : "#"}
                    target="_blank"
                    className="me-2"
                  >
                    <i className="bi bi-tiktok"></i>
                  </a>
                </li>
              </div>
            </div>
            <div className="menu-wrapper flex flex-col justify-center z-[0]">
              {language === "en"
                ? menuItems.map(({ id, link, action, name }) => (
                    <li
                      key={id}
                      className={
                        currentPath === link
                          ? "active max-lg:!text-[2px]"
                          : "max-lg:!text-[2px]"
                      }
                    >
                      <Link
                        className="max-md:!text-[20px] whitespace-nowrap"
                        href={link}
                        onClick={action || handleLinkClick}
                      >
                        {name}
                      </Link>
                    </li>
                  ))
                : menuItemsAR.map(({ id, link, action, name }) => (
                    <li
                      key={id}
                      className={
                        currentPath === link
                          ? "active max-lg:!text-[2px]"
                          : "max-lg:!text-[2px]"
                      }
                    >
                      <Link
                        className="max-md:!text-[20px] whitespace-nowrap"
                        href={link}
                        onClick={action || handleLinkClick}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
            </div>
            <div className=" flex flex-col justify-center relative">
              <div className="flex flex-col items-center ">
                <div className="header-map w-2/3 lg:max-h-[70vh]">
                  <img
                    src={data && data.theme_options_data.map_pin}
                    alt="map"
                    className="img-fluid object-contain max-h-[70vh]"
                  />
                </div>
              </div>
            </div>
          </div>
        </GhostNavbar>
      </div>
    </div>
  );
}
