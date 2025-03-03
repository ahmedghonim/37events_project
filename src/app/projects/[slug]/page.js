import PortfolioDetails from "@/app/portfolio/PortfolioDetails";
import { API_BASE_URL } from "@/constants/api";

export async function generateStaticParams() {
  // Fetch or define all possible slugs
  const portfolio = await fetchServices(); // Fetch slugs dynamically from a source

  return portfolio.map((item) => ({
    slug: item.slug, // Make sure this matches the [slug] dynamic segment
  }));
}

// Mocked data fetching function (replace this with your actual data fetching logic)
export async function fetchServices() {
  const response = await fetch(`${API_BASE_URL}/post/project/all`);
  const data = await response.json();
  return data.post.map((item) => ({
    slug: item.slug,
  }));
}
export default function Page({ params }) {
  const { slug } = params;
  return <PortfolioDetails portfolio_name={slug} />;
}
