import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import c1 from "../../../src/assets/images/c-1.jpg";

const reviews = [
  {
    id: 1,
    image: `${c1}`,
    name: "John Doe",
    review:
      "This keyboard has completely transformed my typing experience! Highly recommend it.",
    rating: 5,
  },
  {
    id: 2,
    image: `${c1}`,
    name: "Jane Smith",
    review:
      "Excellent build quality and fantastic performance. Worth every penny!",
    rating: 4,
  },
  {
    id: 3,
    image: `${c1}`,
    name: "Alice Johnson",
    review: "The best keyboard I've ever used. Fast and responsive keys!",
    rating: 5,
  },
  {
    id: 4,
    image: `${c1}`,
    name: "Bob Brown",
    review: "Stylish design and comfortable to use. I love it!",
    rating: 4,
  },
  {
    id: 5,
    image: `${c1}`,
    name: "Charlie Davis",
    review: "Great value for money! I would buy it again.",
    rating: 5,
  },
  {
    id: 6,
    image: `${c1}`,
    name: "Emily Evans",
    review: "Fantastic product with excellent customer service!",
    rating: 4,
  },
];

const CustomerReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show three reviews at a time on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992, // For tablets
        settings: {
          slidesToShow: 2, // Show two reviews on tablets
        },
      },
      {
        breakpoint: 768, // For mobile
        settings: {
          slidesToShow: 1, // Show one review on mobile
        },
      },
    ],
  };

  return (
    <section
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
        marginTop: "40px",
        height: "auto", // Changed to auto for better responsiveness
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Customer Reviews
        <hr />
      </h2>

      <Slider {...settings}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              padding: "20px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={review.image}
              alt={review.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {review.name}
            </h3>
            <p style={{ fontSize: "1rem", fontStyle: "italic" }}>
              "{review.review}"
            </p>
            <div style={{ fontSize: "1.2rem", color: "#FFD700" }}>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CustomerReviews;
