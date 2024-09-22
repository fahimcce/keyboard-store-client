import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDashboard from "../pages/ProductDashboard/ProductDashboard";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/dashboard",
        element: <ProductDashboard />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
    ],
  },
]);

export default router;
