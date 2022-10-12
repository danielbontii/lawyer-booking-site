import React from 'react'
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaSignOutAlt
} from "react-icons/fa";



const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <header className="sticky-top">
      <div className="contact">
        <Container>
          <Row className="d-flex align-content-center">
            <Col className="col-lg-2 col-sm-3">
              <p>
                <FaPhoneAlt className="pe-2 fs-2" />
                +233 553 936 239
              </p>
            </Col>
            <Col className="col-lg-3 col-sm-6">
              <FaEnvelope className="pe-2 fs-2" />
              pearsonspecterlit@gmail.com
            </Col>
            <Col className="col-lg-4 col-sm-1"></Col>
            <Col className="col-lg-3 d-sm-none d-lg-inline">
              <Row>
                <Col>
                  <FaFacebook className="fs-4" />
                </Col>
                <Col>
                  <FaLinkedin className="fs-4" />
                </Col>
                <Col>
                  <FaTwitter className="fs-4" />
                </Col>
                <Col>
                  <FaInstagram className="fs-4" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand">
            Logo
          </Navbar.Brand>
          <FaSignOutAlt className="fs-1 logout-btn" onClick={handleLogout} />
        </Container>
      </Navbar>
    </header>
  );
}

export default DashboardHeader