"use client";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Accordion from "react-bootstrap/Accordion";
import Shimmer from "@/components/Shimmer";
import TextHighlight from "@/components/TextHighlight";
import { ApiContext } from "@/context/ApiProvider";
import { API_BASE_URL } from "@/constants/api";
import AnimatedImage from "@/components/AnimateImage";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey; // Extract the arguments from queryKey
  const language = args?.language || "en";
  const response = await fetch(
    `${API_BASE_URL}/post/services/all?lang=${language}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function Services() {
  const { language } = useContext(ApiContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { language }],
    queryFn: fetchData,
  });

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="">
      <section
        style={{
          backgroundImage: `url(${data?.whatwedo_info?.whatwedo_info_image})`,
        }}
        className="black-bg pt-60 pb-40 h-[50vh] position-relative"
      >
        <div className="container">
          <div className="row justify-content-center service-right-image-container">
            {/* <!-- Text Content --> */}
            <div className="col-lg-12 col-md-12">
              <div className="content text-uppercase flex flex-col justify-center h-[40vh] ">
                {data?.whatwedo_info?.title && (
                  <h6 className="subtitle text-left text-white ">
                    {data.whatwedo_info.title}
                  </h6>
                )}
                {data?.whatwedo_info?.subtitle && (
                  <TextHighlight
                    textData={data.whatwedo_info.subtitle}
                    extraClass="py-3 text-gray"
                  />
                )}
              </div>
            </div>
          </div>
          {/* <!-- Image to appear at the end of the section --> */}
          <AnimatedImage
          imageUrl="/react/images/service-baloon.png"
            
            alt="Service Image"
            extraclass="animate-image-popcorn img-fluid position-absolute bottom-16 end-10"
          />
        </div>
      </section>

      {/* <!-- Next Section --> */}
      <section className="black-bg pt-40 pb-60 whychoose-section position-relative">
        <div className="container z-0">
          <div className="row z-0">
            <div className="col-md-12">
              <div className="accordion" id="accordionExample">
                <div className="row">
                  <div className="container mt-5">
                    <div className="row">
                      <div className="col-md-12">
                        <Accordion defaultActiveKey="0">
                          {data.code === 200 &&
                            data.post &&
                            data.post.length > 0 && (
                              <>
                                {data.post.map((item, index) => (
                                  <div className="col service-box">
                                    <Accordion.Item eventKey={item.postId}>
                                      <Accordion.Header>
                                        <div className="col-4">
                                          <p className="service-title">
                                            {`${String(index + 1).padStart(
                                              2,
                                              "0"
                                            )}. ${item.title}`}
                                          </p>
                                        </div>
                                        <div className="col-6">
                                          <p className="service-subtitle">
                                            {item.sub_title}
                                          </p>
                                        </div>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <div class="row">
                                          <div class="col-4"></div>
                                          <div class="col-6 text-left px-0">
                                            <p
                                              className="text-lite"
                                              dangerouslySetInnerHTML={{
                                                __html: item.content,
                                              }}
                                            />
                                          </div>
                                          <div class="col-2"></div>
                                        </div>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </div>
                                ))}
                              </>
                            )}
                        </Accordion>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Add more service boxes here as needed --> */}
                </div>
              </div>
            </div>
          </div>
          <div className="left-bottom-ribbon max-md:size-[50px] !-bottom-1">
            <img
              src="/react/images/yellow-ribbon.png"
              alt="ribbon"
              className="img-fluid"
            />
          </div>
        </div>
        {/* <!-- Ribbon image at the left bottom --> */}
      </section>
    </div>
  );
}
