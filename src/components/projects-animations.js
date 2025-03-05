"use client";
import { motion, useScroll, useTransform } from "motion/react";
import MaskNumberLg from "public/images/e8-mask_sm.svg";
import { useRef } from "react";

function ProjectsAnimations({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Animate opacity and scale based on scrollYProgress
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1.5, 1, 1]);
  const blur = useTransform(
    scrollYProgress,
    [0.5, 0.6],
    ["blur(10px)", "blur(0px)"]
  );
  const numberScale = useTransform(scrollYProgress, [0, 0.1, 1], [1, 10, 150]);

  return (
    <motion.div
      ref={ref}
      style={{ height: "900vh" }}
      className="relative bg-black"
    >
      <motion.div className="top-0 sticky h-screen w-screen flex justify-center items-center z-10 overflow-hidden">
        <div className=" top-0 h-screen w-screen flex justify-center items-center">
          <motion.h2
            layout
            className="!text-6xl !text-white font-bold z-10 w-full"
            style={{
              opacity, // Apply opacity transformation
              filter: blur, // Apply blur transformation
            }}
          >
            {data.custom_filed_data?.couterUpSection ? (
              <div className="">
                <div className="row justify-content-center">
                  <div className="col-lg-10 col-md-10 text-center">
                    <h5 className="text-white py-5 max-lg:text-3xl z-10">
                      {
                        data.custom_filed_data.couterUpSection
                          .creating_timeless_experience
                      }
                    </h5>
                  </div>
                </div>
                <div className="flex items-center justify-center text-center mt-4 lg:gap-10 gap-4">
                  <div className=" mb-4 max-lg:text-3xl lg:w-[270px] w-fit">
                    {data.custom_filed_data?.couterUpSection
                      ?.visitors_number && (
                      <h5 className="text-white">
                        {data.custom_filed_data.couterUpSection.visitors_number}
                        {data.custom_filed_data.couterUpSection.visitor_icon}
                      </h5>
                    )}
                    {data.custom_filed_data?.couterUpSection?.visitors && (
                      <p className="text-white max-lg:text-3xl">
                        {data.custom_filed_data.couterUpSection.visitors}
                      </p>
                    )}
                  </div>
                  <div className="mb-4 max-lg:text-3xl lg:w-[270px] w-fit">
                    {data.custom_filed_data?.couterUpSection
                      ?.satisfied_number && (
                      <h5 className="text-white">
                        {
                          data.custom_filed_data.couterUpSection
                            .satisfied_number
                        }
                        {data.custom_filed_data.couterUpSection.satisfied_icon}
                      </h5>
                    )}
                    {data.custom_filed_data?.couterUpSection
                      ?.satisfied_clients && (
                      <p className="text-white">
                        {
                          data.custom_filed_data.couterUpSection
                            .satisfied_clients
                        }
                      </p>
                    )}
                  </div>
                  <div className="mb-4 max-lg:text-3xl lg:w-[270px] w-fit">
                    {data.custom_filed_data?.couterUpSection
                      ?.projects_number && (
                      <h5 className="text-white">
                        {data.custom_filed_data.couterUpSection.projects_number}
                        {data.custom_filed_data.couterUpSection.project_icon}
                      </h5>
                    )}
                    {data.custom_filed_data?.couterUpSection?.projects && (
                      <p className="text-white">
                        {data.custom_filed_data.couterUpSection.projects}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </motion.h2>
        </div>

        <motion.img
          src={data.custom_filed_data?.couterUpSection?.couterup_background}
          className="h-full w-full absolute top-0 left-0 object-cover"
          style={{
            scale,
          }}
        />
        <motion.img
          src={MaskNumberLg.src}
          className="h-full w-full absolute top-0 left-0 object-cover"
          style={{
            scale: numberScale, // Apply the dynamic scaling based on scroll
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default ProjectsAnimations;
