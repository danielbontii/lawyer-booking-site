import React from "react";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { motion } from "framer-motion";

const ClientLogin = () => {


  return (
    <motion.div
      className="form-page "
      initial={{ opacity: 0 }}
      animate={{ opacity: "100%" }}
      exit={{ X: window.innerWidth, transition: { duration: 1 } }}
    >
      <Header />
      <LoginForm
        postRoute="lba/api/v1/login"
      />
    </motion.div>
  );
};

export default ClientLogin;
