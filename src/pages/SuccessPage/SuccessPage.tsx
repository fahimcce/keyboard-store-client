import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Adjust the path based on your home route
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your order. We will process it shortly.</p>
      <Button type="primary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </div>
  );
};

export default SuccessPage;
