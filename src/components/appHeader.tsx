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
    <Navbar className="bg-dark" sticky="top">
      <Container>
        <Row className="w-100">
          <Col className="col-auto">
            <Nav defaultActiveKey="/home">
              <Nav.Link
                href="/"
                style={{ color: hoveredLinks[0] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/store"
                style={{ color: hoveredLinks[1] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={() => handleMouseLeave(1)}
              >
                Products
              </Nav.Link>
              <Nav.Link
                href="/user/history"
                style={{ color: hoveredLinks[2] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseLeave(2)}
              >
                History
              </Nav.Link>
              <Nav.Link
                href="/shoppingcart"
                style={{ color: hoveredLinks[3] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={() => handleMouseLeave(3)}
              >
                Shopping Cart
              </Nav.Link>
              <Nav.Link
                href="/user"
                style={{ color: hoveredLinks[4] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={() => handleMouseLeave(4)}
              >
                Personal
              </Nav.Link>
            </Nav>
          </Col>
          <Col className="col-auto ml-auto">
            <ImageActionButton
              imageUrl="/Group.png"
              onClick={handleButtonClick1}
              alt="Buttonsdadasdas Image"
            />
            <ImageActionButton
              imageUrl="/Cart.png"
              onClick={handleButtonClick}
              alt="Button Image"
            />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
