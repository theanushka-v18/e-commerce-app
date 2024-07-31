import { useState } from "react";
import "../styles/customerReviews.css";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

const testimonials = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shopzy. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shopzy. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shopzy. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shopzy. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shopzy. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shopzy. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shopzy. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shopzy. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shopzy. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
  },
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <div className="carousel-container">
      <div className="heading-container">
        <h1>Our Happy Customers</h1>
        <div className="carousel-btns">
          <button className="prev" onClick={prevSlide}>
            ←
          </button>
          <button className="next" onClick={nextSlide}>
            →
          </button>
        </div>
      </div>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / testimonials.length
            }%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
              key={index}
            >
              <div className="testimonial">
                <div className="rating">
                  <Stack spacing={1}>
                    <span>
                      <Rating
                        name="half-rating-read"
                        size="small"
                        defaultValue={5}
                        precision={0.5}
                        readOnly
                      />
                    </span>
                  </Stack>
                </div>
                <h3>{testimonial.name} <span className="tick">&#10003;</span></h3>
                <p>"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
