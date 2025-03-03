// components/Shimmer.js
import ContentLoader from "react-content-loader";

export default function Shimmer() {
  return (
    <>
      <ContentLoader
        speed={2}
        width="100%"
        height={500}
        backgroundColor="#d8d3d5"
        foregroundColor="#999"
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="500" />
      </ContentLoader>
      
      <div className='simmer_for_blog'>
        {Array.from({ length: 8 }).map((_, index) => (
          <ContentLoader
            key={index}
            speed={2}
            width={300}
            height={300}
            viewBox="0 0 300 300"
            backgroundColor="#333"
            foregroundColor="#999"
            style={{ flex: 1 }}
          >
            {/* Blog Image Placeholder */}
            <rect x="0" y="0" rx="8" ry="8" width="300" height="180" />
            {/* Blog Title Placeholder */}
            
            <rect x="0" y="160" rx="8" ry="8" width="200" height="20" />
            {/* Blog Date Placeholder */}
            <rect x="0" y="190" rx="3" ry="3" width="100" height="15" />
            {/* Blog Content Placeholder */}
            <rect x="0" y="220" rx="4" ry="4" width="250" height="10" />
            <rect x="0" y="240" rx="4" ry="4" width="220" height="10" />
            <rect x="0" y="260" rx="4" ry="4" width="180" height="10" />
          </ContentLoader>
        ))}
      </div>
    </>
  );
}
