import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Container, Form, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import defaultPhoto from "../images/defaultPhoto.png";

import "animate.css";

const RateLawyer = ({
  id,
  reviewerId,
  handleCloseLawyerRating,
  lawyerToRate,
}) => {
  const [formData, setFormData] = useState({
    reviewText: "",
    rating: "",
    reviewerId: "",
    id: ""
  });

  const { rating, reviewText } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await axios.post(``, formData);
        if (response) {
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    postData();
  };

  return (
    <div className="card-overlay animate__animated animate__fadeInDown rounded">
      {lawyerToRate.map((lawyer) => {
        const { id, firstName, lastName, otherNames, photo } = lawyer;
        return (
          <div>
            <>
              <Row
                className="mt-5 align-items-center sticky-top bg-white"
                key={id}
              >
                <Col>
                  <img
                    src={photo === "" ? defaultPhoto : photo}
                    alt="Lawyer"
                    className="view-profile-photo ms-3"
                  />
                </Col>
                <Col className="col-lg-8 col-6 text-uppercase">
                  <h4 className="fs-lg-4 fs-6">
                    Rate {firstName} {otherNames !== "" && otherNames}
                    {lastName}
                  </h4>
                </Col>
                <Col>
                  <FaTimes
                    className="fs-3 close-btn"
                    onClick={handleCloseLawyerRating}
                  />
                </Col>
              </Row>
            </>
            <Container>
              <Form noValidate className="">
                <label htmlFor="rating">Rate</label>
                <input
                  type="range"
                  class="form-control"
                  name="rating"
                  id="rating"
                  min={1}
                  max={5}
                  step={1}
                  onChange={(e) => handleChange(e)}
                  value={rating}
                />
                <textarea
                  rows="3"
                  class="form-control form-control-lg mt-4 mb-4"
                  name="reviewText"
                  id="reviewText"
                  onChange={(e) => handleChange(e)}
                  value={reviewText}
                >
                  Enter review
                </textarea>
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  SEND REVIEW
                </button>
              </Form>
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default RateLawyer;
