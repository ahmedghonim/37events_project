"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import TextHighlight from "@/components/TextHighlight";
import { ApiContext } from "@/context/ApiProvider";
import { API_BASE_URL } from "@/constants/api";

export default function BlogDetails({ blog_name }) {
  const { language } = useContext(ApiContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const formattedDate = (dateStr) => {
    let dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // A cache object to store the API responses
  const [cache, setCache] = useState({});
  
  useEffect(() => {
    // Check if the data for the given blog_name and language is already cached
    if (cache[`${blog_name}-${language}`]) {
      setData(cache[`${blog_name}-${language}`]);
      return;
    }
    
   
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/post/blog/${blog_name}?lang=${language}`
        );
        const data = await response.json();
        setData(data);
        // Store the response in the cache
        setCache((prevCache) => ({
          ...prevCache,
          [`${blog_name}-${language}`]: data,
        }));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [blog_name, language, cache]);

  if (error) {
    return (
      <div className="container text-center mt-4">
        <p>No data Found!</p>
      </div>
    );
  }

  if (!data) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {data.code === 200 && data.status === "success" ? (
        <>
          <section className="black-bg pt-60 pb-20">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-12">
                  <div className="content text-uppercase">
                    <TextHighlight
                      textData={data.post.title}
                      extraClass="py-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="black-bg pt-20 pb-40 blog-single">
            <div className="container-fluid px-0">
              <div className="row justify-content-center mx-0">
                <div className="col-lg-12 col-md-12 px-0 flex justify-center">
                  <img
                    alt={data.post.title}
                    src={data.post.banner_image}
                    width={1000}
                    height={400}
                    style={{ objectFit: "cover" }} 
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center pt-40 pb-40">
                <div className="col-lg-10 col-md-10">
                  {data.post?.post_content ? (
                    <div
                      className="text-lite text-white text-left pt-5 mb-0 font-size-20 single-post"
                      dangerouslySetInnerHTML={{
                        __html: data.post.post_content,
                      }}
                    />
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              </div>
            </div>
          </section> 
        </>
      ) : (
        <main>
          <div className="container text-center mt-4">
            <p>No data found!</p>
          </div>
        </main>
      )}
    </>
  );
}
