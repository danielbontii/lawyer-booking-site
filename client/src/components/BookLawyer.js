import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaTimes, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import defaultPhoto from "../images/defaultPhoto.png";
const BookLawyer = ({
  lawyerToBook,
  handleCloseBookLawyer,
  handleBookThisLawyer,
}) => {
  return (
    <div className="card-overlay animate__animated animate__fadeInDown rounded">
      {lawyerToBook.map((lawyer) => {
        const { id, email } = lawyer;
        const {
          first_name: firstName,
          last_name: lastName,
          other_names: otherNames,
          image_url: photo,
          phone_number: phone,
          daily_charge: rate,
        } = lawyer.profile;
        return (
          <div>
            <Row
              className="mt-2 align-items-center sticky-top bg-white me-2"
              key={id}
            >
              <Col>
                <img
                  src={photo === null ? defaultPhoto : photo}
                  alt="Lawyer"
                  className="view-profile-photo ms-3"
                />
              </Col>
              <Col className="col-lg-8 col-6 text-uppercase">
                <h4 className="fs-md-4 fs-6">
                  {firstName} {otherNames !== "" && otherNames} {lastName}'s
                  Profile
                </h4>
              </Col>
              <Col>
                <FaTimes
                  className="fs-3 close-btn"
                  onClick={handleCloseBookLawyer}
                />
              </Col>
            </Row>
            <Container className="p-4">
              <p className="mb-0">
                <FaEnvelope className="pe-2 fs-4" />
                {email}
              </p>
              <p>
                <FaPhoneAlt className="pe-2 fs-4" />
                {phone}
              </p>
              <p className="fs-2 my-5">{rate}</p>
              <Row>
                <Col>
                  <p>Case begins:</p>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    className="w-100"
                  />
                </Col>
                <Col>
                  <p>Case ends:</p>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    className="w-100"
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <p>Case Description: </p>
                <input
                  type="text"
                  name="case-description"
                  id="case-description"
                  className="h-5"
                />
              </Row>

              <button
                className="btn btn-primary mx-auto mt-5"
                onClick={handleBookThisLawyer}
              >
                BOOK
              </button>
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default BookLawyer;
