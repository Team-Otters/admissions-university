"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import AuthContext from "@/context/AuthContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const { logout } = useContext(AuthContext);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    // const user = localStorage.getItem("username");

    // console.log("Token:", token);
    // console.log("Username:", user);

    // if (token != null && user != null) {
    //   setIsLoggedIn(true);
    //   setUsername(user);
    // } else {
    //   setIsLoggedIn(false);
    // }
    if (role != "Khach") {
      setIsLoggedIn(true);
      const user = localStorage.getItem("username");
      setUsername(user);
    } else {
      setIsLoggedIn(false);
    }
  }, [role]);

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const handleConfirmSignOut = () => {
    logout();
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("username");
    // localStorage.setItem("role", "Khach");
    setIsLoggedIn(false);
    console.log(localStorage.getItem("accessToken"));
    setShowSignOutModal(false);
    redirect("");
  };

  const handleCancelSignOut = () => {
    setShowSignOutModal(false);
  };

  const handleMouseEnter = (index: any) => {
    setHoveredLinks((prevHoveredLinks) => {
      const updatedHoveredLinks = [...prevHoveredLinks];
      updatedHoveredLinks[index] = true;
      return updatedHoveredLinks;
    });
  };

  const handleMouseLeave = (index: any) => {
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
                  href="/introduction"
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
                  href="/achievement"
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
                  href="/news"
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
                {isLoggedIn ? (
                  <>
                    <Nav.Link
                      href="/studentprofile"
                      style={{
                        color: hoveredLinks[5]
                          ? "var(--mainBlueColor)"
                          : "var(--dustyGray)",
                      }}
                      onMouseEnter={() => handleMouseEnter(5)}
                      onMouseLeave={() => handleMouseLeave(5)}
                    >
                      {username}
                    </Nav.Link>
                    <Nav.Link
                      href="#"
                      onClick={handleSignOut}
                      style={{
                        color: hoveredLinks[6]
                          ? "var(--mainBlueColor)"
                          : "var(--dustyGray)",
                      }}
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={() => handleMouseLeave(6)}
                    >
                      Đăng xuất
                    </Nav.Link>
                    <Nav.Link
                      href="/profileregister"
                      style={{
                        color: hoveredLinks[6]
                          ? "var(--mainBlueColor)"
                          : "var(--dustyGray)",
                      }}
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={() => handleMouseLeave(6)}
                    >
                      Đăng Ký Hồ Sơ
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      href="/login"
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
                      href="/profileregister"
                      style={{
                        color: hoveredLinks[6]
                          ? "var(--mainBlueColor)"
                          : "var(--dustyGray)",
                      }}
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={() => handleMouseLeave(6)}
                    >
                      Đăng Ký Hồ Sơ
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Modal show={showSignOutModal} onHide={handleCancelSignOut}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSignOut}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmSignOut}>
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppHeader;
