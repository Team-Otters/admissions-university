"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
interface IFormData {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  permanentResidence1: string;
  permanentResidence2: string;
  permanentResidence3: string;
  householdAddress1: string;
  householdAddress2: string;
  householdAddress3: string;
  placeOfBirth: string;
  ethnicity: string;
  idImage: string;
  secondSchool: string;
  phoneNumber: string;
  email: string;
}

const FeeManagePage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    permanentResidence1: "",
    permanentResidence2: "",
    permanentResidence3: "",
    householdAddress1: "",
    householdAddress2: "",
    householdAddress3: "",
    placeOfBirth: "",
    ethnicity: "",
    idImage: "",
    secondSchool: "",
    phoneNumber: "",
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setFormData({ ...formData, idImage: e.target?.result as string });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission here
    event.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");

    if (allFieldsFilled) {

      setFormSubmitted(true);

    } else {

      console.log("Please fill in all fields.");
    }
    console.log(formData);
    setFormData({
      fullName: "",
      idNumber: "",
      dateOfBirth: "",
      gender: "",
      permanentResidence1: "",
      permanentResidence2: "",
      permanentResidence3: "",
      householdAddress1: "",
      householdAddress2: "",
      householdAddress3: "",
      placeOfBirth: "",
      ethnicity: "",
      idImage: "",
      secondSchool: "",
      phoneNumber: "",
      email: "",
    });
  };

  return (
    <Container fluid className="custom-container font-notoSans" style={{ height: "100vh", paddingTop: "20px" }}>
      <h1>Đăng ký hồ sơ</h1>
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
              <Form.Group controlId="formHouseholdAddress1">
                <Form.Label>Địa chỉ hộ khẩu</Form.Label>
                <Form.Control
                  as="select"
                  name="householdAddress1"
                  value={formData.householdAddress1}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn địa chỉ --</option>
                  <option value="Address1">Địa chỉ 1</option>
                  <option value="Address2">Địa chỉ 2</option>

                </Form.Control>
              </Form.Group>
            </Col>
          <Col>
            <Form.Group controlId="formPermanentResidence1">
              <Form.Label>Địa chỉ thường trú</Form.Label>
              <Form.Control
                type="text"
                name="permanentResidence1"
                placeholder="Nhập địa chỉ"
                value={formData.permanentResidence1}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col />
          <Col />
          <Col>
              <Form.Group controlId="formHouseholdAddress1">
                <Form.Label>Địa chỉ hộ khẩu</Form.Label>
                <Form.Control
                  as="select"
                  name="householdAddress2"
                  value={formData.householdAddress1}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn địa chỉ --</option>
                  <option value="Address1">Địa chỉ 1</option>
                  <option value="Address2">Địa chỉ 2</option>

                </Form.Control>
              </Form.Group>
            </Col>
          <Col>
            <Form.Group controlId="formPermanentResidence2">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="permanentResidence2"
                placeholder="Nhập địa chỉ"
                value={formData.permanentResidence2}
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
            <Form.Group controlId="formGender">
              <Form.Label>Giới tính</Form.Label>
              <div className="d-flex flex-wrap">
                <Form.Check
                  className="me-md-3 mb-2"
                  inline
                  type="checkbox"
                  label="Nam"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === "Nam"}
                  onChange={handleChange}
                />
                <Form.Check
                  className="me-md-3 mb-2"
                  inline
                  type="checkbox"
                  label="Nữ"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === "Nữ"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col>
              <Form.Group controlId="formHouseholdAddress1">
                <Form.Label>Địa chỉ hộ khẩu</Form.Label>
                <Form.Control
                  as="select"
                  name="householdAddress3"
                  value={formData.householdAddress1}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn địa chỉ --</option>
                  <option value="Address1">Địa chỉ 1</option>
                  <option value="Address2">Địa chỉ 2</option>

                </Form.Control>
              </Form.Group>
            </Col>
          <Col>
            <Form.Group controlId="formPermanentResidence3">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="permanentResidence3"
                placeholder="Nhập địa chỉ"
                value={formData.permanentResidence3}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPlaceOfBirth">
              <Form.Label>Nơi sinh</Form.Label>
              <Form.Control
                type="text"
                name="placeOfBirth"
                placeholder="Nhập nơi sinh"
                value={formData.placeOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEthnicity">
              <Form.Label>Dân tộc</Form.Label>
              <Form.Control
                type="text"
                name="ethnicity"
                placeholder="Nhập dân tộc"
                value={formData.ethnicity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formSecondSchool">
              <Form.Label>Trường THCS</Form.Label>
              <Form.Control
                type="text"
                name="secondSchool"
                placeholder="Nhập trường THCS"
                value={formData.secondSchool}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col />
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Số Điện Thoại</Form.Label>
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
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              controlId="formIDImage"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ marginRight: "10px" }}>
                <Form.Label>Ảnh CCCD/CMND</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              {formData.idImage && (
                <img
                  src={formData.idImage}
                  alt="Uploaded Image"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Form.Group>
          </Col>
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

export default FeeManagePage;
