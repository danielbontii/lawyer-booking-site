import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "animate.css";
import { Container, Row, Col } from "react-bootstrap";
import DashboardHeader from "../components/DashboardHeader";
import ClientCard from "../components/ClientCard";
import CaseFile from "../components/CaseFile";
import exampleCases from "../data/cases.json";
import exampleUsers from "../data/users.json";

const LawyerDashboard = () => {
  const [cases, setCases] = useState([]);
  const [clients, setClients] = useState([]);
  const [caseToView, setCaseToView] = useState([]);
  const [showCase, setShowCase] = useState(false);

  useEffect(() => {
    setCases(exampleCases.response.data);
  }, []);

  useEffect(() => {
    setClients(
      exampleUsers.response.data.filter((user) => {
        return user.userType === "client";
      })
    );
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
            const { id, caseTitle, caseDescription, clientId } = lawCase;
            return (
              <Col>
                <ClientCard
                  key={index}
                  caseTitle={caseTitle}
                  caseDescription={caseDescription}
                  firstName={
                    clients.filter((client) => {
                      return client.id === clientId;
                    })[0].firstName
                  }
                  lastName={
                    clients.filter((client) => {
                      return client.id === clientId;
                    })[0].lastName
                  }
                  otherNames={
                    clients.filter((client) => {
                      return client.id === clientId;
                    })[0].otherNames
                  }
                  email={
                    clients.filter((client) => {
                      return client.id === clientId;
                    })[0].email
                  }
                  phone={
                    clients.filter((client) => {
                      return client.id === clientId;
                    })[0].phone
                  }
                  handleViewCase={() => handleViewCase(id)}
                />
              </Col>
            );
          })}
          ;
        </Row>
      </Container>
    </motion.div>
  );
};

export default LawyerDashboard;
