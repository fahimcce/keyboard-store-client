import { Table, Button, notification, Input, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/features/cartSlice";

// Define the CartItem interface
interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  availableQuantity: number;
}

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items) as CartItem[];
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialQuantities = cartItems.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      },
      {}
    );
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    notification.success({ message: "Product removed from cart!" });
  };

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = Math.max(1, Math.min(Number(value), 100)); // Ensure value is within limits
    setQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (_: unknown, record: CartItem) => <span>{record.title}</span>, // Use unknown
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: unknown, record: CartItem) => `৳${record.price.toFixed(2)}`, // Use unknown
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: unknown, record: CartItem) => (
        <Input
          type="number"
          value={quantities[record._id] || 1} // Default to 1 if not set
          min="1"
          max={record.availableQuantity}
          onChange={(e) => handleQuantityChange(record._id, e.target.value)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: CartItem) => (
        <Button onClick={() => handleRemoveItem(record._id)}>Remove</Button>
      ),
    },
  ];

  const data = cartItems.map((item) => ({
    _id: item._id,
    key: item._id, // Ensure the key is set to _id
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    availableQuantity: item.availableQuantity,
  }));

  return (
    <div style={{ margin: "0 20px" }}>
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>

      {/* Table for cart items */}
      <Row justify="center">
        <Col xs={24} lg={20}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Col>
      </Row>

      {/* Total price and Proceed to Checkout button */}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col xs={24} lg={20}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <h3>Total Price: ৳{totalPrice.toFixed(2)}</h3>
            <Button
              type="primary"
              disabled={cartItems.length === 0} // Disable if the cart is empty
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
