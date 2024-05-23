"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
interface IFormData {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  yearOfExam: string;
  phoneNumber: string;
}

const ScoreTrackerPage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    fullName: "",
    idNumber: "",
    yearOfExam: "",
    dateOfBirth: "",
    phoneNumber: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission here
    console.log(formData);
    setFormData({
      fullName: "",
      idNumber: "",
      yearOfExam: "",
      dateOfBirth: "",
      phoneNumber: "",
    });
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      <h1>Tra cứu điểm thi</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formFullName">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Nhập họ tên"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formIdNumber">
              <Form.Label>CMND/CCCD</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                placeholder="Nhập CMND/CCCD"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Nhập SĐT"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formYearOfExam">
              <Form.Label>Năm thi</Form.Label>
              <Form.Control
                type="text"
                name="yearOfExam"
                placeholder="Nhập năm thi"
                value={formData.yearOfExam}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col />
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ScoreTrackerPage;
