import { Button, Typography, Result, Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Result
            status="success"
            title={<Title level={2}>Order Placed Successfully!</Title>}
            subTitle={
              <Text>Thank you for your order. We will process it shortly.</Text>
            }
          />
          <Button type="primary" size="large" onClick={handleBackToHome}>
            Back to Home
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default SuccessPage;
