"use client";
import { useContext } from "react";
import { ApiContext } from "@/context/ApiProvider";
export default function ContactForm() {
  const { language } = useContext(ApiContext);
  return (
    <>
      <section className="black-bg pt-20 pb-60 thankyou">
        <div className="container">
          <div className="row justify-content-center pt-40 pb-40">
            <div className="col-lg-10 col-md-10 text-white text-center">
              <div className="py-5">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <h1>{language === "en" ? "Thank You" : "شكراً"}</h1>
              <p className="text-lite text-white text-center pt-5 mb-0 font-size-20">
                {language === "en"
                  ? "Your message has been successfully received, and our team will review it shortly. We’re committed to providing you with a prompt and helpful response. Thank you for reaching out to us!"
                  : "تم استلام رسالتك بنجاح، وسيقوم فريقنا بمراجعتها قريبًا. نحن ملتزمون بتقديم استجابة سريعة ومفيدة. شكرًا لتواصلك معنا!"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
