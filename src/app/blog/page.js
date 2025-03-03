"use client";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Shimmer from "@/components/Shimmer";
import TextHighlight from "@/components/TextHighlight";
import { ApiContext } from "@/context/ApiProvider";
import { API_BASE_URL } from "@/constants/api";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey; // Extract the arguments from queryKey
  const language = args?.language || "en";
  const response = await fetch(
    `${API_BASE_URL}/post/blogs/all/?lang=${language}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function Blog() {
  const [displayedBlogs, setDisplayedBlogs] = useState(6);
  const { language } = useContext(ApiContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { language }],
    queryFn: fetchData,
  });

  const handleLoadMore = (e) => {
    e.preventDefault();
    setDisplayedBlogs(displayedBlogs + 6);
  };

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;
  const text = (data && data?.sub_title) || "";
  return (
    <>
      {/* <!-- Header Section --> */}
      <section className="black-bg pt-60 pb-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className="content text-uppercase">
                <h6 className="subtitle text-left text-white">{data?.title}</h6>
                <TextHighlight textData={text} extraClass="py-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Blog Section --> */}
      <section className="black-bg pt-40 pb-60 blog-archive">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7 pe-5">
              {data.blog &&
                data.blog
                  .slice(0, displayedBlogs)
                  .filter((item, index) => index % 2 === 0)
                  .map((blog, index) => (
                    <div className="col mb-4" key={blog.postId}>
                      <div className="blog-item">
                        <div className="blog-image">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="img-fluid"
                          />
                        </div>
                        <div className="mt-5 blog-date">
                          <small className="text-white text-uppercase">
                            {blog.date}
                          </small>
                        </div>
                        <div className="blog-content">
                          <a
                            href={`/react/blog/${blog.slug}`}
                            className="blog-title text-white text-uppercase"
                          >
                            {blog.title}
                          </a>
                          <p
                            className="mt-2 text-gray"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Sidebar Section */}
            <div className="col-12 col-md-5">
              {data.blog &&
                data.blog
                  .slice(0, displayedBlogs)
                  .filter((item, index) => index % 2 !== 0)
                  .map((blog) => (
                    <div className="col mb-4" key={blog.postId}>
                      <div className="blog-item blog-sidebar">
                        <div className="row">
                          <div className="col pe-3">
                            <div className="blog-image">
                              <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <div className="col ps-3">
                            <div className=" blog-date">
                              <small className="text-white text-uppercase">
                                {blog.date}
                              </small>
                            </div>
                            <div className="blog-content">
                              <a
                                href={`/react/blog/${blog.slug}`}
                                className="blog-title text-white text-uppercase"
                              >
                                {blog.title}
                              </a>
                              <p
                                className="mt-2 text-gray"
                                dangerouslySetInnerHTML={{
                                  __html: blog.content,
                                }}
                              ></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Pagination Button */}
            {data.blog && data.blog?.length > displayedBlogs && (
              <div className="row text-white d-flex portfolio-viewmore">
                <a
                  href="#"
                  onClick={(e) => handleLoadMore(e)}
                  className="btn btn-link py-5"
                >
                  <i className="bi bi-plus-lg"></i>
                  <span>
                    {language === "en" ? "View More" : "اطلع على المزيد"}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
