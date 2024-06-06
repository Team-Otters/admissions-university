"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";

interface IFormData {
  wishChangeTime: string;
  registrationTime: string;
  admissionTime: string;
  feePayTime: string;
  personalInformationChangeTime: string;
  resultTime: string;
}

const TimeChangePage: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    wishChangeTime: "",
    registrationTime: "",
    admissionTime: "",
    feePayTime: "",
    personalInformationChangeTime: "",
    resultTime: "",
  });

  const axios = require("axios");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCodeSubmit = () => {
    console.log("Confirm Code");
  };

  const handleSubmition = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        fullName: "Ian Smith",
        numberId: "12345",
        gender: "male",
        dateOfBirth: "2023-05-22T00:00:00.000+00:00",
        phoneNumber: "0123456700",
        email: "student@gmail.com",
        placeOfBirth: "Ha Noi",
        ethnicType: "Asian",
        houseHold: "Family B",
        address: "123 Main St, Anytown USA",
        school: "THCS ABC",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/register/student",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);

      // Handle successful login based on your API's response structure
      console.log(response.data); // Example: log the response data (e.g., token, user details)
      // You can use the response data to redirect the user to a different page, store authentication tokens, etc.
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    // const allFieldsFilled = Object.values(formData).every(
    //   (value) => value.trim() !== ""
    // );
    // setFormSubmitted(true);
    // if (allFieldsFilled && formData.idImage) {
    //   setFormSubmitted(true);
    //   setAlertMessage("Form submitted successfully!");
    //   setShowAlert(true);
    //   setTimeout(() => setShowAlert(false), 3000);
    // } else {
    //   setAlertMessage("Please fill in all fields and upload the image.");
    //   setShowAlert(true);
    //   setTimeout(() => setShowAlert(false), 3000);
    //   console.log("Please fill in all fields and upload the image.");
    // }
    try {
      let data = JSON.stringify({
        wishChangeTime: formData.wishChangeTime,
        registrationTime: formData.registrationTime,
        admissionTime: formData.admissionTime,
        feePayTime: formData.feePayTime,
        personalInformationChangeTime: formData.personalInformationChangeTime,
        resultTime: "",
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/timeToChange",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "30px" }}
    >
      <>
        <h1 className="text-center">Thay đổi các mốc thời gian</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <Form.Group controlId="formWishChangeTime">
                <Form.Label className="pl-2">
                  Thời gian thay đổi nguyện vọng
                </Form.Label>
                <Form.Control
                  type="date"
                  name="wishChangeTime"
                  value={formData.wishChangeTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <Form.Group controlId="formRegistrationTime">
                <Form.Label className="pl-2">Thời gian đăng ký</Form.Label>
                <Form.Control
                  type="date"
                  name="registrationTime"
                  value={formData.registrationTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <Form.Group controlId="formAdmissionTime">
                <Form.Label className="pl-2">Thời gian xét tuyển</Form.Label>
                <Form.Control
                  type="date"
                  name="admissionTime"
                  value={formData.admissionTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <Form.Group controlId="formFeePayTime">
                <Form.Label className="pl-2">Thời gian đóng phí thi</Form.Label>
                <Form.Control
                  type="date"
                  name="feePayTime"
                  value={formData.feePayTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <Form.Group controlId="formPersonalInformationChangeTime">
                <Form.Label className="pl-2">
                  Thời gian thay đổi thông tin cá nhân
                </Form.Label>
                <Form.Control
                  type="date"
                  name="personalInformationChangeTime"
                  value={formData.personalInformationChangeTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
            <Col xs={6}>
              <Form.Group controlId="formResultTime">
                <Form.Label className="pl-2">Thời gian có kết quả</Form.Label>
                <Form.Control
                  type="date"
                  name="resultTime"
                  value={formData.resultTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3 mt-3 justify-center">
            <Col xs="auto">
              <Button className="btn-custom" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    </Container>
  );
};

export default TimeChangePage;
