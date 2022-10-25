import { FaTimes, FaStar, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import defaultPhoto from "../images/defaultPhoto.png";
import { Scrollbars } from "react-custom-scrollbars";
import "animate.css";

const LawyerProfile = ({ handleCloseLawyerProfile, lawyerToShow }) => {
  return (
    <div className="card-overlay animate__animated animate__fadeInDown rounded">
      {lawyerToShow.map((lawyer) => {
        const { id, email, reviews } = lawyer;

        const {
          first_name: firstName,
          last_name: lastName,
          other_names: otherNames,
          phone_number: phone,
          summary: description,
          image_url: photo,
        } = lawyer.profile;

        return (
          <Scrollbars className="scrollbar">
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
                  const {
                    reviewer_name: reviewerName,
                    reviewer_photo: reviewerPhoto,
                    review: reviewText,
                    rating,
                  } = review;

                  return (
                    <div key={index}>
                      <Row className="align-items-center">
                        <Col className="col-1">
                          <img
                            src={
                              reviewerPhoto === null
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
