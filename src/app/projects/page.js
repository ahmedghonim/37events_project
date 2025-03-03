"use client";
import Shimmer from "@/components/Shimmer";
import TextHighlight from "@/components/TextHighlight";
import { ApiContext } from "@/context/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useState } from "react";

async function fetchData({ queryKey }) {
  const [_, args] = queryKey; // Extract the arguments from queryKey
  const language = args?.language || "en";
  const response = await fetch(
    `https://thirtysevenevents.perpetualbuild.com/wp-json/v1/post/project/all?lang=${language}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
const Work = () => {
  const [displayedProjects, setDisplayedProjects] = useState(9);

  const { language } = useContext(ApiContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", { language }],
    queryFn: fetchData,
  });

  const handleLoadMore = (e) => {
    e.preventDefault();
    setDisplayedProjects(displayedProjects + 6);
  };

  if (isLoading) return <Shimmer />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      {/* Next Section */}
      <section className="black-bg pt-60 pb-40">
        <div className="container">
          <div className="row justify-content-center">
            {/* Text Content */}
            <div className="col-lg-12 col-md-12">
              <div className="content text-uppercase">
                {data?.workPageInfo?.title && (
                  <h6 className="subtitle text-left text-white">
                    {data.workPageInfo.title}
                  </h6>
                )}
                {data?.workPageInfo?.subtitle && (
                  <TextHighlight
                    textData={data.workPageInfo.subtitle}
                    extraClass="py-3"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Section */}
      <section className="black-bg pt-40 pb-60">
        <div className="container">
          <div className="row">
            {/* First Image */}
            {data.post &&
              data.post.slice(0, displayedProjects).map((post) => (
                <div className="col-md-4 mb-4" key={post.postId}>
                  <div className="gallery-item">
                    <div className="gallery-item-details">
                      <h3>
                        <Link
                          href={`/projects/${post.slug}`}
                          className="gallery-item-title"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <h4>
                        {post.project_city}, {post.project_year}
                      </h4>
                      <div
                        class="truncated-text"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                    <Link href={`/projects/${post.slug}`}>
                      <img src={post.featuredImage} alt={post.title} />
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          {data.post && data.post?.length > displayedProjects && (
            <div className="row text-white d-flex portfolio-viewmore">
              <a
                href="#"
                className="btn btn-link py-5"
                onClick={(e) => handleLoadMore(e)}
              >
                <i className="bi bi-plus-lg"></i>
                <span>
                  {language === "en" ? "View More" : "اطلع على المزيد"}
                </span>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Work;
