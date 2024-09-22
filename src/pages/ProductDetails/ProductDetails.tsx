import { useParams } from "react-router-dom";
import { Card, Rate, Row, Col } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/productsApi/productApi";
import { useAppDispatch } from "../../redux/hook";
import { addToCart } from "../../redux/features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const product = data?.data;

  const dispatch = useAppDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (product: { _id: any; Title: any; Price: any }) => {
    const itemToAdd = {
      _id: product._id,
      title: product.Title,
      price: product.Price,
      quantity: 1, // Add a default quantity of 1
    };
    dispatch(addToCart(itemToAdd)); // Dispatch the product with correct values
  };

  return (
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
            height: "300px",
            width: "100%",
            objectFit: "cover",
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
            <button
              style={addToCartButtonStyle}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetails;

const addToCartButtonStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  backgroundColor: "#ff4d4f",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
