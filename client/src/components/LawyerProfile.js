import { FaTimes, FaStar } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import defaultPhoto from "../images/defaultPhoto.png";
import {Scrollbars} from 'react-custom-scrollbars'
import "animate.css";


const LawyerProfile = ({ handleCloseLawyerProfile, lawyerToShow }) => {
  return (
    <div className="card-overlay animate__animated animate__fadeInDown rounded">
      {lawyerToShow.map((lawyer) => {
        const {
          id,
          firstName,
          lastName,
          otherNames,
          email,
          phone,
          description,
          photo,
          reviews,
        } = lawyer;
        return (
          <Scrollbars className="scrollbar">
            <Row
              className="mt-2 align-items-center sticky-top bg-white"
              key={id}
            >
              <Col>
                <img
                  src={photo === "" ? defaultPhoto : photo}
                  alt="Lawyer"
                  className="view-profile-photo ms-3"
                />
              </Col>
              <Col className="col-8 text-uppercase">
                <h4 className="fs-5">
                  {firstName} {otherNames !== "" && otherNames} {lastName}'s
                  Profile
                </h4>
              </Col>
              <Col>
                <FaTimes
                  className="fs-3 close-btn"
                  onClick={handleCloseLawyerProfile}
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
              <p>{description}</p>
            </Container>
            <Container className="p-4">
              <div>
                {reviews.map((review, index) => {
                  const { reviewerName, reviewerPhoto, reviewText, rating } =
                    review;

                  return (
                    <div key={index}>
                      <Row className="align-items-center">
                        <Col className="col-2">
                          <img
                            src={
                              reviewerPhoto === ""
                                ? defaultPhoto
                                : reviewerPhoto
                            }
                            alt=""
                            className="reviewer-photo"
                          />
                        </Col>
                        <Col>
                          <p className="mb-0">{reviewerName}</p>
                        </Col>
                      </Row>
                      <p>
                        {[...Array(rating)].map((e, index) => (
                          <span key={index}>
                            <FaStar />
                          </span>
                        ))}
                      </p>
                      <p>{reviewText}</p>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Scrollbars>
        );
      })}
    </div>
  );
};

export default LawyerProfile;
