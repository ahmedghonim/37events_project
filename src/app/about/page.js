"use client";
import Shimmer from "@/components/Shimmer";
import TextHighlight from "@/components/TextHighlight";
import { API_BASE_URL } from "@/constants/api";
import { ApiContext } from "@/context/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey;
  const language = args?.language || "en";
  const response = await fetch(`${API_BASE_URL}/page/about?lang=${language}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("ourMission");
  const { language } = useContext(ApiContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { language }],
    queryFn: fetchData,
  });

  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {data?.code === 200 && (
        <>
          <section className="black-bg pt-60 pb-60 position-relative">
            <div className="container z-10">
              <div className="row justify-content-center right-image-container z-10">
                <div className="col-lg-12 col-md-12">
                  <div className="content text-uppercase image-section">
                    {data?.postdata?.custom_filed?.who_we_are?.title && (
                      <h6 className="subtitle text-left text-white">
                        {data.postdata.custom_filed.who_we_are.title}
                      </h6>
                    )}
                    <h1 className="py-3 text-gray text-left pe-5 d-flex align-items-center justify-content-between">
                      {data?.postdata?.custom_filed?.who_we_are?.sub_title && (
                        <TextHighlight
                          textData={
                            data.postdata.custom_filed.who_we_are.sub_title
                          }
                        />
                      )}
                      <img
                        src="/react/images/popcorn.png"
                        alt="popcorn"
                        className="img-fluid popcorn-image z-[0] max-lg:size-[100px] max-lg:top-[35%] max-lg:-translate-y-1/2"
                      />
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row d-flex  map-content z-10">
                <div className="col-md-6">
                  {data?.postdata?.custom_filed?.who_we_are?.map_pins && (
                    <img
                      src={data?.postdata?.custom_filed?.who_we_are?.map_pins}
                      alt="map"
                      className="img-fluid h-[100px] w-[100px] z-10"
                    />
                  )}
                </div>
                <div className="col-md-6">
                  {data?.postdata?.custom_filed?.who_we_are?.description && (
                    <p className="text-white py-5 z-10">
                      {data.postdata.custom_filed.who_we_are.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="left-bottom-ribbon image-section-pulse max-lg:size-[80px]">
              <img
                src="/react/images/orange-ribbon.png"
                alt="ribbon"
                className="img-fluid"
              />
            </div>
          </section>

          <section className="black-bg pt-40 pb-40 whychoose-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-8">
                  <div className="content text-left text-white">
                    {data?.postdata?.custom_filed?.why_choose_us
                      ?.why_choose_us && (
                      <h3 className="py-3 text-white text-left about-section-title section-title text-uppercase">
                        {data.postdata.custom_filed.why_choose_us.why_choose_us}
                      </h3>
                    )}
                    {data?.postdata?.custom_filed?.why_choose_us
                      ?.why_choose_us_decription && (
                      <p className="text-white text-lite">
                        {
                          data?.postdata?.custom_filed?.why_choose_us
                            .why_choose_us_decription
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bottom-right-image image-section">
                <img
                  src="/react/images/microphone.png"
                  alt="Description of the image"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="container my-5">
              <div className="row d-flex align-items-stretch">
                {data?.postdata?.custom_filed?.why_choose_us?.box_section &&
                  data.postdata.custom_filed.why_choose_us.box_section.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 mb-4 d-flex "
                      >
                        <div className="border-bottom blur-text h-100">
                          <h6 className="text-uppercase py-4 text-white about-content-title">
                            {item.title} {/* Use item.title for the title */}
                          </h6>
                          <p className="text-lite text-white pb-40 reduce-opacity">
                            {item.description}{" "}
                            {/* Use item.description for the description */}
                          </p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </section>

          <section
            className="pt-60 pb-60 about-bottom-section"
            style={{
              backgroundImage: data?.postdata?.featuredimg
                ? `url(${data.postdata.featuredimg})`
                : "none",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="content text-uppercase">
                    {data?.postdata?.custom_filed?.our_mission?.our_mission && (
                      <h6 className="subtitle text-left">
                        <a
                          href="#"
                          className={`link tab-link ${
                            activeTab === "ourMission" ? "active" : ""
                          }`}
                          onClick={(e) => handleLinkClick(e, "ourMission")}
                          data-target="mission"
                        >
                          {data.postdata.custom_filed.our_mission.our_mission}
                        </a>
                      </h6>
                    )}
                    {data?.postdata?.custom_filed?.bottomSection
                      ?.bottom_section_title && (
                      <h6 className="subtitle text-left">
                        <a
                          href="#"
                          className={`link tab-link ${
                            activeTab === "ourVision" ? "active" : ""
                          }`}
                          onClick={(e) => handleLinkClick(e, "ourVision")}
                          data-target="vision"
                        >
                          {
                            data?.postdata?.custom_filed?.bottomSection
                              ?.bottom_section_title
                          }
                        </a>
                      </h6>
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-sm-8 ">
                  {activeTab === "ourMission" &&
                    data?.postdata?.custom_filed?.our_mission
                      ?.our_mission_description && (
                      <p
                        className={`pb-5 text-gray text-left text-white pe-5 about-bottom-content`}
                      >
                        {
                          data.postdata.custom_filed.our_mission
                            .our_mission_description
                        }
                      </p>
                    )}

                  {activeTab === "ourVision" &&
                    data?.postdata?.custom_filed?.bottomSection
                      ?.bottom_section_description && (
                      <p className="pb-5 text-gray text-left text-white pe-5 about-bottom-content">
                        {
                          data.postdata.custom_filed.bottomSection
                            .bottom_section_description
                        }
                      </p>
                    )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
