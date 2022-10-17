import React from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Header = () => {
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
                <Col></Col>
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
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle Navigation"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Nav className="collapse navbar-collapse" id="nav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/">
                HOME
              </Link>
              <Link className="nav-link" to="/about">
                ABOUT US
              </Link>
              <Link className="nav-link" to="/register-lawyer">
                REGISTER AS LAWYER
              </Link>
              <Link className="nav-link" to="/register-client">
                REGISTER AS CLIENT
              </Link>
              <Link className="nav-link" to="/login">
                SIGN IN
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
