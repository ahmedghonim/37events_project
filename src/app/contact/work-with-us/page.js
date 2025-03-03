"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryList from "country-list-with-dial-code-and-flag";
import { API_BASE_URL } from "@/constants/api";
import TextHighlight from "@/components/TextHighlight";
import Shimmer from "@/components/Shimmer";

async function fetchData() {
  const response = await fetch(`${API_BASE_URL}/work-with-us`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function ContactForm() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  const [formData, setFormData] = useState({
    contactFirstName: "",
    contactLastName: "",
    contactCompany: "",
    contactEmail: "",
    contactPhone: "",
    position: "",
    contactWebsite: "",
    contactCountry: "",
    contactRegion: "",
    contactComments: "",
    contactFeedback: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const country = CountryList.getAll();

  const handleLinkClick = (e, form) => {
    e.preventDefault();
    setActiveForm(form);
  };

  const validateForm = () => {
    const formErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactFirstName)
      formErrors.contactFirstName = "First Name is required";
    if (!formData.contactLastName)
      formErrors.contactLastName = "Last Name is required";
    if (!formData.position) formErrors.position = "Job position is required";
    if (!formData.contactEmail) formErrors.contactEmail = "Email is required";
    else if (!emailRegex.test(formData.contactEmail))
      formErrors.contactEmail = "Invalid email format";
    if (!formData.contactPhone)
      formErrors.contactPhone = "Phone number is required";
    // if (!formData.contactCountry)
    //   formErrors.contactCountry = "Country is required";
    // if (!formData.contactRegion)
    //   formErrors.contactRegion = "Region is required";

    // if (!formData.contactFeedback)
    //   formErrors.contactFeedback = "Feedback is required";

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
    if (!validateForm()) return; // Prevent submission if validation fails

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Authorization",
      "Basic cGVycGV0dWFsLWFkbWluOjNwMzA0dnNNeExJRykxOWFmMg=="
    );

    const body = JSON.stringify({
      "your-name": formData.contactFirstName + " " + formData.contactLastName,
      "your-company": formData.contactCompany,
      "your-email": formData.contactEmail,
      "your-phone": formData.contactPhone,
      "your-country": formData.contactCountry,
      "your-message": formData.contactFeedback,
    });

    try {
      const response = await fetch(
        "https://thirtysevenevents.perpetualbuild.com/wp-json/contact-form-7/v1/contact-forms/276/feedback",
        {
          method: "POST",
          headers,
          body,
        }
      );

      const result = await response.json();

      if (result !== "") {
        router.push("/thank-you");
        setSubmitStatus("Success! Your message has been sent.");
        // Clear form after success
        setFormData({
          contactFirstName: "",
          contactLastName: "",
          contactCompany: "",
          contactEmail: "",
          contactPhone: "",
          contactWebsite: "",
          contactCountry: "",
          contactRegion: "",
          contactComments: "",
          contactFeedback: "",
        });
      } else {
        setSubmitStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      window.location.replace("/react/thank-you");
      setSubmitStatus("Error: Unable to send the message. Please try again.");
    }
  };

  useEffect(() => {
    // Ensure sessionStorage is accessed in the browser
    if (typeof window !== "undefined") {
      const jobTitle = sessionStorage.getItem("jobTitle") || "";
      setFormData({
        ...formData, // Keep all other form data intact
        position: jobTitle, // Update the `position` field
      });
    }
  }, []);

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;

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
              <div className="d-flex justify-content-between contact-tab">
                <span className="left-text-career text-white">
                  {data?.postdata?.custom_field?.sub_title}
                </span>
                <span className="right-links text-gray py-3">
                  <a href="#" className={`link tab-link active`}>
                    {data?.postdata?.custom_field?.form_one_title}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {true && (
          <div className="tab-content active" id="workingWithUs">
            <form className="join" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="contactFirstName"
                    placeholder="First Name *"
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
                    placeholder="Last Name *"
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
                    placeholder="Email *"
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
                    placeholder="Phone *"
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
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    placeholder="Position Apply For *"
                    value={formData.position}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                  {errors.position && (
                    <p className="error text-danger">{errors.position}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <input
                    type="file"
                    className="form-control"
                    name="contactWebsite"
                    placeholder="Website"
                    value={formData.contactWebsite}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <textarea
                    class="form-control"
                    name="contactComments"
                    rows="4"
                    placeholder="Write about yourself?"
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-submit">
                <i className="bi bi-chevron-right pe-3"></i> Apply
              </button>
            </form>
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
