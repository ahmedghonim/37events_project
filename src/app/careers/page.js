"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryList from "country-list-with-dial-code-and-flag";
import { API_BASE_URL } from "@/constants/api";
import Shimmer from "@/components/Shimmer";
import TextHighlight from "@/components/TextHighlight";
import { ApiContext } from "@/context/ApiProvider";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey; // Extract the arguments from queryKey
  const language = args?.language || "en";
  const response = await fetch(`${API_BASE_URL}/page/career/?lang=${language}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function CareerPage() {
  const router = useRouter();
  const { language } = useContext(ApiContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { language }],
    queryFn: fetchData,
  });

  const [fileName, setFileName] = useState(
    language === "en" ? "No file attached" : "لم يتم إرفاق ملف"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : language);
  };

  const [formData, setFormData] = useState({
    contactFirstName: "",
    contactLastName: "",
    contactCompany: "",
    contactEmail: "",
    contactPhone: "",
    position: "",
    contactWebsite: "",
    contactCountry: "",
    countrycode: "+966",
    resume: null,
    contactComments: "",
    contactRegion: "",
    contactFeedback: "",
  });

  // const [errors, setErrors] = useState({});
  // const [fileInput, setFileInput] = useState(null);
  // const [submitStatus, setSubmitStatus] = useState(null);

  // const [fileName, setFileName] = useState("Attach Resume");
  const [submitStatus, setSubmitStatus] = useState("");
  const [errors, setErrors] = useState({});

  // Split the string on '<br />'
  const descriptionStringArray =
    (data?.postdata &&
      data?.postdata?.topSection?.description?.split("<br />")) ||
    [];

  const country = CountryList.getAll();
  const handleLinkClick = (e, form) => {
    e.preventDefault();
    setActiveForm(form);
  };

  const messages = {
    en: {
      firstNameRequired: "First Name is required",
      lastNameRequired: "Last Name is required",
      emailRequired: "Email is required",
      invalidEmail: "Invalid email format",
      phoneRequired: "Phone number is required",
      posetion: "Position is required",
    },
    ar: {
      firstNameRequired: "الاسم الأول مطلوب",
      lastNameRequired: "اسم العائلة مطلوب",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
      phoneRequired: "رقم الهاتف مطلوب",
      posetion: "المنصب مطلوب",
    },
  };

  const placeholders = {
    en: {
      firstName: "First Name *",
      lastName: "Last Name *",
      email: "Email *",
      phone: "Phone *",
      comments: "Write about yourself?",
      resume: "Upload Resume",
      apply: "Apply",
      attachFile: "Attached File",
      noFile: "No file attached",
      position: "Position *",
    },
    ar: {
      firstName: "الاسم الأول *",
      lastName: "اسم العائلة *",
      email: "البريد الإلكتروني *",
      phone: "رقم الهاتف *",
      comments: "اكتب عن نفسك؟",
      resume: "تحميل السيرة الذاتية",
      apply: "قدّم",
      attachFile: "الملف المرفق",
      noFile: "لم يتم إرفاق ملف",
      position: "* المنصب ",
    },
  };

  const langPlaceholders = placeholders[language] || placeholders["en"];

  const validateForm = (language = "en") => {
    const formErrors = {};
    const langMessages = messages[language] || messages["en"];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactFirstName)
      formErrors.contactFirstName = langMessages.firstNameRequired;
    if (!formData.contactLastName)
      formErrors.contactLastName = langMessages.lastNameRequired;
    if (!formData.contactEmail)
      formErrors.contactEmail = langMessages.emailRequired;
    else if (!emailRegex.test(formData.contactEmail))
      formErrors.contactEmail = langMessages.invalidEmail;
    if (!formData.contactPhone)
      formErrors.contactPhone = langMessages.phoneRequired;
    if (!formData.position) formErrors.position = langMessages.posetion;
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, resume: files[0] }));
      setFileName(files[0].name);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
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

    // Validate fields here if needed
    if (!validateForm(language)) return;

    const body = new FormData();
    body.append(
      "your-name",
      `${formData.contactFirstName} ${formData.contactLastName}`
    );
    body.append("your-email", formData.contactEmail);
    body.append(
      "your-phone",
      `${formData.countrycode}${formData.contactPhone}`
    );
    body.append("your-message", formData.contactComments);
    if (formData.resume) {
      body.append("file-487", formData.resume);
    }

    try {
      const response = await fetch(
        "https://thirtysevenevents.perpetualbuild.com/wp-json/v1/career/submit-form",
        {
          method: "POST",
          body,
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result?.data?.status === "mail_sent") {
          router.push("/thank-you");
          setSubmitStatus("Application submitted successfully!");
          // Clear form after success
          setFormData({
            contactFirstName: "",
            contactLastName: "",
            contactCompany: "",
            contactEmail: "",
            contactPhone: "",
            position: "",
            countrycode: "",
            contactRegion: "",
            contactComments: "",
            resume: "",
            message: "",
          });
        } else {
          setSubmitStatus(`Error: ${result.message}`);
        }
      } else {
        setSubmitStatus("Failed to submit the application.");
        console.error("Submission failed", await response.text());
      }
    } catch (error) {
      setSubmitStatus("An error occurred while submitting.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setFileName(language === "en" ? "No file attached" : "لم يتم إرفاق ملف");
  }, [language]);

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Next Section */}
      <section className="black-bg pt-60 pb-0 position-relative ">
        <div className="container">
          <div className="row  right-image-container relative">
            {/* Image to animate */}
            <div className="col-lg-6 col-md-6">
              <div className="content text-uppercase">
                {data?.postdata?.topSection?.title ? (
                  <h6 className="subtitle text-left text-white">
                    {data.postdata.topSection.title}
                  </h6>
                ) : (
                  ""
                )}
                <div className="position-relative">
                  {data?.postdata?.topSection?.sub_title && (
                    <h1 className="py-3 text-gray text-left pe-5 d-flex align-items-center justify-content-between text-py-0">
                      <TextHighlight
                        textData={data.postdata.topSection.sub_title}
                        extraClass="py-5"
                      />
                    </h1>
                  )}
                </div>
              </div>
            </div>
            <img
              src="/react/images/career.png"
              alt="popcorn"
              class="w-[200px] max-md:!w-[100px] start-20 -bottom-[150%] max-md:!start-[75%]  absolute max-md:top-2 "
            />
          </div>
          <div className="row d-flex justify-content-end career-content text-justify text-lite">
            <div className="col-md-5">
              {data?.postdata?.topSection?.description &&
                descriptionStringArray.map((description, index) => (
                  <p
                    key={index}
                    className="text-white py-2"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  ></p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Section */}
      <section className="black-bg pt-0 pb-60 career-top-section">
        <div className="container-fluid ">
          <div className="row">
            {/* Image to animate */}
            <div className="col-lg-12 col-md-12 px-0">
              {data?.postdata?.featuredimg && (
                <img
                  src={data.postdata.featuredimg}
                  alt={data.postdata.featuredimg}
                  class="img-fluid"
                ></img>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 m-auto">
              <div className="content">
                {data?.postdata?.centerSection?.center_section_title ? (
                  <h3 className="pt-5 text-uppercase text-gray text-center text-white career-bottom-content">
                    {data.postdata.centerSection.center_section_title}
                  </h3>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-10 col-md-10 m-auto">
                {data?.postdata?.centerSection?.center_section_description ? (
                  <p className="text-lite text-white text-center subtitle">
                    {data.postdata.centerSection.center_section_description}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="tab-content active" id="workingWithUs">
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
                      {langPlaceholders.attachFile}
                    </label>
                    <span className="file-name ms-2">{fileName}</span>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <input
                  type="tel"
                  className="form-control"
                  name="posetion"
                  placeholder={langPlaceholders.position}
                  value={formData.position}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                />
                {errors.position && (
                  <p className="error text-danger">{errors.position}</p>
                )}
              </div>
              <div className="row mb-3">
                <div class="col-md-12">
                  <textarea
                    class="form-control"
                    name="contactComments"
                    rows="4"
                    onChange={handleChange}
                    placeholder={langPlaceholders.comments}
                    onKeyUp={handleKeyUp}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-submit">
                <i className="bi bi-chevron-right pe-3"></i>{" "}
                {langPlaceholders.apply}
              </button>
            </form>
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
