import { Layout } from "antd";
import logo from "../../../src/assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed", // Changed to fixed
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#001529",
          height: "64px",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: "300px", height: "auto", borderRadius: "5px" }}
              src={logo}
              alt="logo"
            />
          </NavLink>
        </div>

        <div style={{ width: "40%" }}>
          <Navbar />
        </div>
      </Header>
      <Content style={{ paddingBottom: "63px" }}></Content>
    </Layout>
  );
};

export default MainLayout;
