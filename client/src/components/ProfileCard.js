import React from "react";
import { FaEnvelope, FaPhoneAlt, FaStar } from "react-icons/fa";
import { Row, Col, Card } from "react-bootstrap";

const ProfileCard = ({
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
            <Col className="col-lg-3 col-12">
              <img src={photo} alt="" className="card-img-lg-left card-img-top rounded photo" />
            </Col>
            <Col className="ps-4">
              <div className="card-body">
                <h2 className="card-title fs-lg-3 fs-5 my-3">
                  {firstName} {otherNames !== "" && otherNames} {lastName}
                </h2>
                <div className="card-subtitle">
                  <FaEnvelope className="pe-2 fs-lg-4 fs-3" />
                  {email}
                </div>
                <div className="card-subtitle">
                  <FaPhoneAlt className="pe-2 fs-lg-4 fs-3" />
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
            <Row className="row-cols-1 row-cols-md-3 gy-3">
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
