import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoZoom = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // ScrollTrigger setup for zoom effects
    ScrollTrigger.create({
      trigger: videoElement,
      start: "top center", // Start zoom-in when the video reaches the center of the viewport
      end: "bottom top", // End zoom-out when the section leaves the viewport
      scrub: true, // Smooth scroll-based animation
      onEnter: () => {
        // Zoom in when the video enters the viewport
        gsap.to(videoElement, { scale: 1.1, duration: 1 });
      },
      onLeave: () => {
        // Zoom out when the video leaves the viewport
        gsap.to(videoElement, { scale: 1, duration: 1 });
      },
      onEnterBack: () => {
        // Zoom in when scrolling back into the viewport
        gsap.to(videoElement, { scale: 1.1, duration: 1 });
      },
      onLeaveBack: () => {
        // Zoom out when scrolling out upwards
        gsap.to(videoElement, { scale: 1, duration: 1 });
      },
    });

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="video-section"
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(1)", // Default scale is 1
          transition: "transform 0.3s ease-out", // Smooth transition
        }}
        autoPlay
        muted
        loop
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoZoom;
