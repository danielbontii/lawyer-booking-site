import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "animate.css";
import { Container, Row, Col } from "react-bootstrap";
import DashboardHeader from "../components/DashboardHeader";
import ClientCard from "../components/ClientCard";
import CaseFile from "../components/CaseFile";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../apibase";

const LawyerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [caseToView, setCaseToView] = useState([]);
  const [showCase, setShowCase] = useState(false);

  useEffect(() => {
    const getCases = async () => {
      try {
        const lawyerId = localStorage.getItem("lawyerId");
        const response = await axios.get(
          `${API_BASE}/lba/api/v1/bookings/` + lawyerId
        );

        if (response) {
          setCases(response.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getCases();
  }, []);

  const handleViewCase = (id) => {
    setCaseToView(
      cases.filter((lawCase) => {
        return lawCase.id === id;
      })
    );
    setShowCase(true);
  };

  const handleCloseCase = () => {
    setShowCase(false);
  };

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ X: window.innerWidth, transition: { duration: 1 } }}
    >
      {showCase && (
        <div className="show-profile-active animate__animated animate__fadeInDownBig"></div>
      )}
      <DashboardHeader />
      {showCase && (
        <CaseFile caseToView={caseToView} handleCloseCase={handleCloseCase} />
      )}
      <Container className="my-3">
        <Row className="row-cols-lg-2 row-cols-1">
          {cases.map((lawCase, index) => {
            const {
              id,
              case_title: caseTitle,
              case_description: caseDescription,
            } = lawCase;
            const {
              first_name: firstName,
              last_name: lastName,
              other_names: otherNames,
              phone_number: phoneNumber,
              email,
            } = lawCase.client;
            return (
              <Col>
                <ClientCard
                  key={index}
                  caseTitle={caseTitle}
                  caseDescription={caseDescription}
                  firstName={firstName}
                  lastName={lastName}
                  otherNames={otherNames}
                  email={email}
                  phone={phoneNumber}
                  handleViewCase={() => handleViewCase(id)}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </motion.div>
  );
};

export default LawyerDashboard;
