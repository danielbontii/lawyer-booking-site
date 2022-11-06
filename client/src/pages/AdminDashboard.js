import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "animate.css";
import { Row, Col } from "react-bootstrap";
import DashboardHeader from "../components/DashboardHeader";
import ClientLawyerCard from "../components/ClientLawyerCard";
import CaseFile from "../components/CaseFile";

import VerifiedLawyers from "../components/VerifiedLawyers";
import UnverifiedLawyers from "../components/UnverifiedLawyers";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../apibase";

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [caseToView, setCaseToView] = useState([]);
  const [showCase, setShowCase] = useState(false);
  const [showVerifiedLawyers, setShowVerifiedLawyers] = useState(false);
  const [showUnverifiedLawyers, setShowUnverifiedLawyers] = useState(false);
  const [showCases, setShowCases] = useState(true);

  useEffect(() => {
    const getCases = async () => {
      try {
        const response = await axios.get(`${API_BASE}/lba/api/v1/bookings`);

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

  const handleShowVerifiedLawyers = () => {
    setShowVerifiedLawyers(true);
    setShowUnverifiedLawyers(false);
    setShowCases(false);
  };

  const handleShowUnverifiedLawyers = () => {
    setShowVerifiedLawyers(false);
    setShowUnverifiedLawyers(true);
    setShowCases(false);
  };

  const handleShowCases = () => {
    setShowVerifiedLawyers(false);
    setShowUnverifiedLawyers(false);
    setShowCases(true);
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
      <div className="side-panel bg-primary w-25 text-white fs-3 ps-5 pt-5 fw-bold">
        <p className="hover-cursor" onClick={handleShowVerifiedLawyers}>
          Verified Lawyers
        </p>
        <p className="hover-cursor" onClick={handleShowUnverifiedLawyers}>
          Unverified Lawyers
        </p>
        <p className="hover-cursor" onClick={handleShowCases}>
          Cases
        </p>
      </div>
      <div className="my-3 w-75 ms-25 right p-5">
        {showVerifiedLawyers && <VerifiedLawyers />}
        {showUnverifiedLawyers && <UnverifiedLawyers />}
        {showCases && (
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
                phone_number: phone,
                email,
              } = lawCase.client;
              return (
                <Col>
                  <ClientLawyerCard
                    key={index}
                    caseTitle={caseTitle}
                    caseDescription={caseDescription}
                    firstName={firstName}
                    lastName={lastName}
                    otherNames={otherNames}
                    email={email}
                    phone={phone}
                    handleViewCase={() => handleViewCase(id)}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
