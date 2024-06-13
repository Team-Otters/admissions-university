"use client";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import APIFacade from "@/context/login";
import { useAuth } from "@/hooks/useAuth";
interface user {
  username: string;
  accountName?: string;
  password: string;
  role: string;
  token: string;
}
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [userData, setUserData] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authContext = useAuth();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await APIFacade.getInstance().login(username, password);
      //createUser(newUser);
      console.log(response.data);
      // Handle successful login based on your API's response structure
      authContext?.login(response.data.role);
      await localStorage.setItem("username", username);
      await localStorage.setItem("accessToken", response.data.access_token);
      await localStorage.setItem("refreshToken", response.data.refresh_token);
      // await localStorage.setItem("role", response.data.role);
      const storedData = localStorage.getItem("accessToken");
      console.log(storedData);
      // await new Promise((resolve) =>
      //   router.push("/", undefined, { shallow: true }, resolve)
      // );
      // You can use the response data to redirect the user to a different page, store authentication tokens, etc.
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error messages)
    }
  };
  return (
    <Container
      fluid
      className="custom-container font-notoSans"
      style={{
        height: "100vh",
        paddingTop: "20px",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://tuyensinh.uit.edu.vn/sites/default/files/simplelogin/background.jpeg)",
      }}
    >
      <div className=" top-0 left-0 right-0 bottom-0 grid place-items-center ">
        <div className=" w-80 flex-col max-w-80 h-auto bg-blue-700 rounded-lg flex items-center justify-center mt-32">
          <a href="/" title="Nhà" className=" bg-white">
            <Image
              src="/images/banner_2024.png"
              alt=""
              width={350}
              height={50}
              className=" mt-2 mb-2"
            ></Image>
          </a>
          <Form className=" w-60  pt-10">
            <Form.Label className=" text-white">Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              required
            ></Form.Control>
            <div className=" pt-2 ">
              <Form.Label className=" text-white ">Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
              <Button
                variant="primary"
                type="submit"
                className=" w-60 mt-4"
                onClick={handleSubmit}
              >
                Đăng nhập
              </Button>
            </div>
          </Form>
          <div className=" mt-6 flex flex-row justify-evenly"></div>
          <p className=" text-white ">
            Quên mật khẩu?{" "}
            <a
              href="login/fogotpassword"
              className=" hover:underline text-white"
            >
              Đổi mật khẩu
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
