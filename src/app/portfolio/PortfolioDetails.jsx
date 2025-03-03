"use client";
import Shimmer from "@/components/Shimmer";
import { API_BASE_URL } from "@/constants/api";
import { ApiContext } from "@/context/ApiProvider";
import { useContext, useEffect, useState } from "react";

export default function PortfolioDetails({ portfolio_name }) {
  const { language } = useContext(ApiContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [displayedGallery, setDisplayedGallery] = useState(6);
  
  // Cache state
  const [cache, setCache] = useState({});

  const handleLoadMore = (e) => {
    e.preventDefault();
    setDisplayedGallery(displayedGallery + 4);
  };

  useEffect(() => {
    // Check if the data for the given portfolio_name and language is already cached
    if (cache[`${portfolio_name}-${language}`]) {
      setData(cache[`${portfolio_name}-${language}`]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/post/project/${portfolio_name}/?lang=${language}`
        );
        const data = await response.json();
        setData(data);

        // Store the response in the cache
        setCache((prevCache) => ({
          ...prevCache,
          [`${portfolio_name}-${language}`]: data,
        }));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [portfolio_name, language, cache]);

  if (error) {
    return (
      <div className="container text-center mt-4">
        <p>No data Found!</p>
      </div>
    );
  }

  if (!data) {
    return <Shimmer />;
  }

  // Safely access the gallery and split data into two columns
  const gallery = data?.post?.gallery || [];
  const middleIndex = Math.ceil(gallery.length / 2);
  const firstColumnGallery = gallery.slice(0, middleIndex);
  const secondColumnGallery = gallery.slice(middleIndex);

  return (
    <>
      {data?.code === 200 && (
        <>
          <section className="black-bg pt-60">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-12">
                  <div className="content text-uppercase">
                    <h6 className="text-4xl text-left text-white">
                      {language === "en" ? "Project" : "مشروع"}
                    </h6>
                    {data?.post?.title && (
                      <h1 className="text-white text-left pe-5">
                        {data.post.title}
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="black-bg project-details">
            <div className="container-fluid px-0">
              <div className="row justify-content-center mx-0">
                <div className="col-lg-12 col-md-12 px-0">
                  {data?.post?.featuredImage && (
                    <img src={data.post.featuredImage} className="img-fluid" />
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center pb-40">
                {data?.post?.content && (
                  <div
                    className="col-lg-10 col-md-10 text-center text-lite fon-size-22"
                    dangerouslySetInnerHTML={{ __html: data.post.content }}
                  />
                )}
              </div>
            </div>
          </section>

          <section className="black-bg pt-0 pb-60 single-project">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  {/* First Column */}
                  {data?.post?.gallery &&
                    firstColumnGallery
                      .slice(0, displayedGallery)
                      .map((item) => (
                        <div className="image-container" key={item.id}>
                          <img src={item.url} alt={item.title} />
                        </div>
                      ))}
                </div>

                <div className="col-md-6 pt-60">
                  {/* Second Column */}
                  {data?.post?.gallery &&
                    secondColumnGallery
                      .slice(0, displayedGallery)
                      .map((item) => (
                        <div className="image-container" key={item.id}>
                          <img src={item.url} alt={item.title} />
                        </div>
                      ))}
                </div>
              </div>

              {data?.post?.gallery &&
                data?.post?.gallery.length > displayedGallery && (
                  <div className="row text-white d-flex portfolio-viewmore">
                    <a
                      href="#"
                      className="btn btn-link py-5"
                      onClick={(e) => handleLoadMore(e)}
                    >
                      <i className="bi bi-plus-lg"></i>
                      <span>{language === "en" ? "View More" : "اطلع على المزيد"}</span>
                    </a>
                  </div>
                )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
