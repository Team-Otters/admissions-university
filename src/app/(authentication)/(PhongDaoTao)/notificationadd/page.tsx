"use client";
import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface IFormData {
  title: string;
  target: string;
  content: string;
}

const NotiAddPage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    title: "",
    target: "",
    content: "",
  });
const router = useRouter()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Capture the current date and time
    const currentDate = new Date().toISOString();

    // Get the token from local storage
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post('http://localhost:8080/admin/notification', {
        ...formData,
        day: currentDate,
      }, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log(response.data);
      
      // Reset form after successful submission
      setFormData({
        title: "",
        target: "",
        content: "",
      });
router.push("/notification")
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      <h1>Thêm thông báo</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Nhập tiêu đề"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTarget">
              <Form.Label>Đối tượng</Form.Label>
              <Form.Control
                type="text"
                name="target"
                placeholder="Nhập đối tượng"
                value={formData.target}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formContent" className="flex-1 flex flex-col">
              <Form.Label className="mb-2">Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                placeholder="Nhập nội dung"
                value={formData.content}
                onChange={handleChange}
                required
                className="h-72 resize-none p-2 align-top"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Thêm thông báo
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NotiAddPage;
