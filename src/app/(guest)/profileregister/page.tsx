"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";

interface IFormData {
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
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

const ProfileRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
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
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardname, setSelectedWardName] = useState("");
  const host = "https://vapi.vnappmob.com/api/province/";
  const callAPI = (api: string) => {
    axios.get(api).then((response) => {
      setCities(response.data);
    });
  };
  const callApiDistrict = (api: string) => {
    axios.get(api).then((response) => {
      setDistricts(response.data.districts);
      setSelectedCityName(response.data.name);
    });
  };
  const callApiWard = (api: string) => {
    axios.get(api).then((response) => {
      setWards(response.data.wards);
      setSelectedDistrictName(response.data.name);
    });
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityCode = event.target.value;
    setSelectedCity(cityCode);
    setSelectedDistrict("");
    setSelectedWard("");
    setSelectedDistrictName("");
    setSelectedWardName("");
    if (cityCode) {
      callApiDistrict(`${host}p/${cityCode}?depth=2`);
    }
  };
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard("");
    setSelectedWardName("");
    if (districtCode) {
      callApiWard(`${host}d/${districtCode}?depth=2`);
    }
  };
  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(event.target.value);
    let wName = wards.findLast((w) => w.code == event.target.value);
    wName = wName.name;
    setSelectedWardName(wName || "");
    // console.log({
    //   citycode: selectedCityName,
    //   dtcode: selectedDistrictName,
    //   wcode: wName,
    // });
  };

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
  const handleCodeSubmit = () => {
    console.log("Confirm Code");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setFormSubmitted(true);
    if (allFieldsFilled && formData.idImage) {
      setFormSubmitted(true);
      setAlertMessage("Form submitted successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setAlertMessage("Please fill in all fields and upload the image.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      console.log("Please fill in all fields and upload the image.");
    }
  };
  React.useEffect(() => {
    // callAPI(`${host}p?depth=2`);
    callAPI(`${host}`);
  }, []);

  return (
    <Container
      fluid
      className="font-notoSans"
      style={{ height: "100vh", paddingTop: "20px" }}
    >
      {formSubmitted ? (
        <div style={{ textAlign: "center", marginTop: "10%" }}>
          <h1>Nhập thông tin thành công</h1>
          <p>Hãy nhập mã xác nhận được gửi qua email bạn dùng để đăng ký:</p>
          <Form className="flex items-center justify-evenly">
            <Form.Group
              className="col-xl-5 justify-self-center "
              controlId="formBlankField"
            >
              <Form.Control type="text" placeholder="Nhập mã xác nhận" />
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            type="submit"
            className="mt-6"
            onClick={handleCodeSubmit}
          >
            Submit
          </Button>
        </div>
      ) : (
        <>
          <h1>Đăng ký hồ sơ</h1>
          <Form onSubmit={handleSubmit}>
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
                </Row>
                <Row className="mb-3">
                  <Form.Group controlId="formPlaceOfBirth">
                    <Form.Label className="pl-2">Nơi sinh</Form.Label>
                    <Form.Control
                      as="select"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
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
                        onChange={handleFileChange}
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
                    onChange={handleChange}
                    required
                  >
                    {cities.map((city: any) => (
                            <option
                              key={city.code}
                              value={city.code}
                              id="tinh"
                              name="tinh"
                            >
                              {city.name}
                            </option>
                          ))}
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
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 justify-center"></Row>
            <Row className="justify-center">
              <Col xs="auto">
                <Button className="btn-custom" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ProfileRegisterPage;
