import { Form, Input, Button, notification } from "antd";
import "../../styles/ContactUs.css";

const ContactUs = () => {
  const [form] = Form.useForm(); // To control form reset

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log("Form Data: ", values);

    notification.success({
      message: "Submission Successful!",
      description: "Thank you for reaching out. We will get back to you soon.",
      placement: "topRight",
      duration: 2, // Notification duration in seconds
    });

    form.resetFields();
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We'd love to hear from you! Reach out to us with any questions or
        feedback.
      </p>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            <strong>Email:</strong> support@example.com
          </p>
          <p>
            <strong>Phone:</strong> +123 456 7890
          </p>
          <p>
            <strong>Address:</strong> 123 Main Street, Dhaka, Bangladesh
          </p>

          {/* Social Media */}
          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a
                href="https://www.facebook.com"
                className="social-icon facebook"
              >
                Facebook
              </a>
              <a href="https://www.twitter.com" className="social-icon twitter">
                Twitter
              </a>
              <a href="#" className="social-icon instagram">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <Form
            form={form}
            name="contactForm"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} placeholder="Your Message" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
