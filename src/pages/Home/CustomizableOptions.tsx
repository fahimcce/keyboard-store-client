import c1 from "../../assets/images/c-1.png";
import c2 from "../../assets/images/c-2.png";
import c3 from "../../assets/images/c-3.png";
import c4 from "../../assets/images/c-4.png";

const customizableOptions = [
  {
    id: 1,
    title: "Key Switch Customization",
    description:
      "Choose from a variety of switch types including tactile, linear, and clicky to suit your typing preference.",
    image: `${c1}`,
  },
  {
    id: 2,
    title: "Keycap Replacement",
    description:
      "Personalize your keyboard with colorful and unique keycap designs. Find the perfect style that represents you!",
    image: `${c2}`,
  },
  {
    id: 3,
    title: "RGB Lighting Options",
    description:
      "Customize your keyboard with dynamic RGB lighting effects. Choose from a spectrum of colors to enhance your setup.",
    image: `${c3}`,
  },
  {
    id: 4,
    title: "Custom Macros",
    description:
      "Program custom macros to enhance your productivity and gaming performance. Tailor your keyboard to your workflow.",
    image: `${c4}`,
  },
];

const CustomizableOptions = () => {
  return (
    <section
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Customizable Options
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {customizableOptions.map((option) => (
          <div
            key={option.id}
            style={{
              flex: "0 1 calc(25% - 20px)", // Default to 4 columns
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              textAlign: "left",
              transition: "transform 0.3s", // Animation effect
              minWidth: "250px", // Minimum width for responsiveness
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={option.image}
              alt={option.title}
              style={{
                width: "100%",
                height: "200px", // Increased height

                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
              {option.title}
            </h3>
            <p style={{ fontSize: "1rem" }}>{option.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomizableOptions;
