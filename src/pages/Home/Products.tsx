/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/productsApi/productApi";
import { Button, notification, Rate, Spin } from "antd";
import { useDispatch } from "react-redux";

import "../../styles/HomeProductsSection.css";
import { addToCart } from "../../redux/features/cartSlice";
import { useState } from "react";

const HomeProductsSection = () => {
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetAllProductsQuery(undefined);
  const products = data?.data?.result.slice(0, 6) || [];

  const goToProductsPage = () => {
    navigate("/products");
    window.scrollTo(0, 0);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (product: { _id: any; Title: any; Price: any }) => {
    const itemToAdd = {
      _id: product._id,
      title: product.Title,
      price: product.Price,
      quantity: 1,
    };

    // Dispatch action to add product to cart
    dispatch(addToCart(itemToAdd));

    // Show notification
    notification.success({
      message: "Product Added to Cart",
      description: "Go to cart to place your order.",
    });

    // Disable the "Add to Cart" button for this product
    setDisabledButtons((prev) => ({
      ...prev,
      [product._id]: true,
    }));
  };

  if (isLoading) {
    return (
      <div className="loader">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="alert alert-danger"
          style={{ width: "50%", textAlign: "center" }}
          role="alert"
        >
          Failed to reload Data ! May be Server is Down!! Please Wait !!
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <h2 className="title">Explore Our Products</h2>
      <div className="products-container">
        {products.map((product: any) => (
          <div key={product._id} className="product-card">
            <img
              src={product.Image}
              style={{ height: "200px", width: "100%" }}
              alt={product.Title}
            />
            <h3>{product.Title}</h3>
            <p>
              <strong>Brand:</strong> {product.Brand}
            </p>
            <p>
              <strong>Price:</strong> ৳{product.Price.toFixed(2)}
            </p>
            <p>
              <strong>Rating:</strong>
              <Rate disabled defaultValue={product.Rating} />
            </p>
            <Button
              className="button"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              See Details
            </Button>
            <Button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
              disabled={!!disabledButtons[String(product._id)]} // Convert _id to string safely
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
      <button onClick={goToProductsPage} className="see-more-button">
        See More
      </button>
    </section>
  );
};

export default HomeProductsSection;
