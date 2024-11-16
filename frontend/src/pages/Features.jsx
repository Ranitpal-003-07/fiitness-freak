import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "../Styles/Features.css";

const FeatureCard = ({ title, description, link }) => {
  return (
    <motion.div 
      className="feature-card"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <motion.h3 
          className="feature-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="feature-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={link} className="feature-link">
          Learn More
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: 5 }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
          >
            <FaArrowRight className="arrow-icon" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Workout Database",
      description:
        "Our comprehensive workout database helps you find the perfect routine to target your specific goals.",
      link: "/WorkoutDatabase",
    },
    {
      title: "Nutrition Checker",
      description:
        "Easily check the nutritional value of any food, including calories, fat, protein, and carbohydrates.",
      link: "/NutritionChecker",
    },
    {
      title: "BMR Calculator",
      description:
        "Calculate your Basal Metabolic Rate (BMR) to determine your daily calorie needs and gain insights into your metabolism.",
      link: "/BmrCalculator",
    },
    {
      title: "Create Account",
      description:
        "Create a personalized account to access additional features, save your progress, and customize your experience.",
      link: "/Register",
    },
    {
      title: "Workout Analytics",
      description:
        "Visualize your fitness journey with detailed charts and graphs. Track your progress, identify trends, and optimize your workouts for better results.",
      link: "/profile/workout-details",
    },
    {
      title: "Update Profile",
      description:
        "Update your profile information to keep your account up to date.",
      link: "/profile/update-profile",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const letterVariants = {
    hover: {
      scale: 1.3,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="features-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="features-wrapper">
        <motion.h2 
          className="features-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {"App Features".split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              whileHover="hover"
              className="feature-letter"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;
