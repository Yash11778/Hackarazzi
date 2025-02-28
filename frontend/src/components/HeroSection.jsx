import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/video-chat');
  };

  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Breaking Barriers with Sign Language AI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Translate Sign Language into Text in Real-Time
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cta-button"
        onClick={handleButtonClick}
      >
        Start Translating
      </motion.button>
    </section>
  );
};

export default HeroSection;