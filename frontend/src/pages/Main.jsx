import React from "react";
import hero_image from '../assets/hero_image.png';
import hero_image_back from "../assets/hero_image_back.png"
import heart from '../assets/heart.png'
import calories from '../assets/calories.png'
import Lottie from "lottie-react";
import bannerAnimation from "../assets/banner-animation.json";
import bannerAnimation2 from "../assets/banner-animation2.json";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../Styles/Main.css'

const Main = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  return (
   <>
      <div className="hero">
        <div className="left-h">
          <div className="the-best-ad">
            <div></div>
            <span>
              the best fitness club in town
            </span>

          </div>
          <div className="hero-text">
            <div>
              <span className="stroke-text">Shape</span>
              <span>Your</span>
            </div>
            <div>
              <span>Ideal Body</span>
            </div>
            <div >
              <span>
              In here we will help you to shape and build your ideal body and live up your life to fullest
              </span>
            </div>
          </div>
          <div className="figures">
            <div>
              <span>+15</span>
              <span>Expert Coaches</span>
            </div>
            <div>
              <span>+200</span>
              <span>Members Joined</span>
            </div><div>
              <span>+10</span>
              <span>Fitness Programs</span>
            </div>
          </div>
          <div className="hero-btns">
            <buttons className="btn">Get Started</buttons>
            <buttons className="btn">Learn More</buttons>
          </div>
        </div>
        <div className="right-h">

          <buttons className="btn">Join now</buttons>
          <div className="heart-rate">
            <img src={heart} alt="" />
            <span>Heart Rate</span><span>116 BPM</span>
          </div>

          <img src={hero_image_back} alt="" className="hero-image-back" />
          <img src={hero_image} alt="" className="hero-image" />

          <div className="calories">
            <img src={calories} alt="" />
            <div>
              <span>Calories Burned</span>
              <span>380 Kcal</span>
            </div>
          </div>
        </div>

      <div className="programs">
        <div className="programs-header">
          <span>Explore Our</span>
          <span>Programs</span>
          <span>To Shape You</span>
        </div>
      </div>      
      </div>
   </>
  );
};

export default Main;
