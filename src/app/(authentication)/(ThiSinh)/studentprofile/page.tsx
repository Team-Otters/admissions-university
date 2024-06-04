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
  userName:string;
  password:string;
  permanentResidence1: string;
  permanentResidence2: string;
  permanentResidence3: string;
  permanentResidence4: string;
  householdAddress1: string;
  householdAddress2: string;
  householdAddress3: string;
  householdAddress4: string;
  placeOfBirth: string;
  ethnicity: string;
  idImage: string;
  secondSchool: string;
  phoneNumber: string;
  email: string;
}

const StudentProfilePage: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    userName:"",
    password:"",
    permanentResidence1: "",
    permanentResidence2: "",
    permanentResidence3: "",
    permanentResidence4: "",
    householdAddress1: "",
    householdAddress2: "",
    householdAddress3: "",
    householdAddress4: "",
    placeOfBirth: "",
    ethnicity: "",
    idImage: "",
    secondSchool: "",
    phoneNumber: "",
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState<boolean>(false);

  const handlePasswordChange = () => {
    setIsPasswordEditable(!isPasswordEditable);
  };

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      <h1>Thông tin học sinh</h1>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Row className="mb-3  min-h-20">
                  <Form.Group controlId="formFullName">
                    <Form.Label className="pl-2">Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Nhập họ tên"
                      value={formData.fullName}
                      disabled
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="formDateOfBirth">
                    <Form.Label className="pl-2">Ngày sinh</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      disabled
                      required
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="mb-3 min-h-20">
                  <Form.Group controlId="formGender">
                    <Form.Label className="pl-2">Giới tính</Form.Label>
                    <div className="d-flex flex-wrap">
                      <Form.Check
                        className="me-md-3 mb-2"
                        inline
                        type="checkbox"
                        label="Nam"
                        name="gender"
                        value="Nam"
                        checked={formData.gender === "Nam"}
                        disabled
                      />
                      <Form.Check
                        className="me-md-3 mb-2"
                        inline
                        type="checkbox"
                        label="Nữ"
                        name="gender"
                        value="Nữ"
                        checked={formData.gender === "Nữ"}
                        disabled
                      />
                    </div>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="formPlaceOfBirth">
                    <Form.Label className="pl-2">Nơi sinh</Form.Label>
                    <Form.Control
                      as="select"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      disabled
                      required
                    >
                      <option value="">-- Chọn nơi sinh --</option>
                      <option value="Address1">Địa chỉ 1</option>
                      <option value="Address2">Địa chỉ 2</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Col>
              <Col xs="auto" className="justify-center">
                <Form.Group
                  controlId="formIDImage"
                  className="flex flex-col items-start"
                >
                  {!formData.idImage ? (
                    <div className="mb-2.5">
                      <Form.Label className="pl-2 justify-self-center">
                        Ảnh Thẻ
                      </Form.Label>
                      <Form.Control
                        type="file"
                        disabled
                        accept="image/*"
                      />
                    </div>
                  ) : (
                    <div className="mb-2.5">
                      <Form.Label className="pl-2">Ảnh Thẻ</Form.Label>
                      <img
                        src={formData.idImage}
                        alt="Uploaded Image"
                        className="mt-2 max-w-36 max-h-36"
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formHouseholdAddress2">
                  <Form.Label className="pl-2">Tỉnh/Thành Phố</Form.Label>
                  <Form.Control
                    as="select"
                    name="householdAddress2"
                    value={formData.householdAddress2}
                    disabled
                    required
                  >
                    <option value="">-- Chọn địa chỉ --</option>
                    <option value="Address1">Địa chỉ 1</option>
                    <option value="Address2">Địa chỉ 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHouseholdAddress3">
                  <Form.Label className="pl-2">Quận/Huyện</Form.Label>
                  <Form.Control
                    as="select"
                    name="householdAddress3"
                    value={formData.householdAddress3}
                    disabled
                    required
                  >
                    <option value="">-- Chọn địa chỉ --</option>
                    <option value="Address1">Địa chỉ 1</option>
                    <option value="Address2">Địa chỉ 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHouseholdAddress4">
                  <Form.Label className="pl-2">Xã/Phường</Form.Label>
                  <Form.Control
                    as="select"
                    name="householdAddress4"
                    value={formData.householdAddress4}
                    disabled
                    required
                  >
                    <option value="">-- Chọn địa chỉ --</option>
                    <option value="Address1">Địa chỉ 1</option>
                    <option value="Address2">Địa chỉ 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formHouseholdAddress1">
                  <Form.Label className="pl-2">Địa chỉ hộ khẩu</Form.Label>
                  <Form.Control
                    type="text"
                    name="householdAddress1"
                    placeholder="Nhập địa chỉ"
                    value={formData.householdAddress1}
                    disabled
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formPermanentResidence2">
                  <Form.Label className="pl-2">Tỉnh/Thành Phố</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentResidence2"
                    value={formData.permanentResidence2}
                    disabled
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
                  <Form.Label className="pl-2">Quận/Huyện</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentResidence3"
                    value={formData.permanentResidence3}
                    disabled
                    required
                  >
                    <option value="">-- Chọn địa chỉ --</option>
                    <option value="Address1">Địa chỉ 1</option>
                    <option value="Address2">Địa chỉ 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPermanentResidence4">
                  <Form.Label className="pl-2">Xã/Phường</Form.Label>
                  <Form.Control
                    as="select"
                    name="permanentResidence4"
                    value={formData.permanentResidence4}
                    disabled
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
                  <Form.Label className="pl-2">Địa chỉ thường trú</Form.Label>
                  <Form.Control
                    type="text"
                    name="permanentResidence1"
                    placeholder="Nhập địa chỉ"
                    value={formData.permanentResidence1}
                    disabled
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formEthnicity">
                  <Form.Label className="pl-2">Dân tộc</Form.Label>
                  <Form.Control
                    type="text"
                    name="ethnicity"
                    placeholder="Nhập dân tộc"
                    value={formData.ethnicity}
                    disabled
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formSecondSchool">
                  <Form.Label className="pl-2">Trường THCS</Form.Label>
                  <Form.Control
                    type="text"
                    name="secondSchool"
                    placeholder="Nhập trường THCS"
                    value={formData.secondSchool}
                    disabled
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label className="pl-2">Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Nhập SĐT"
                    value={formData.phoneNumber}
                    disabled
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label className="pl-2">Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    disabled
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 justify-center"></Row>
          </Form>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="dark" onClick={handlePasswordChange}>
              {isPasswordEditable ? "Xác nhận" : "Đổi mật khẩu"}
            </Button>
          </Col>
        </Row>
    </Container>
  );
};

export default StudentProfilePage;
