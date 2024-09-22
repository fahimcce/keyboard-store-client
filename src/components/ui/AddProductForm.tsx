import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  notification,
  Modal,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddProductMutation } from "../../redux/features/productsApi/productApi";
import { UploadFile } from "antd/es/upload/interface";

interface FileType extends UploadFile {
  url?: string; // Optional URL property for uploaded images
}

const AddProductForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [Title, setTitle] = useState("");
  const [Brand, setBrand] = useState("");
  const [AvailableQuantity, setAvailableQuantity] = useState(0);
  const [Price, setPrice] = useState(0);
  const [Rating, setRating] = useState(0);
  const [Description, setDescription] = useState("");

  const [addProduct, { isLoading }] = useAddProductMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (info: any) => {
    const newFileList: FileType[] = info.fileList.map((file: UploadFile) => ({
      uid: file.uid,
      name: file.name,
      status: file.status,
      url: file.response ? file.response.url : undefined, // Adjust based on your upload response
      originFileObj: file.originFileObj,
    }));
    setFileList(newFileList);
  };

  const uploadImageToImgBB = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image", file.originFileObj as File);
    });

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=ad07207ae8262ceccee41d12d36d2dda",
      {
        body: formData,
        method: "POST",
      }
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url; // Return the URL of the uploaded image
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await uploadImageToImgBB();

      const productDetails = {
        Image: imageUrl,
        Title,
        Brand,
        AvailableQuantity,
        Price,
        Rating,
        Description,
      };

      await addProduct(productDetails).unwrap();
      notification.success({
        message: "Product Added",
        description: "The product has been successfully added to the database.",
      });

      setIsModalVisible(false);
      setFileList([]);
      setTitle("");
      setBrand("");
      setAvailableQuantity(0);
      setPrice(0);
      setRating(0);
      setDescription("");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error adding the product.",
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>

      <Modal
        title="Add Product"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Image" required>
            <Upload
              beforeUpload={() => false} // Disable auto upload
              onChange={handleFileChange}
              fileList={fileList}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Product Title" required>
            <Input
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </Form.Item>

          <Form.Item label="Brand" required>
            <Input
              value={Brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter brand"
            />
          </Form.Item>

          <Form.Item label="Available Quantity" required>
            <InputNumber
              value={AvailableQuantity}
              onChange={(value) => setAvailableQuantity(value as number)}
              min={0}
              placeholder="Enter available quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Price" required>
            <InputNumber
              value={Price}
              onChange={(value) => setPrice(value as number)}
              min={0}
              formatter={(value) =>
                `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Rating" required>
            <InputNumber
              value={Rating}
              onChange={(value) => setRating(value as number)}
              min={0}
              max={5}
              step={0.5}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Description" required>
            <Input.TextArea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductForm;
