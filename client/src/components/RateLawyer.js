import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Container, Form, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import defaultPhoto from "../images/defaultPhoto.png";
import { API_BASE } from "../apibase";

import "animate.css";

const RateLawyer = ({
  id,
  reviewerId,
  handleCloseLawyerRating,
  lawyerToRate,
}) => {
  const [formData, setFormData] = useState({
    review: "",
    rating: "",
    reviewerId: "",
    id: "",
  });

  const { rating, review } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await axios.post(`${API_BASE}/review`, {...formData, reviewerId: localStorage.getItem("id"), lawyerId: id});
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
        const { id } = lawyer;
        const {
          first_name: firstName,
          last_name: lastName,
          other_names: otherNames,
          image_url: photo,
        } = lawyer.profile;
        return (
          <div>
            <>
              <Row
                className="mt-5 align-items-center sticky-top bg-white"
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
                  value={review}
                >
                  Enter review
                </textarea>
                <button
                  className="btn btn-primary"
                  onClick={(e, id) => handleSubmit(e, id)}
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
