/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/productsApi/productApi";
import { Rate, Spin } from "antd"; // Importing Ant Design's Spin component for the loader
import { useDispatch } from "react-redux";

import "../../styles/HomeProductsSection.css";
import { addToCart } from "../../redux/features/cartSlice";

const HomeProductsSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetAllProductsQuery(undefined);
  const products = data?.data?.result.slice(0, 6) || [];

  const goToProductsPage = () => {
    navigate("/products");
    window.scrollTo(0, 0);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (product: any) => {
    const itemToAdd = {
      _id: product._id,
      title: product.Title,
      price: product.Price,
      quantity: 1,
    };
    dispatch(addToCart(itemToAdd));
  };

  if (isLoading) {
    return (
      <div className="loader">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  return (
    <section className="section">
      <h2 className="title">Explore Our Products</h2>
      <div className="products-container">
        {products.map((product: any) => (
          <div key={product._id} className="product-card">
            <img src={product.Image} alt={product.Title} />
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
            <button
              className="button"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              See Details
            </button>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
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
