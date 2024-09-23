import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../../styles/hover.css";
import { useNavigate } from "react-router-dom";

const Footers = () => {
  const navigate = useNavigate();
  const goToAboutPage = () => {
    navigate("/about");
    window.scrollTo(0, 0);
  };
  const goToProductPage = () => {
    navigate("/products");
    window.scrollTo(0, 0);
  };
  const goToHomePage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <footer
        style={{
          padding: "20px",
          backgroundColor: "#282c34",
          color: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          borderTop: "1px solid #ddd",
          height: "50vh",
        }}
      >
        <div style={{ flex: "1", textAlign: "center", padding: "10px" }}>
          <h3>Contact Us</h3>
          <p style={{ margin: "10px 0" }}>
            <FaEnvelope style={{ marginRight: "5px" }} /> keycaps@kingdom.com
          </p>
          <p style={{ margin: "10px 0" }}>
            <FaPhone style={{ marginRight: "5px" }} /> +1 234 567 890
          </p>
          <p style={{ margin: "10px 0" }}>
            <FaMapMarkerAlt style={{ marginRight: "5px" }} /> 123 ,O R Nizam
            Road,Panslaish,Chittagong,Bangladesh
          </p>
        </div>
        <div style={{ flex: "1", textAlign: "center", padding: "10px" }}>
          <h3>Follow Us</h3>
          <p style={{ margin: "10px 0" }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              <FaFacebook style={{ marginRight: "5px" }} />
              Facebook
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              <FaTwitter style={{ marginRight: "5px" }} />
              Twitter
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              <FaInstagram style={{ marginRight: "5px" }} />
              Instagram
            </a>
          </p>
        </div>
        <div style={{ flex: "1", textAlign: "center", padding: "10px" }}>
          <h3>Important Links</h3>
          <p style={{ margin: "10px 0" }}>
            <a
              onClick={goToAboutPage}
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              About Us
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>
            <a
              onClick={goToAboutPage}
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              Privacy Policy
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>
            <a
              onClick={goToAboutPage}
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              Terms of Service
            </a>
          </p>
        </div>
        <div style={{ flex: "1", textAlign: "center", padding: "10px" }}>
          <h3>Explore out shop</h3>
          <p style={{ margin: "10px 0" }}>
            <a
              onClick={goToProductPage}
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              Products
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>
            <a
              onClick={goToHomePage}
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              Home
            </a>
          </p>
          <p style={{ margin: "10px 0" }}>
            <a
              onClick={goToProductPage}
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s",
              }}
            >
              Explore more..
            </a>
          </p>
        </div>
      </footer>
      <div style={{ marginTop: "20px", fontSize: "1rem", textAlign: "center" }}>
        <p>
          &copy; {new Date().getFullYear()} kysCap kingdoms. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footers;
