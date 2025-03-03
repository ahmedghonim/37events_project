import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({startValue= 0, endValue, duration = 2000}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Start counting when section is visible
        } else {
          setIsVisible(false); // Reset when section goes out of view
          setCount(0);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let counter;
    if (isVisible && count < endValue) { // Set your desired end count here
      counter = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 50); // Adjust the interval for speed
    } else if (!isVisible) {
      clearInterval(counter);
      setCount(0);
    }

    return () => clearInterval(counter);
  }, [isVisible, count]);

  return (
    
      <span ref={sectionRef}>{count}</span>
    
  );
};

export default AnimatedCounter;
