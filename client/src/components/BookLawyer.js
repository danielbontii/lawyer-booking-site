import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaTimes, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import defaultPhoto from "../images/defaultPhoto.png";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE } from "../apibase";


const BookLawyer = ({ lawyerToBook, handleCloseBookLawyer }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    caseDescription: "",
    lawyerId: "",
    clientId: "",
    amount: ""
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const {startDate, endDate, caseDescription} = formData;


  const handleBookThisLawyer = (e, id) => {
    e.preventDefault();

    const postData = async () => {
      try {
        const response = await axios.post(`${API_BASE}/bookings/book-lawyer`, {
          ...formData,
          lawyerId: id,
          clientId: localStorage.getItem("id"),
          amount:
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 3600 * 24),
        });
        if (response) {
          toast.success("Lawyer booked successfully");
        }
      } catch (error) {
        error.response.data.map((err) => toast.error(err.message));
      }
    };

    postData();
  };

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
                    name="startDate"
                    id="start-date"
                    className="w-100"
                    onChange={(e) => handleChange(e)}
                    value={startDate}
                  />
                </Col>
                <Col>
                  <p>Case ends:</p>
                  <input
                    type="date"
                    name="endDate"
                    id="end-date"
                    className="w-100"
                    onChange={(e) => handleChange(e)}
                    value={endDate}
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <p>Case Description: </p>
                <input
                  type="text"
                  name="caseDescription"
                  id="case-description"
                  className="h-5"
                  onChange={(e) => handleChange(e)}
                  value={caseDescription}
                />
              </Row>

              <button
                className="btn btn-primary mx-auto mt-5"
                onClick={(id) => handleBookThisLawyer(id)}
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
