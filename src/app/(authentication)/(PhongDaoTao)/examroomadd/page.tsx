"use client";
import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
interface IFormData {
  examName: string;
  roomName: string;
  dateOfExam: string;
}

const ExamRoomAddPage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    examName: "",
    roomName: "",
    dateOfExam: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission here
    console.log(formData);
    setFormData({
        examName: "",
        roomName: "",
        dateOfExam: "",
    });
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      <h1>Thêm phòng thi</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formExamName">
              <Form.Label>Môn thi</Form.Label>
              <Form.Control
                type="text"
                name="examName"
                placeholder="Nhập môn thi"
                value={formData.examName}
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
            <Form.Group controlId="formRoomName">
              <Form.Label>Phòng thi</Form.Label>
              <Form.Control
                type="text"
                name="roomName"
                placeholder="Nhập phòng thi"
                value={formData.roomName}
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
            <Form.Group controlId="formDateOfExam">
              <Form.Label>Ngày thi</Form.Label>
              <Form.Control
                type="text"
                name="dateOfExam"
                placeholder="Nhập ngày thi"
                value={formData.dateOfExam}
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
              Tạo phòng thi
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ExamRoomAddPage;
