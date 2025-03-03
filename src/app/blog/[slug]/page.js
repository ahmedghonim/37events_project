import BlogDetails from "@/app/blogdetails/blogdetails";
import { API_BASE_URL } from "@/constants/api";

export async function generateStaticParams() {
  // Fetch or define all possible slugs
  const portfolio = await fetchBlog(); // Fetch slugs dynamically from a source

  return portfolio.map((item) => ({
    slug: item.slug, // Make sure this matches the [slug] dynamic segment
  }));
}

// Mocked data fetching function (replace this with your actual data fetching logic)
export async function fetchBlog() {
  const response = await fetch(`${API_BASE_URL}/post/blogs/all`);
  const data = await response.json();
  return data.blog.map((item) => ({
    slug: item.slug,
  }));
}

export default function Post({ params }) {
  const { slug } = params;
  return <BlogDetails blog_name={slug} />;
}
