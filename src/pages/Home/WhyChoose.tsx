import { useState } from "react";
import faq from "../../assets/images/faq.png";

const WhyChoose = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the benefits of mechanical keyboards?",
      answer:
        "Mechanical keyboards provide superior tactile feedback, customizable key switches, and durability that can last for years.",
    },
    {
      question: "Are mechanical keyboards noisy?",
      answer:
        "Some mechanical switches are designed to be quiet, while others produce a click sound. It depends on the switch type you choose.",
    },
    {
      question: "Can I customize my mechanical keyboard?",
      answer:
        "Yes! Mechanical keyboards often allow for switch swapping, keycap replacements, and RGB lighting customization.",
    },
    {
      question: "What switch type should I choose?",
      answer:
        "It depends on your typing preference. Tactile switches are great for typing, linear switches are smooth for gaming, and clicky switches provide audible feedback.",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}
      >
        Frequently Asked Questions
        <hr />
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* FAQs Section */}
        <div
          style={{
            flex: "0 1 calc(50% - 20px)",
            margin: "10px",
            textAlign: "left",
            maxWidth: "600px",
          }}
        >
          {faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h3
                onClick={() => toggleDropdown(index)}
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#1890ff",
                }}
              >
                {faq.question}
              </h3>
              {openIndex === index && (
                <p style={{ fontSize: "1.1rem", paddingLeft: "10px" }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div
          style={{
            flex: "0 1 calc(50% - 20px)",
            margin: "10px",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <img
            src={faq}
            alt="Mechanical Keyboard"
            style={{
              width: "80%",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
