"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container, Alert } from "react-bootstrap";

interface IFormData {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  userName: string;
  password: string;
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
  const [formData, setFormData] = useState<IFormData>({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    userName: "",
    password: "",
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

  const [initialFormData, setInitialFormData] = useState<IFormData>(formData);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8081/profile/all-profile',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHVkZW50QGdtYWlsLmNvbSIsImlhdCI6MTcxNzUyMzc0OCwiZXhwIjoxNzE3NTI3MzQ4fQ.hD5nNW2J4qXdnrUJFjxgJE1GesulDqp_G2D27R_Vy6BNCX7xK7KD_tML3MruHkBY'
      }
    };

    axios.request(config)
      .then((response) => {
        const serverData = response.data[0];
        const houseHoldParts = serverData.houseHold.split(',').map(part => part.trim());
        const addressParts = serverData.adress.split(',').map(part => part.trim());
        const transformedData = {
          fullName: serverData.fullName,
          idNumber: serverData.numberId,
          dateOfBirth: serverData.dateOfBirth,
          gender: serverData.gender,
          permanentResidence1: addressParts[0]|| "",
          permanentResidence2: addressParts[3]|| "",
          permanentResidence3: addressParts[2]|| "",
          permanentResidence4: addressParts[1]|| "",
          householdAddress1: houseHoldParts[0] || "",
          householdAddress2: houseHoldParts[3] || "",
          householdAddress3: houseHoldParts[2] || "",
          householdAddress4: houseHoldParts[1] || "",
          placeOfBirth: serverData.placeOfBirth,
          ethnicity: serverData.ethnicType,
          idImage: serverData.idImage,
          secondSchool: serverData.school,
          phoneNumber: serverData.phoneNumber,
          email: serverData.email,
        };
        setFormData(transformedData);
        setInitialFormData(transformedData);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Error fetching profile data');
      });
  }, []);

  const handleEditChange = () => {
    setIsEditable(!isEditable);
  };

  const handleBack = () => {
    setFormData(initialFormData);
    setIsEditable(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleConfirm = () => {
    const transformedData = {
      "fullName": formData.fullName,
      "gender": formData.gender,
      "dateOfBirth": formData.dateOfBirth,
      "phoneNumber": formData.phoneNumber,
      "email": formData.email,
      "placeOfBirth": formData.placeOfBirth,
      "ethnicType": formData.ethnicity,
      "houseHold": `${formData.householdAddress1}, ${formData.householdAddress4}, ${formData.householdAddress3}, ${formData.householdAddress2}`,
      "address": `${formData.permanentResidence1}, ${formData.permanentResidence4}, ${formData.permanentResidence3}, ${formData.permanentResidence2}`,
      "school": formData.secondSchool,
    };
    const data = JSON.stringify(transformedData);

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:8081/profile/${formData.idNumber}`, // Assuming idNumber is the unique identifier
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHVkZW50QGdtYWlsLmNvbSIsImlhdCI6MTcxNzI4ODk1MSwiZXhwIjoxNzE3MjkyNTUxfQ.BAgaKbQVUZye0QQCY9AxTv55d8NJFekGxSYcGQ55ecAo7qD090KtSjEp0RLMc2Lt'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setInitialFormData(formData);
        setIsEditable(false);
        setSuccessMessage('Profile updated successfully');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Error updating profile');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          idImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
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
                  disabled={!isEditable}
                  onChange={handleChange}
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
                  disabled={!isEditable}
                  onChange={handleChange}
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
                    disabled={!isEditable}
                    onChange={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        gender: "Nam",
                      }))
                    }
                  />
                  <Form.Check
                    className="me-md-3 mb-2"
                    inline
                    type="checkbox"
                    label="Nữ"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === "Nữ"}
                    disabled={!isEditable}
                    onChange={() =>
                      setFormData((prevData) => ({
                        ...prevData,
                        gender: "Nữ",
                      }))
                    }
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
                  disabled={!isEditable}
                  onChange={handleChange}
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
                    disabled={!isEditable}
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            idImage: e.target?.result as string,
                          }));
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
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
                disabled={!isEditable}
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
            <Form.Group controlId="formHouseholdAddress3">
              <Form.Label className="pl-2">Quận/Huyện</Form.Label>
              <Form.Control
                as="select"
                name="householdAddress3"
                value={formData.householdAddress3}
                disabled={!isEditable}
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
            <Form.Group controlId="formHouseholdAddress4">
              <Form.Label className="pl-2">Xã/Phường</Form.Label>
              <Form.Control
                as="select"
                name="householdAddress4"
                value={formData.householdAddress4}
                disabled={!isEditable}
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
            <Form.Group controlId="formHouseholdAddress1">
              <Form.Label className="pl-2">Địa chỉ hộ khẩu</Form.Label>
              <Form.Control
                type="text"
                name="householdAddress1"
                placeholder="Nhập địa chỉ"
                value={formData.householdAddress1}
                disabled={!isEditable}
                onChange={handleChange}
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
                disabled={!isEditable}
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
              <Form.Label className="pl-2">Quận/Huyện</Form.Label>
              <Form.Control
                as="select"
                name="permanentResidence3"
                value={formData.permanentResidence3}
                disabled={!isEditable}
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
            <Form.Group controlId="formPermanentResidence4">
              <Form.Label className="pl-2">Xã/Phường</Form.Label>
              <Form.Control
                as="select"
                name="permanentResidence4"
                value={formData.permanentResidence4}
                disabled={!isEditable}
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
              <Form.Label className="pl-2">Địa chỉ thường trú</Form.Label>
              <Form.Control
                type="text"
                name="permanentResidence1"
                placeholder="Nhập địa chỉ"
                value={formData.permanentResidence1}
                disabled={!isEditable}
                onChange={handleChange}
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
                disabled={!isEditable}
                onChange={handleChange}
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
                disabled={!isEditable}
                onChange={handleChange}
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
                disabled={!isEditable}
                onChange={handleChange}
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
                disabled={!isEditable}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3 justify-center"></Row>
      </Form>
      <Row className="justify-content-center">
        {!isEditable ? (
          <Col xs="auto">
            <Button variant="dark" onClick={handleEditChange}>
              Thay đổi thông tin
            </Button>
          </Col>
        ) : (
          <>
            <Col xs="auto">
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="dark" onClick={handleConfirm}>
                Confirm
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default StudentProfilePage;
