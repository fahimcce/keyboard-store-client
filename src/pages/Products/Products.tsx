import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useState,
} from "react";
import {
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  Rate,
  Spin,
  Pagination,
  notification,
} from "antd";
import { useGetAllProductsQuery } from "../../redux/features/productsApi/productApi";

import { useAppDispatch } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const { data, isLoading, error } = useGetAllProductsQuery(undefined);
  const products = data?.data?.result || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});

  // State for search, filter, sort, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleSearch = (value: SetStateAction<string>) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePriceChange = (value: string | null) => {
    setPriceRange(value);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const handleSortChange = (value: SetStateAction<null>) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to the first page on sort change
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange(null);
    setSortOrder(null);
    setCurrentPage(1); // Reset to the first page when clearing filters
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goToProductDetails = (id: any) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  };

  // Filter and sort logic
  const filteredProducts = products
    .filter(
      (product: { Title: string; Brand: string }) =>
        product.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product: { Price: number }) => {
      if (!priceRange) return true;

      const [min, max] = priceRange.split("-").map(Number);

      // Ensure min and max are valid numbers
      if (isNaN(min) || isNaN(max)) return true;

      return product.Price >= min && product.Price <= max;
    })

    .sort((a: { Price: number }, b: { Price: number }) => {
      if (sortOrder === "lowToHigh") return a.Price - b.Price;
      if (sortOrder === "highToLow") return b.Price - a.Price;
      return 0;
    });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (isLoading) {
    return (
      <div style={loaderStyle}>
        <Spin tip="Loading..." size="large" />
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

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div style={{ margin: "0 20px" }}>
      {/* Search Bar */}
      <Row justify="center" style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Col xs={24} sm={12} lg={8}>
          <Search
            placeholder="Search products by name or brand"
            onSearch={handleSearch}
            enterButton
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      {/* Filter and Sort Row */}
      <Row justify="center" gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={8} lg={4}>
          <strong>Filter by Price:</strong>
          <Select
            placeholder="Select Price Range"
            onChange={handlePriceChange}
            style={{ width: "100%" }}
          >
            <Option value="0-5000">৳0 - ৳5000</Option>
            <Option value="5001-10000">৳5001 - ৳10000</Option>
            <Option value="10001-15000">৳10001 - ৳15000</Option>
            <Option value="15001-20000">৳15001 - ৳20000</Option>
          </Select>
        </Col>

        <Col xs={24} sm={8} lg={4}>
          <strong>Sort by Price:</strong>
          <Select
            placeholder="Sort by Price"
            onChange={handleSortChange}
            value={sortOrder}
            style={{ width: "100%" }}
          >
            <Option value="lowToHigh">Price: Low to High</Option>
            <Option value="highToLow">Price: High to Low</Option>
          </Select>
        </Col>

        <Col xs={24} sm={8} lg={4}>
          <Button
            onClick={clearFilters}
            style={{ marginTop: "22px", width: "100%" }}
            type="default"
          >
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Product Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {currentProducts.map(
          (product: {
            _id: Key | null | undefined;
            Title:
              | string
              | number
              | boolean
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined;
            Image: string | undefined;
            Brand:
              | string
              | number
              | boolean
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            AvailableQuantity:
              | string
              | number
              | boolean
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            Price: number;
            Rating: number | undefined;
          }) => (
            <Col xs={24} sm={12} lg={8} key={product._id}>
              <Card
                hoverable
                cover={
                  <img
                    src={product.Image}
                    style={{ height: "250px", width: "100%" }}
                  />
                }
              >
                <Card.Meta
                  title={product.Title}
                  description={
                    <>
                      <p>
                        <strong>Brand:</strong> {product.Brand}
                      </p>
                      <p>
                        <strong>Available Quantity:</strong>{" "}
                        {product.AvailableQuantity}
                      </p>
                      <p>
                        <strong>Price:</strong> ৳{product.Price.toFixed(2)}
                      </p>
                      <Rate disabled value={product.Rating} />
                    </>
                  }
                />
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleAddToCart(product)}
                  disabled={!!disabledButtons[String(product._id)]} // Convert _id to string safely
                >
                  Add to Cart
                </Button>

                <Button
                  type="default"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={() => goToProductDetails(product._id)}
                >
                  Show Details
                </Button>
              </Card>
            </Col>
          )
        )}
      </Row>

      {/* Pagination */}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          pageSize={itemsPerPage}
          total={filteredProducts.length}
          showSizeChanger={false}
        />
      </Row>
    </div>
  );
};

// Loader style
const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

export default Products;
