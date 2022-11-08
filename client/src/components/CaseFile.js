import React from 'react'
import { FaTimes } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import "animate.css";

const CaseFile = ({caseToView, handleCloseCase}) => {
  return (
    <div className="card-overlay animate__animated animate__fadeInDown rounded">
      {caseToView.map((lawCase) => {
        const {
          id,
          case_title:caseTitle,
          case_description:caseDescription,
        } = lawCase;
        return (
          <Scrollbars className="scrollbar">
            <Row
              className="mt-2 align-items-center sticky-top bg-white me-2"
              key={id}
            >
              <Col>
              </Col>
              <Col className="col-lg-8 col-6">
              </Col>
              <Col>
                <FaTimes className="fs-3 close-btn" onClick={handleCloseCase} />
              </Col>
            </Row>
            <Container className="p-4">
              <h4>{caseTitle}</h4>
              <p>{caseDescription}</p>
            </Container>
          </Scrollbars>
        );
      })}
    </div>
  );
}

export default CaseFile