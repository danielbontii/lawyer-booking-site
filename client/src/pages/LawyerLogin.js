import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";

const LawyerLogin = () => {
  return (
    <motion.div
      className="form-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ X: window.innerWidth, transition: { duration: 1 } }}
    >
      <Header />
      <LoginForm navigatePage={"lawyer-dashboard"} postRoute="/api/v1/test" />
    </motion.div>
  );
};

export default LawyerLogin;
