import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import slider1 from "../../../src/assets/images/slider-1.jpg";
import slider2 from "../../../src/assets/images/slider-2.jpg";
import slider3 from "../../../src/assets/images/slider-3.jpg";

const contentStyle: React.CSSProperties = {
  height: "100vh", // Full viewport height
  color: "#fff",
  display: "flex",
  flexDirection: "column", // Column layout for stacking items
  justifyContent: "center", // Center vertically
  alignItems: "center", // Center horizontally
  textAlign: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#1890ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1.2rem",
  marginTop: "10px", // Add margin for spacing
};

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/products");
    window.scrollTo(0, 0);
  };

  return (
    <Carousel autoplay style={{ height: "100vh" }}>
      {/* Slide 1 */}
      <div>
        <div
          style={{
            ...contentStyle,
            backgroundImage: `url(${slider1})`,
          }}
        >
          <h1 style={{ fontSize: "4rem" }}>
            Discover the Ultimate Typing Experience
          </h1>
          <button style={buttonStyle} onClick={handleExploreClick}>
            Explore Our Products
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div>
        <div
          style={{
            ...contentStyle,
            backgroundImage: `url(${slider2})`,
          }}
        >
          <h1 style={{ fontSize: "4rem" }}>
            Unleash Your Potential with Every Keystroke
          </h1>
          <button style={buttonStyle} onClick={handleExploreClick}>
            Explore Our Products
          </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div>
        <div
          style={{
            ...contentStyle,
            backgroundImage: `url(${slider3})`,
          }}
        >
          <h1 style={{ fontSize: "4rem" }}>Elevate Your Typing Game Today</h1>
          <button style={buttonStyle} onClick={handleExploreClick}>
            Explore Our Products
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default Hero;
