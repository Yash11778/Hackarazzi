import React from "react";
import { motion } from "framer-motion";

const featureList = [
  { emoji: "🎥", title: "Live Webcam Gesture Recognition" },
  { emoji: "🖥️", title: "Real-Time Text Output" },
  { emoji: "🔊", title: "Optional Text-to-Speech" },
  { emoji: "🌍", title: "Supports Multiple Sign Languages" },
];

const Features = () => {
  return (
    <section className="features" id="features">
      <h2>Key Features</h2>
      <div className="feature-grid">
        {featureList.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <span className="emoji">{feature.emoji}</span>
            <h3>{feature.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
