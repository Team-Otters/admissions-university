"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
interface IFormData {
  password: string;
  password1: string;
}

const ChangePasswordPage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    password: "",
    password1: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission here
    console.log(formData);
    setFormData({
        password: "",
        password1: "",
    });
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      <h1>Đổi mật khẩu</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPassword1">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Đổi mật khẩu
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ChangePasswordPage;
