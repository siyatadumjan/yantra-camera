import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { bannerData } from "../../fakeData";

const Banner = () => (
    <Carousel fade className="banner" interval={2000}>
      {/* Set interval prop to the desired time in milliseconds (e.g., 5000 for 5 seconds) */}
      {bannerData.map((banner, i) => (
          <Carousel.Item key={`banner-${i}`}>
            <img className="d-block w-100" src={banner.imgPath} alt="Banner Slide" />
            <Carousel.Caption className="banner__desc container-div">
              <h1>{banner.title}</h1>
              <p>{banner.desc}</p>

              <Link to="/shop">
                <button>View Collection</button>
              </Link>

            </Carousel.Caption>
          </Carousel.Item>
      ))}
    </Carousel>
);

export default Banner;
