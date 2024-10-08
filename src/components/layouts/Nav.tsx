import { Badge } from "antd";
import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import "./Nav.css"; // Optional: Add a separate CSS file for cleaner styles

const Nav = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart

  const menuItems = [
    { key: "1", label: <NavLink to="/">Home</NavLink> },
    { key: "2", label: <NavLink to="/products">Products</NavLink> },
    { key: "3", label: <NavLink to="/about">About</NavLink> },
    { key: "4", label: <NavLink to="/contact">Contact</NavLink> },
    { key: "5", label: <NavLink to="/dashboard">Dashboard</NavLink> },
    {
      key: "6",
      label: (
        <NavLink to="/cart">
          <Badge count={cartItemCount} offset={[10, 0]} showZero>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{
                width: "24px",
                height: "24px",
                color: "white",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Badge>
        </NavLink>
      ),
    },
  ];

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top "
        style={{ backgroundColor: "#00152A" }}
      >
        <div className="container-fluid ">
          {/* Logo Section */}
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

          {/* Navbar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav ms-auto" // Aligns the nav items to the right
              style={{ display: "flex", gap: "20px", marginRight: "30px" }} // Adding gap between nav items
            >
              {menuItems.map((item) => (
                <li className="nav-item" key={item.key}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
