import f1 from "../../../src/assets/images/f1.png";
import f2 from "../../../src/assets/images/f2.png";
import f3 from "../../../src/assets/images/f3.png";
import f4 from "../../../src/assets/images/f4.png";
import f5 from "../../../src/assets/images/f5.png";
import f6 from "../../../src/assets/images/f6.png";
import "../../styles/FeaturedBrands.css";

const topFeaturedBrands = [
  { id: 1, logo: `${f5}`, brand: "Logitech" },
  { id: 2, logo: `${f4}`, brand: "Razer" },
  { id: 3, logo: `${f3}`, brand: "Corsair" },
  { id: 4, logo: `${f2}`, brand: "SteelSeries" },
  { id: 5, logo: `${f1}`, brand: "Royal Kludge" },
  { id: 6, logo: `${f6}`, brand: "Apple" },
];

const FeaturedBrands = () => {
  return (
    <section
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        textAlign: "center",
        height: "auto",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Top Brands</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {topFeaturedBrands.map((brand) => (
          <div
            key={brand.id}
            style={{
              flex: "0 0 calc(50% - 20px)", // Two cards in a row on mobile
              padding: "20px",
              background: "#fff", // White card background
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center",
              transition: "transform 0.3s ease", // Smooth transition for zoom effect
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Zoom in on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset on hover out
            }}
          >
            <img
              src={brand.logo}
              alt={brand.brand}
              style={{
                width: "100%",
                height: "120px", // Increased height for the images
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {brand.brand}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrands;
