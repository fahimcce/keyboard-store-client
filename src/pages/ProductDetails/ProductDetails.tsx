import { useParams } from "react-router-dom";
import { Card, Rate, Row, Col, Spin, notification, Button } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/productsApi/productApi";
import { useAppDispatch } from "../../redux/hook";
import { addToCart } from "../../redux/features/cartSlice";
import Swal from "sweetalert2";
import { useState } from "react";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const product = data?.data;
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Server is down! Please try again later.",
    });
    return null; // Prevent rendering further in case of an error
  }

  const handleAddToCart = () => {
    if (!product) return;

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

  return (
    <div className="pdetailsBody">
      <Row justify="center" style={{ margin: "20px", textAlign: "center" }}>
        <Col
          xs={24}
          md={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={product.Image}
            alt={product.Title}
            style={{
              height: "380px",
              width: "600px",
              borderRadius: "10px",
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Card
            style={{
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
            }}
          >
            <h2>{product.Title}</h2>
            <p>
              <strong>Brand:</strong> {product.Brand}
            </p>
            <p>
              <strong>Available Quantity:</strong> {product.AvailableQuantity}
            </p>
            <p>
              <strong>Price:</strong> ৳{product.Price.toFixed(2)}
            </p>
            <p>
              <strong>Rating:</strong> <Rate disabled value={product.Rating} />
            </p>
            <p>
              <strong>Description:</strong> {product.Description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={handleAddToCart}
                disabled={!!disabledButtons[product._id]}
              >
                Add to Cart
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Full height to center vertically
};

export default ProductDetails;
