import React from "react";
import { FaEnvelope, FaPhoneAlt, FaStar } from "react-icons/fa";
import { Row, Col, Card } from "react-bootstrap";

const ProfileCard = ({
  id,
  firstName,
  lastName,
  otherNames,
  rating,
  email,
  phone,
  photo,
  handleViewProfile,
  handleRateLawyer
}) => {
  return (
    <div>
      <Col className="card rounded">
        <Card className="p-2">
          <Row className="align-items-center">
            <Col className="col-3">
              <img src={photo} alt="" className="card-img-left rounded photo" />
            </Col>
            <Col className="ps-4">
              <div className="card-body">
                <h2 className="card-title fs-3 my-3">
                  {firstName} {otherNames !== "" && otherNames} {lastName}
                </h2>
                <div className="card-subtitle">
                  <FaEnvelope className="pe-2 fs-4" />
                  {email}
                </div>
                <div className="card-subtitle">
                  <FaPhoneAlt className="pe-2 fs-4" />
                  {phone}
                </div>
                <div className="card-subtitle text-end">
                  {[...Array(rating)].map((e, index) => (
                    <span key={index}>
                      <FaStar />
                    </span>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          <div className="card-text py-3">
            <Row>
              <Col>
                <button className="btn btn-primary">BOOK LAWYER</button>
              </Col>
              <Col>
                <button className="btn btn-outline-primary" onClick={(id) => handleRateLawyer(id)}>RATE LAWYER</button>
              </Col>
              <Col>
                <button
                  className="btn btn-link"
                  onClick={(id) => handleViewProfile(id)}
                >
                  VIEW PROFILE
                </button>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </div>
  );
};

export default ProfileCard;
