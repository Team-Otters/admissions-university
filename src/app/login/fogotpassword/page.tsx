"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Input from "postcss/lib/input";


const FogotPasswordPage = () => {

    return (
        <Container fluid className="custom-container font-notoSans" style={{ height: "100vh", paddingTop: "20px", backgroundSize: "cover" ,  backgroundImage: 'url(https://tuyensinh.uit.edu.vn/sites/default/files/simplelogin/background.jpeg)'}}>
        <div className=" top-0 left-0 right-0 bottom-0 grid place-items-center ">
            <div className=" w-80 flex-col max-w-80 h-auto bg-blue-700 rounded-lg flex items-center justify-center mt-32">      
            <a href="/" title="Nhà" className=" bg-white">
                    <Image src="/images/banner_2024.png" alt="" width={350} height={50} className=" mt-2 mb-2"></Image>
                </a>
            <Form className=" w-60  pt-10">
                <Form.Label className=" text-white">Nhập tên đăng nhập</Form.Label>
                <Form.Control                
                    type="text"
                    name="username"
                    placeholder="Nhập tên đăng nhập"
                    required>
            
                </Form.Control>
                <div className=" pt-2 " >
                <Button variant="primary" type="submit" className=" w-60 mt-4 mb-2">
                  Gửi yêu cầu
                </Button>
                </div>
            </Form>
            </div>

        </div>
        </Container>
    );
};

export default FogotPasswordPage;
