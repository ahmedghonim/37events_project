import { useEffect, useRef, useState } from 'react';


const AnimatedImage = ({imageUrl, extraclass}) => {
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target); // Unobserve once it's in view
        }
      },
      { threshold: 0.5 } // Adjust threshold for when the animation should trigger
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className="image-section z-[100]">
      <img
        ref={imageRef}
        src={imageUrl}
        alt="37 Events"
        className={`image-animate ${extraclass} ${isInView ? 'in-view' : ''}`}
      />
    </div>
  );
};

export default AnimatedImage;
