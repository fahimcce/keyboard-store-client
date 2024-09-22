import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Table,
  Image,
  Popconfirm,
  notification,
  Row,
  Col,
  Layout,
} from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../redux/features/productsApi/productApi";
import AddProductForm from "../../components/ui/AddProductForm";

const { Content } = Layout;

interface Product {
  _id: string;
  Title: string;
  Brand: string;
  Price: number;
  Image: string;
}

const ProductManagement = () => {
  const { data: productsData, isLoading } = useGetAllProductsQuery(undefined);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleUpdateProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

  const onFinish = async (values: Product) => {
    if (currentProduct) {
      await updateProduct({ id: currentProduct._id, ...values });
      setIsModalVisible(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    notification.success({ message: "Product deleted successfully!" });
  };

  if (isLoading) return <div>Loading...</div>;

  const columns = [
    {
      title: "Product Name",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      key: "Brand",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (text: string | undefined) => (
        <Image width={50} src={text} alt="Product" />
      ),
    },
    {
      title: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: unknown, record: Product) => (
        <>
          <Button
            type="primary"
            onClick={() => handleUpdateProduct(record)}
            style={{ marginBottom: "10px" }}
            block
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              block
              style={{
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff7875"; // Lighter shade on hover
                e.currentTarget.style.borderColor = "#ff7875";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ff4d4f"; // Reset to original color
                e.currentTarget.style.borderColor = "#ff4d4f";
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{ padding: "20px", margin: "0 auto", maxWidth: "1200px" }}
      >
        <div style={{ textAlign: "center" }}>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "20px" }}
          >
            <Col xs={24} sm={12}>
              <h3>Manage Your Products</h3>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: "right" }}>
              <AddProductForm />
            </Col>
          </Row>
          <Table
            dataSource={productsData?.data?.result || []}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            style={{ margin: "0 auto" }}
            scroll={{ x: 600 }}
          />

          {/* Update Product Modal */}
          {currentProduct && (
            <Modal
              title="Update Product"
              open={isModalVisible}
              onCancel={handleModalCancel}
              footer={null}
            >
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  Title: currentProduct.Title,
                  Price: currentProduct.Price,
                  Brand: currentProduct.Brand,
                  Image: currentProduct.Image,
                }}
              >
                <Form.Item
                  label="Product Name"
                  name="Title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the product name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Brand"
                  name="Brand"
                  rules={[
                    { required: true, message: "Please enter the brand name" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="Price"
                  rules={[
                    { required: true, message: "Please enter the price" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Image URL"
                  name="Image"
                  rules={[
                    { required: true, message: "Please enter the image URL" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Update Product
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProductManagement;
