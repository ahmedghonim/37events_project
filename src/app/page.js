"use client";
import AnimatedImage from "@/components/AnimateImage";
import AnimatedTitle from "@/components/AnimatedTitle";
import ImageCarousel from "@/components/ImageCarousel";
import Shimmer from "@/components/Shimmer";
import TextHighlight from "@/components/TextHighlight";
import VideoPlayer from "@/components/VideoPlayer";
import VideoZoom from "@/components/VideoZoom";
import ProjectsAnimations from "@/components/projects-animations";
import { API_BASE_URL } from "@/constants/api";
import { ApiContext } from "@/context/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useState } from "react";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey;
  const language = args?.language || "en";
  const response = await fetch(`${API_BASE_URL}/page/home?lang=${language}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("ourMission");

  const { language } = useContext(ApiContext);
  // const language = "popular"; // This can come from state, props, etc.
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

  // Get the rest of the items
  const remainingServices = data.serviceinfo && data.serviceinfo.slice(3);

  const firstThreeProjects = data.projectinfo && data.projectinfo.slice(0, 3);
  // Get the rest of the items

  return (
    <>
      {/* <!-- Video Banner Section --> */}
      <div className="video-banner">
        {data?.custom_filed_data?.homeTopSection?.banner_video && (
          <VideoZoom
            videoSrc={data.custom_filed_data.homeTopSection.banner_video}
          />
        )}
        <div className="overlay"></div>
      </div>
      {/* <!-- Next Section --> */}
      <section className="black-bg pt-60 pb-40">
        <AnimatedImage
          imageUrl="/react/images/left-image.png"
          extraclass="animate-image-left visible"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-8 image-left">
              <div className="content text-center text-uppercase animation-title">
                {data?.custom_filed_data?.aboutSection?.about_title && (
                  <TextHighlight
                    textData={data.custom_filed_data.aboutSection.about_title}
                    extraClass="py-5"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <AnimatedImage
          imageUrl="/react/images/microphone.png"
          extraclass="animate-image-right visible "
        />
      </section>

      {/* <!-- Video Section --> */}
      <section className="black-bg pt-0 pb-0">
        <div className="content text-center text-uppercase">
          <div className="video-container-center position-relative">
            {data?.custom_filed_data?.aboutSection?.about_video && (
              <VideoPlayer
                videoSrc={data.custom_filed_data.aboutSection.about_video}
              />
            )}
            {data?.custom_filed_data?.aboutSection?.about_sub_title && (
              <h2 className="pt-5 text-white text-center animation-typing">
                {data.custom_filed_data.aboutSection.about_sub_title}
              </h2>
            )}
          </div>
        </div>
      </section>

      {/* <!-- Service Section --> */}
      <section
        className="black-bg pt-20 pb-40 services-section"
        // data-aos="fade-left"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="content text-left text-uppercase text-white d-flex justify-content-between align-items-baseline">
                {data?.custom_filed_data?.servicesSection?.services_title && (
                  <h3 className="py-5 text-white text-left section-title animation-fadeIn">
                    {data.custom_filed_data.servicesSection.services_title}
                  </h3>
                )}
                {data?.custom_filed_data?.servicesSection
                  ?.service_button_text ? (
                  <Link href={"/services"} className="btn btn-link">
                    <i className="bi bi-chevron-right"></i>
                    <span>
                      {
                        data.custom_filed_data.servicesSection
                          .service_button_text
                      }
                    </span>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div
            id="carouselExample"
            className="carousel slide z-50 image-section-pulse"
            data-bs-ride="carousel"
          >
            <img
              src="/react/images/yellow-ribbon.png"
              alt="Event"
              className="ribbon-image"
            />
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  {data?.serviceinfo && (
                    <ImageCarousel services={data.serviceinfo} />
                  )}
                </div>
              </div>

              <div className="carousel-item">
                <div className="row">
                  {remainingServices &&
                    remainingServices.map((item, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card text-center">
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p
                              className="card-text"
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            ></p>
                            <a href="#" className="btn btn-primary">
                              <i className="bi bi-plus"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          height: 90 * (firstThreeProjects?.length + 1) + "vh",
        }}
      >
        <div className="col-lg-12 col-md-12 sticky top-5">
          <div className="content text-center text-uppercase text-white">
            {data.custom_filed_data?.projectSection?.projects_title && (
              <h3 className="py-3 text-white text-center section-title">
                {data.custom_filed_data.projectSection.projects_title.toUpperCase()}
              </h3>
            )}
          </div>
        </div>

        {firstThreeProjects &&
          firstThreeProjects.map((project, index) => (
            <div className="img-fluid sticky top-32" key={index}>
              <img
                src={project.featuredImage}
                className="img-fluid !h-screen object-cover object-center"
                alt={project.title}
              />
              <h4 className="image-title absolute top-[80vh]">
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h4>
            </div>
          ))}
      </div>

      {/**Our Vision & Goal**/}
      <section className="pt-60 pb-60 about-bottom-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="content text-uppercase">
                {data?.custom_filed_data?.ourMission?.our_mission && (
                  <h6 className="subtitle text-left">
                    <a
                      href="#"
                      className={`link tab-link ${
                        activeTab === "ourMission" ? "active" : ""
                      }`}
                      onClick={(e) => handleLinkClick(e, "ourMission")}
                      data-target="mission"
                    >
                      {data.custom_filed_data.ourMission.our_mission}
                    </a>
                  </h6>
                )}
                {data?.custom_filed_data?.ourGoal?.our_goal && (
                  <h6 className="subtitle text-left">
                    <a
                      href="#"
                      className={`link tab-link ${
                        activeTab === "ourVision" ? "active" : ""
                      }`}
                      onClick={(e) => handleLinkClick(e, "ourVision")}
                      data-target="vision"
                    >
                      {data.custom_filed_data.ourGoal?.our_goal}
                    </a>
                  </h6>
                )}
              </div>
            </div>
            <div className="col-lg-8 col-sm-8 ">
              {activeTab === "ourMission" &&
                data?.custom_filed_data?.ourMission
                  ?.our_mission_description && (
                  <p
                    className={`pb-5 text-gray text-left text-white pe-5 about-bottom-content`}
                  >
                    {data.custom_filed_data.ourMission.our_mission_description}
                  </p>
                )}

              {activeTab === "ourVision" &&
                data?.custom_filed_data?.ourGoal?.our_goal_description && (
                  <p className="pb-5 text-gray text-left text-white pe-5 about-bottom-content">
                    {data.custom_filed_data.ourGoal.our_goal_description}
                  </p>
                )}
            </div>
          </div>
        </div>
      </section>

      {/*** Client section */}
      <section className="black-bg pt-0 pb-60 clientlogo-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-10 image-left">
              <div className="content text-center text-uppercase">
                {data.custom_filed_data?.clientsSection?.clients_title && (
                  <AnimatedTitle
                    elem="h3"
                    title={data.custom_filed_data.clientsSection.clients_title.toUpperCase()}
                    extraClass="section-title pt-5 text-white"
                  />
                )}
                {data.custom_filed_data?.clientsSection?.clients_subtitle && (
                  <p className="subtitle">
                    {data.custom_filed_data.clientsSection.clients_subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="row content text-center text-uppercase">
            {data.custom_filed_data?.clientsSection?.clients_title && (
              <AnimatedTitle
                elem="h4"
                title={
                  data.custom_filed_data.clientsSection
                    .clients__sector_one_title
                }
                extraClass="section-title pt-5 text-white"
              />
            )}
          </div>
          {data.custom_filed_data?.clientsSection?.client_logos && (
            <div className="row client_logos">
              {Object.values(
                data.custom_filed_data.clientsSection.client_logos
              ).map((clientlogo, index) => (
                <div className="col-6 col-md-4 col-lg-2" key={index}>
                  <img
                    src={clientlogo}
                    alt={`Client logo ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="row content text-center text-uppercase">
            {data.custom_filed_data?.clientsSection?.clients_title && (
              <AnimatedTitle
                elem="h4"
                title={
                  data.custom_filed_data.clientsSection
                    .clients__sector_two_title
                }
                extraClass="section-title pt-5 text-white"
              />
            )}
          </div>

          {data.custom_filed_data?.clientsSection?.client_logos_sector_two && (
            <div className="row client_logos">
              {Object.values(
                data.custom_filed_data.clientsSection.client_logos_sector_two
              ).map((clientlogo, index) => (
                <div className="col-6 col-md-4 col-lg-2" key={index}>
                  <img
                    src={clientlogo}
                    alt={`Client logo ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          )}
          {/* Our partner */}
          <div className="row content text-center text-uppercase">
            {data.custom_filed_data?.clientsSection?.partner_title && (
              <AnimatedTitle
                elem="h4"
                title={data.custom_filed_data.clientsSection.partner_title}
                extraClass="section-title pt-5 text-white"
              />
            )}
          </div>

          {data.custom_filed_data?.clientsSection?.partner_logos && (
            <div className="row client_logos">
              {Object.values(
                data.custom_filed_data.clientsSection.partner_logos
              ).map((clientlogo, index) => (
                <div className="col-6 col-md-4 col-lg-2" key={index}>
                  <img
                    src={clientlogo}
                    alt={`Client logo ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ProjectsAnimations data={data} />

      {/** Blog  Section ***/}
      <section className="blogs pt-[100px] pb-60 position-relative">
        {/* <!-- Added position-relative --> */}
        <div className="container">
          <div className="row">
            <AnimatedImage
              imageUrl="/react/images/left-image.png"
              extraclass="left-image"
            />
            {/* <!-- First Column - col-lg-8 --> */}
            {data?.blog && data.blog?.length > 0 ? (
              <div className="col-lg-8 col-md-12 mb-4">
                {data.blog.slice(0, 4).map((item, index) => (
                  <div className="blog-box d-flex p-5" key={item.postId}>
                    <div className="col-lg-8 pe-5">
                      <h4>
                        <Link href={`blog/${item.slug}`}>
                          {item.title.toUpperCase()}
                        </Link>
                      </h4>
                      <p dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                    <div className="col-lg-4 blog-image">
                      <Link href={`blog/${item.slug}`}>
                        <img
                          src={item.featuredImage}
                          alt={item.title}
                          className="img-fluid z-[1000]"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            {/* <!-- Second Column - col-lg-4 --> */}

            {data.custom_filed_data?.blogSection ? (
              <div className="col-lg-4 col-md-12 blog-right ps-5 pt-3 flex flex-col gap-2">
                {data?.custom_filed_data?.blogSection?.blog_title ? (
                  <h4>{data.custom_filed_data.blogSection.blog_title}</h4>
                ) : (
                  ""
                )}

                {data?.custom_filed_data?.blogSection?.blog_button_label &&
                data.custom_filed_data.blogSection.blog_button_link ? (
                  <Link
                    href={data.custom_filed_data.blogSection.blog_button_link}
                    className="btn btn-link"
                  >
                    <i className="bi bi-chevron-right"></i>{" "}
                    <span>
                      {data.custom_filed_data.blogSection.blog_button_label}
                    </span>
                  </Link>
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>

          <AnimatedImage
            imageUrl="/react/images/popcorn.png"
            extraclass="animate-image-popcorn img-fluid position-absolute"
          />
        </div>
      </section>
    </>
  );
}
