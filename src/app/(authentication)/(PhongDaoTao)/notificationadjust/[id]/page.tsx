"use client";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/navigation";
import { host } from "@/constants/string";
import APIFacade from "@/context/login";

const NotiAdjustPage: React.FC = ({params}) => {
  const {id} = params;
  const router = useRouter();
  const [formData, setFormData] = React.useState<Post>({
    id: "",
    day: "",
    title: "",
    content: "",
    topic: "",
  });

  const fetchData = async () => {
    try {
      const response = await APIFacade.getPost(id);
      setFormData(response);
    } catch (error) {
      console.error("Error fetching notification data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await APIFacade.updatePost(formData);
      router.back()
      console.log('Notification updated successfully');
      console.log(fetchData())
    } catch (error) {
      console.log(id, "error");
      console.error('Error updating notification:', error);
    }
    
    //window.location.href = '/notification';

  };

  const handleCancel = () => {
    window.location.href = '/notification';
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // handle form submission here
  //   const currentDate = new Date().toISOString();

  //   // Get the token from local storage
  //   const token = localStorage.getItem("accessToken");
  //   try {
  //     const response = await axios.post('http://localhost:8080/admin/notification', {
  //       ...formData,
  //       day: currentDate,
  //     }, {
  //       headers: { 
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     });

  //     console.log(response.data);
      
  //     // Reset form after successful submission
  //     setFormData({
  //       title: "",
  //       target: "",
  //       content: "",
  //     });
  //     localStorage.getItem('notificationID');
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   window.location.href = '/notification';
  // };

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
            <Button variant="light" type="button" onClick={handleCancel}>
              Hủy
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NotiAdjustPage;
