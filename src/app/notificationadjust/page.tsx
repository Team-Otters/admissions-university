"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
interface IFormData {
  notiTitle: string;
  notiSubject: string;
  content: string;
}

const NotiAdjustPage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    notiTitle: "",
    notiSubject: "",
    content: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission here
    console.log(formData);
    setFormData({
      notiTitle: "",
      notiSubject: "",
      content: "",
    });
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      <h1>Chỉnh sửa thông báo </h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formNotiTitle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="notiTitle"
                placeholder="Nhập tiêu đề"
                value={formData.notiTitle}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formNotiSubject">
              <Form.Label>Đối tượng</Form.Label>
              <Form.Control
                type="text"
                name="NotiSubject"
                placeholder="Nhập đối tượng"
                value={formData.notiSubject}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group
              controlId="formContent"
              className="flex-1 flex flex-col"
            >
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
              Xác nhận
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="light" type="button">
              Hủy
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NotiAdjustPage;
