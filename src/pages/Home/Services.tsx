import delivery from "../../../src/assets/images/box.png";
import support from "../../../src/assets/images/24-hours-support.png";
import packages from "../../../src/assets/images/package.png";

// CSS animation for zoom in/out
const zoomInOutAnimation = {
  animation: "zoomInOut 2s ease-in-out infinite",
};

// Keyframe for zoom-in and zoom-out
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes zoomInOut {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`,
  styleSheet.cssRules.length
);

const Services = () => {
  return (
    <section
      style={{
        padding: "20px", // Adjusted for mobile
        textAlign: "center",
        marginTop: "20px",
        height: "auto", // Changed to auto for flexibility
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Why Shop With Us?
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {[
          {
            img: delivery,
            title: "Free Shipping",
            description: "Enjoy complimentary shipping on all orders over $50.",
          },
          {
            img: packages,
            title: "Lowest Delivery Charge",
            description:
              "We guarantee the lowest delivery charges in the market.",
          },
          {
            img: support,
            title: "24/7 Support",
            description:
              "Our dedicated team is here to assist you anytime, day or night.",
          },
        ].map((service, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 200px", // Flex-grow, flex-shrink, and base width
              padding: "20px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              ...zoomInOutAnimation, // Apply the animation here
              minWidth: "250px", // Minimum width for larger screens
            }}
          >
            <img
              src={service.img}
              alt={service.title}
              style={{ width: "50px", height: "50px", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "1.5rem" }}>{service.title}</h3>{" "}
            {/* Adjusted size for mobile */}
            <p style={{ fontSize: "1rem" }}>{service.description}</p>{" "}
            {/* Adjusted size for mobile */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
