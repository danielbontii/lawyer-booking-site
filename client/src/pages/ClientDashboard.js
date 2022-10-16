import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DashboardHeader from "../components/DashboardHeader";
import LawyerProfile from "../components/LawyerProfile";
import RateLawyer from "../components/RateLawyer";
import ProfileCard from "../components/ProfileCard";
import { motion } from "framer-motion";
import "animate.css";
import defaultPhoto from "../images/defaultPhoto.png";
// import axios from "axios";
// import { toast } from "react-toastify";
import exampleUsers from "../data/users.json";

const ClientDashboard = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showLawyerProfile, setShowLawyerProfile] = useState(false);
  const [showLawyerRating, setShowLawyerRating] = useState(false);
  const [lawyerToShow, setLawyerToShow] = useState([]);
  const [lawyerToRate, setLawyerToRate] = useState([]);

  const handleViewProfile = (id) => {
    setLawyerToShow(
      lawyers.filter((lawyer) => {
        return lawyer.id === id;
      })
    );
    setShowLawyerProfile(true);
  };

  const handleRateLawyer = (id) => {
    setLawyerToRate(
      lawyers.filter((lawyer) => {
        return lawyer.id === id;
      })
    );
    setShowLawyerRating(true);
  };

  const handleCloseLawyerProfile = () => {
    setShowLawyerProfile(false);
  };
 
  const handleCloseLawyerRating = () => {
    setShowLawyerRating(false);
  };

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
    setLawyers(exampleUsers.response.data.filter(user => {
      return user.userType === "lawyer"
    }));
  }, []);

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ X: window.innerWidth, transition: { duration: 1 } }}
    >
      {(showLawyerProfile || showLawyerRating) && (
        <div className="show-profile-active animate__animated animate__fadeInDownBig"></div>
      )}
      <DashboardHeader />
      {showLawyerProfile && (
        <LawyerProfile
          lawyerToShow={lawyerToShow}
          handleCloseLawyerProfile={handleCloseLawyerProfile}
        />
      )}
      {showLawyerRating && (
        <RateLawyer
          lawyerToRate={lawyerToRate}
          handleCloseLawyerRating={handleCloseLawyerRating}
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
              <ProfileCard
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
                handleRateLawyer={() => handleRateLawyer(id)}
              />
            );
          })}
        </Row>
      </Container>
    </motion.div>
  );
};

export default ClientDashboard;
