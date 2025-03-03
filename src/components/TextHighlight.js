import React, { useEffect, useState, useRef } from "react";

const TextHighlight = ({ textData, extraClass = "" }) => {
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef(null);

  const words = textData.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }
  }, []);

  return (
    <div
      ref={textRef}
      className={`text-highlight  text-gray z-10 ${extraClass}`}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`word ${isInView ? "highlight" : ""}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default TextHighlight;
