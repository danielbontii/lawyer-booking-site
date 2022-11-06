import React from "react";
import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
import { motion } from "framer-motion";
import { API_BASE } from "../apibase";

const LawyerRegistration = () => {
  return (
    <motion.div
      className="form-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ X: window.innerWidth, transition: { duration: 1 } }}
    >
      <Header />

      <RegistrationForm
        navigatePage={"client-dashboard"}
        postRoute={`${API_BASE}/lba/api/v1/register`}
        userType={"client"}
      />
    </motion.div>
  );
};

export default LawyerRegistration;
