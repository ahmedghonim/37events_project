import React, { useEffect, useRef, useState } from "react";
import "./css/AnimatedTitle.css"

const AnimatedTitle = ({elem: Element = 'h3', title, extraClass}) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the title is visible
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={titleRef}
      className={`animate ${isVisible ? "visible" : ""} ${extraClass}`}
    >
      {title}
    </Element>
  );
};

export default AnimatedTitle;
