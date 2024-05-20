"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ImageActionButton from "./ImageButton";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AppHeader = () => {
  const path = usePathname();
  const router = useRouter();
  const [hoveredLinks, setHoveredLinks] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleButtonClick1 = () => {
    if (!path.includes("user")) router.push("/user");
  };
  const handleButtonClick = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredLinks((prevHoveredLinks) => {
      const updatedHoveredLinks = [...prevHoveredLinks];
      updatedHoveredLinks[index] = true;
      return updatedHoveredLinks;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredLinks((prevHoveredLinks) => {
      const updatedHoveredLinks = [...prevHoveredLinks];
      updatedHoveredLinks[index] = false;
      return updatedHoveredLinks;
    });
  };
  return (
    <div className="header-wrapper">
      <Navbar className="bg-white font-notoSans shadow-md" sticky="top">
        <Container>
          <Row className="w-100 align-items-center">
            <Col className="col-auto">
              <Navbar
                expand="lg"
                style={{ maxHeight: "60px", maxWidth: "400px" }}
              >
                <Container>
                  <Navbar.Brand
                    href="/"
                    style={{
                      maxWidth: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt=""
                      src="/images/icon.png"
                      width="40"
                      height="40"
                      className="d-inline-block align-top mr-2"
                      style={{ marginRight: "10px" }}
                    />
                    <span style={{ fontSize: "20px", whiteSpace: "normal" }}>
                      Trường Trung học Phổ thông Chuyên UIT{" "}
                    </span>
                  </Navbar.Brand>
                </Container>
              </Navbar>
            </Col>

            <Col className="col-auto">
              <Nav defaultActiveKey="/home">
                <Nav.Link
                  href="/"
                  style={{
                    color: hoveredLinks[0]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                >
                  Trang Chủ
                </Nav.Link>
                <Nav.Link
                  href="/store"
                  style={{
                    color: hoveredLinks[1]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                >
                  Giới thiệu
                </Nav.Link>
                <Nav.Link
                  href="/user/history"
                  style={{
                    color: hoveredLinks[2]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(2)}
                  onMouseLeave={() => handleMouseLeave(2)}
                >
                  Thành Tựu
                </Nav.Link>
                <Nav.Link
                  href="/shoppingcart"
                  style={{
                    color: hoveredLinks[3]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(3)}
                  onMouseLeave={() => handleMouseLeave(3)}
                >
                  Tra Cứu
                </Nav.Link>
                <Nav.Link
                  href="/user"
                  style={{
                    color: hoveredLinks[4]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(4)}
                  onMouseLeave={() => handleMouseLeave(4)}
                >
                  Tin Tức
                </Nav.Link>
              </Nav>
            </Col>
            <Col className="col-auto ml-auto">
              <Nav>
                <Nav.Link
                  href="/user"
                  style={{
                    color: hoveredLinks[5]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(5)}
                  onMouseLeave={() => handleMouseLeave(5)}
                >
                  Đăng Nhập
                </Nav.Link>
                <Nav.Link
                  href="/user"
                  style={{
                    color: hoveredLinks[6]
                      ? "var(--mainBlueColor)"
                      : "var(--dustyGray)",
                  }}
                  onMouseEnter={() => handleMouseEnter(6)}
                  onMouseLeave={() => handleMouseLeave(6)}
                >
                  Đăng Ký
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppHeader;
