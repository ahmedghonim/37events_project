"use client";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import TextHighlight from "@/components/TextHighlight";
import Shimmer from "@/components/Shimmer";
import CountryList from "country-list-with-dial-code-and-flag";
import { ApiContext } from "@/context/ApiProvider";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey;
  const language = args?.language || "en";
  const response = await fetch(
    `https://thirtysevenevents.perpetualbuild.com/wp-json/v1/page/contact/?lang=${language}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function ContactForm({ queryKey }) {
  // State to track which form is active
  const { language } = useContext(ApiContext);
  const [fileName, setFileName] = useState(
    language === "en" ? "No file attached" : "لم يتم إرفاق ملف"
  );
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { language }],
    queryFn: fetchData,
  });

  const [formData, setFormData] = useState({
    contactFirstName: "",
    contactLastName: "",
    contactCompany: "",
    contactEmail: "",
    contactPhone: "",
    contactWebsite: "",
    contactCountry: "",
    contactRegion: "",
    contactComments: "",
    message: "",
    countrycode: "+966",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const messages = {
    en: {
      firstNameRequired: "First Name is required",
      lastNameRequired: "Last Name is required",
      emailRequired: "Email is required",
      invalidEmail: "Invalid email format",
      phoneRequired: "Phone number is required",
      companyRequired: "Company Name is required",
      attachFile: "Attached File",
      noFile: "No file attached",
    },
    ar: {
      firstNameRequired: "الاسم الأول مطلوب",
      lastNameRequired: "اسم العائلة مطلوب",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
      phoneRequired: "رقم الهاتف مطلوب",
      companyRequired: "اسم الشركة مطلوب",
      attachFile: "الملف المرفق",
    },
  };

  const placeholders = {
    en: {
      firstName: "First Name *",
      lastName: "Last Name *",
      email: "Email *",
      phone: "Phone *",
      message: "Message",
      company: "Company Name*",
      submit: "Submit",
      attachFile: "Attached File",
    },
    ar: {
      firstName: "الاسم الأول *",
      lastName: "اسم العائلة *",
      email: "البريد الإلكتروني *",
      phone: "رقم الهاتف *",
      message: "رسالة",
      company: "اسم الشركة *",
      submit: "إرسال",
      attachFile: "الملف المرفق",
    },
  };

  const langPlaceholders = placeholders[language] || placeholders["en"];

  const handleLinkClick = (e, form) => {
    e.preventDefault();
    setActiveForm(form);
  };

  const validateForm = (language = "en") => {
    const formErrors = {};
    const langMessages = messages[language] || messages["en"];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactFirstName)
      formErrors.contactFirstName = langMessages.firstNameRequired;
    if (!formData.contactLastName)
      formErrors.contactLastName = langMessages.lastNameRequired;
    if (!formData.contactCompany)
      formErrors.contactCompany = langMessages.companyRequired;
    if (!formData.contactEmail)
      formErrors.contactEmail = langMessages.emailRequired;
    else if (!emailRegex.test(formData.contactEmail))
      formErrors.contactEmail = langMessages.invalidEmail;
    if (!formData.contactPhone)
      formErrors.contactPhone = langMessages.phoneRequired;

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyUp = (e) => {
    const { name, value } = e.target;
    if (value) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name]; // Remove the error for the specific field
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(language)) return; // Prevent submission if validation fails
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      "your-name": formData.contactFirstName + " " + formData.contactLastName,
      "your-company": formData.contactCompany,
      "your-email": formData.contactEmail,
      "your-phone": formData.countrycode + "" + formData.contactPhone,
      "your-message": formData.message,
    });

    const response = await fetch(
      "https://thirtysevenevents.perpetualbuild.com/wp-json/v1/contact/submit-form",
      {
        method: "POST",
        headers,
        body,
      }
    );
    const result = await response.json();

    if (result?.data?.status === "mail_sent") {
      router.push("/thank-you");
      setSubmitStatus("Success! Your message has been sent.");
      // Clear form after success
      setFormData({
        contactFirstName: "",
        contactLastName: "",
        contactCompany: "",
        contactEmail: "",
        contactPhone: "",
        countrycode: "",
        contactRegion: "",
        contactComments: "",
        contactFeedback: "",
        message: "",
      });
    } else {
      setSubmitStatus(`Error: ${result.message}`);
    }
  };

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;

  const country = CountryList.getAll();

  return (
    <section className="black-bg pt-60 pb-60 career-top-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <div className="content text-uppercase">
              <h6 className="subtitle text-left text-white py-3">
                {data?.postdata?.custom_field?.title}
              </h6>
              {data?.postdata?.custom_field?.title_description && (
                <TextHighlight
                  textData={data?.postdata?.custom_field?.title_description}
                  extraClass="py-3 text-gray pb-60"
                />
              )}
              {/* <div className="d-flex justify-content-between contact-tab">
                <span className="left-text-career text-white">
                  {data?.postdata?.custom_field?.sub_title}
                </span>
                <span className="right-links text-gray py-3">
                  <a href="#" className={`link tab-link active`}>
                    {data?.postdata?.custom_field?.form_one_title}
                  </a>
                </span>
              </div> */}
            </div>
          </div>
        </div>

        {true && (
          <div className="tab-content active" id="businessEnquiry">
            <form className="join" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="contactFirstName"
                    placeholder={langPlaceholders.firstName}
                    value={formData.contactFirstName}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                  {errors.contactFirstName && (
                    <p className="error text-danger">
                      {errors.contactFirstName}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="contactLastName"
                    placeholder={langPlaceholders.lastName}
                    value={formData.contactLastName}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                  {errors.contactLastName && (
                    <p className="error text-danger">
                      {errors.contactLastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="contactEmail"
                    placeholder={langPlaceholders.email}
                    value={formData.contactEmail}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                  {errors.contactEmail && (
                    <p className="error text-danger">{errors.contactEmail}</p>
                  )}
                </div>

                <div className="col-md-1">
                  <select
                    className={`form-control ${
                      errors.countrycode && "is-invalid"
                    }`}
                    onChange={handleChange}
                    value={formData.countrycode}
                    id="countrycode"
                    name="countrycode"
                  >
                    {country && country.length > 0 ? (
                      country.map((country) => (
                        <option key={country.isoCode} value={country.dialCode}>
                          {`${country.flag} ${country.dialCode}`}
                        </option>
                      ))
                    ) : (
                      <option>Loading countries...</option>
                    )}
                  </select>
                </div>

                <div className="col-md-5">
                  <input
                    type="tel"
                    className="form-control"
                    name="contactPhone"
                    placeholder={langPlaceholders.phone}
                    value={formData.contactPhone}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                  {errors.contactPhone && (
                    <p className="error text-danger">{errors.contactPhone}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12 pb-3">
                <input
                  type="text"
                  className="form-control"
                  name="contactCompany"
                  placeholder={langPlaceholders.company}
                  value={formData.contactCompany}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                />
                {errors.contactCompany && (
                  <p className="error text-danger">{errors.contactCompany}</p>
                )}
              </div>
              <div className="row mb-3">
                <div className="col-md-12 flex  justify-between flex-wrap gap-2">
                  <div className="custom-file-input">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onClick={handleChange}
                      style={{ display: "none" }} // Hide the default input
                    />
                    <label
                      htmlFor="resume"
                      className="btn-attachfile "
                      style={{ cursor: "pointer" }}
                    >
                      {langPlaceholders.attachFile} *
                    </label>
                    <span className="file-name ms-2">{fileName}</span>
                  </div>
                  <div className="custom-file-input">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onClick={handleChange}
                      style={{ display: "none" }} // Hide the default input
                    />
                    <label
                      htmlFor="resume"
                      className="btn-attachfile "
                      style={{ cursor: "pointer" }}
                    >
                      {langPlaceholders.attachFile}
                    </label>
                    <span className="file-name ms-2">{fileName}</span>
                  </div>
                  <div className="custom-file-input">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onClick={handleChange}
                      style={{ display: "none" }} // Hide the default input
                    />
                    <label
                      htmlFor="resume"
                      className="btn-attachfile "
                      style={{ cursor: "pointer" }}
                    >
                      {langPlaceholders.attachFile}
                    </label>
                    <span className="file-name ms-2">{fileName}</span>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="4"
                    placeholder={langPlaceholders.message}
                    value={formData.message}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-submit">
                <i className="bi bi-chevron-right pe-3"></i>{" "}
                {langPlaceholders.submit}
              </button>
            </form>
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
