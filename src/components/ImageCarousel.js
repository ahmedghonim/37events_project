import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";

const ImageCarousel = ({ services }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      arrows={true}
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      autoPlay={true}
      autoPlaySpeed={1500}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      slidesToSlide={1}
    >
      {services &&
        services.map((item, index) => (
          <div className="col-md-12" key={index}>
            <div className="card text-center">
              <div
                className="card-body"
                style={{
                  backgroundImage: item.featuredImage
                    ? `url(${item.featuredImage})`
                    : "",
                  boxShadow: "inset 0 0 0 2000px rgb(0 0 0 / 79%)",
                }}
              >
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item?.short_description}</p>
                <Link 
                href="/services" className="btn btn-primary">
                  <i className="bi bi-plus"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
};

export default ImageCarousel;
