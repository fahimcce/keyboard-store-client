import { useState } from "react";
import { Form, Input, Button, Radio, notification, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";

import { Col, Row } from "antd";
import { useAddOrderMutation } from "../../redux/features/productsApi/orderApi";
import { clearCart } from "../../redux/features/cartSlice";

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addOrder, { isLoading }] = useAddOrderMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    if (cartItems.length === 0) {
      notification.error({ message: "Your cart is empty!" });
      return;
    }

    const orderData = {
      ...values, // Form values (name, email, phone, address)
      paymentMethod,
      products: cartItems.map((item) => ({
        productId: item._id,
        productQuantity: item.quantity,
      })),
      totalAmout: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };

    try {
      await addOrder(orderData).unwrap();
      notification.success({
        message: "Order placed successfully with Cash on Delivery!",
      });
      dispatch(clearCart());
      navigate("/success");
    } catch (error) {
      notification.error({
        message: "Order failed",
        description: "There was an issue placing your order. Please try again.",
      });
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `৳${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "",
      key: "total",
      render: (item: { price: number; quantity: number }) =>
        `৳${(item.price * item.quantity).toFixed(2)}`,
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      <Row gutter={32} justify="center">
        <Col xs={24} md={12}>
          <h3>Delivery Information</h3>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Delivery Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please enter your delivery address",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Payment Method">
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
              >
                <Radio value="cod">Cash on Delivery</Radio>
                <Radio value="stripe" disabled>
                  Stripe (coming soon)
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} md={12}>
          <h3>Your Cart</h3>
          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey={(item) => item._id}
            pagination={false}
            summary={() => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid",
                  alignItems: "center",
                }}
              >
                <div style={{}}>Total : </div>
                <strong style={{ textAlign: "right" }}>
                  ৳
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </div>
            )}
          />
        </Col>
      </Row>

      <Row justify="end" style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          size="large"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Place Order
        </Button>
      </Row>
    </div>
  );
};

export default CheckoutPage;
