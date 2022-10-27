import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import LawyerProfile from "../components/LawyerProfile";
import { motion } from "framer-motion";
import "animate.css";
import defaultPhoto from "../images/defaultPhoto.png";
// import axios from "axios";
// import { toast } from "react-toastify";
import exampleUsers from "../data/users.json";
import VerifiedLawyer from "./UnverifiedLawyer";

const UnverifiedLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showLawyerProfile, setShowLawyerProfile] = useState(false);
  const [lawyerToShow, setLawyerToShow] = useState([]);

  const handleViewProfile = (id) => {
    setLawyerToShow(
      lawyers.filter((lawyer) => {
        return lawyer.id === id;
      })
    );
    setShowLawyerProfile(true);
  };

  const handleCloseLawyerProfile = () => {
    setShowLawyerProfile(false);
  };

  const handleVerifyLawyer = (id) => {};

  // useEffect(() => {
  //   const getLawyers = async () => {
  //     try {
  //       const response = await axios.get(``);

  //       if (response) {
  //         setLawyers(response.data);
  //       }
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     }
  //   };
  //   getLawyers();
  // }, []);

  useEffect(() => {
    setLawyers(
      exampleUsers.response.data.filter((user) => {
        return user.userType === "lawyer";
      })
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ X: window.innerWidth, transition: { duration: 1 } }}
    >
      {showLawyerProfile && (
        <div className="show-profile-active animate__animated animate__fadeInDownBig"></div>
      )}
      {showLawyerProfile && (
        <LawyerProfile
          lawyerToShow={lawyerToShow}
          handleCloseLawyerProfile={handleCloseLawyerProfile}
        />
      )}
      <Container className="client-dashboard">
        <Row className="row-cols-lg-2 py-5 gy-4">
          {lawyers.map((lawyer, index) => {
            const {
              id,
              firstName,
              lastName,
              otherNames,
              email,
              phone,
              photo,
              rating,
            } = lawyer;

            return (
              <VerifiedLawyer
                key={index}
                id={id}
                firstName={firstName}
                lastName={lastName}
                otherNames={otherNames}
                email={email}
                phone={phone}
                rating={rating}
                photo={photo === "" ? defaultPhoto : photo}
                handleViewProfile={() => handleViewProfile(id)}
                handleRateLawyer={() => handleVerifyLawyer(id)}
              />
            );
          })}
        </Row>
      </Container>
    </motion.div>
  );
};

export default UnverifiedLawyers;
