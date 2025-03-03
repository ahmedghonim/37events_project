"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ApiContext } from "../context/ApiProvider";
export default function Footer() {
  const { data, language } = useContext(ApiContext);
  const currentPath = usePathname();
  const normalizePath = (path) => path.replace(/\/+$/, ""); // Remove trailing slash
  const menuItems = [
    { name: "Home", link: "/" },
    //{ name: "Who We Are", link: "/about/" },
    { name: "What We Do", link: "/services/" },
    { name: "Projects", link: "/projects/" },
    { name: "Blog", link: "/blog/" },
    { name: "Careers", link: "/careers/" },
    { name: "Contact", link: "/contact/" },
    //  { name: "العربية", link: "#", action: handleMenuWithLanguage },
  ];

  const menuItemsAR = [
    { name: "الرئيسيه", link: "/" },
    //{ name: "من نحن", link: "/about/" },
    { name: "ماذا نفعل", link: "/services/" },
    { name: "المشاريع", link: "/projects/" },
    { name: "المدونة", link: "/blog/" },
    { name: "وظائف", link: "/careers/" },
    { name: "تواصل معنا", link: "/contact/" },
    //  { name: "English", link: "/#", action: handleMenuWithLanguage },
  ];
  return (
    <footer className="black-bg py-5">
      <div className="container-fluid">
        <div className="row px-3-custom">
          <div className="col-lg-7 col-md-7 footer-left-column pe-5">
            <ul className="list-unstyled footer-menu">
              {language === "en"
                ? menuItems.map(({ id, link, name }) => (
                    <li
                      key={id}
                      className={currentPath === link ? "active" : ""}
                    >
                      <Link href={link}>{name}</Link>
                    </li>
                  ))
                : menuItemsAR.map(({ id, link, name }) => (
                    <li
                      key={id}
                      className={currentPath === link ? "active" : ""}
                    >
                      <Link href={link}>{name}</Link>
                    </li>
                  ))}
            </ul>

            <div className="mt-3 ">
              <div className="social-icons">
                <a
                  href={data ? data.theme_options_data.linkedin_link : "#"}
                  target="_blank"
                  className="me-2"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href={data ? data.theme_options_data.instagram_link : "#"}
                  target="_blank"
                  className="me-2"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href={data ? data.theme_options_data.youtube_link : "#"}
                  target="_blank"
                  className="me-2"
                >
                  <i className="bi bi-youtube"></i>
                </a>
                <a
                  href={data ? data.theme_options_data.twitter_link : "#"}
                  target="_blank"
                  className="me-2"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a
                  href={data ? data.theme_options_data.tiktok_link : "#"}
                  target="_blank"
                  className="me-2"
                >
                  <i className="bi bi-tiktok"></i>
                </a>
              </div>
              {/* <p className="mb-0 copy-text"> */}
              <p
                className="mb-0 copy-text"
                dangerouslySetInnerHTML={{
                  __html: data && data.theme_options_data.copyright,
                }}
              />
            </div>
          </div>

          <div className="col-lg-5 col-md-5 d-flex flex-column justify-content-center align-items-center border-box">
            <div className="footer-cta-box px-3 text-center ">
              <h4 className="text-start">
                {data && data.theme_options_data.footer_title}
              </h4>
              <a
                href={`tel:${data && data.theme_options_data.footer_email}`}
                className="text-start"
              >
                {data && data.theme_options_data.footer_email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
