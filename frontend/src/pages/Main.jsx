import React, { useState } from "react";
import hero_image from '../assets/hero_image.png';
import hero_image_back from "../assets/hero_image_back.png"
import heart from '../assets/heart.png'
import calories from '../assets/calories.png'
import Lottie from "lottie-react";
import bannerAnimation from "../assets/banner-animation.json";
import bannerAnimation2 from "../assets/banner-animation2.json";
import { useAuth } from "../context/AuthContext";
import '../Styles/Main.css'
import {testimonialsData} from '../Data/TestimonialsData';
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';


const Main = () => {
  const { isAuthenticated } = useAuth();
  const [selected,setSelected]=useState(0);
  const tLength=testimonialsData.length;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

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
            <button className="btn">Get Started</button>
            <button className="btn">Learn More</button>
          </div>
        </div>
        <div className="right-h">

          <button className="btn">Join now</button>
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

      </div>
      <div className="testimonials">
        <div className="left-t">
          <span>Testimonials</span>
          <span className="stroke-text">
            What They 
          </span>
          <span>
            Say About Us
          </span>
          <span>
            {testimonialsData[selected].review}
          </span>
          <span>
            <span style={{color:"lavender"}}>
              {testimonialsData[selected].name}
            </span>{" "}
            -{testimonialsData[selected].status}
          </span>
        </div>
        <div className="right-t">
          <div></div>
          <div></div>
          <img src={testimonialsData[selected].image}  alt="" />
          <div className="arrows">
            <img
            onClick={()=>{
              selected===0
              ?setSelected(tLength-1):
              setSelected((prev)=>prev-1);
            }}
             src={leftArrow} alt="" />
            <img 
            onClick={()=>{
              selected===tLength-1
              ?setSelected(0):
              setSelected((prev)=>prev+1);
            }}
            src={rightArrow} alt="" />
          </div>
        </div>
      </div>
      <div className="photogal">
        <div className="left-pg">
          <span>Photo Gallery</span>
          <div className="album">
            <div className="responsive-container-block bg">
              <div className="responsive-container-block img-cont">
                <img className="img" src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                <img className="img" src="https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                <img className="img img-last" src="https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=600"/>
              </div>
              <div className="responsive-container-block img-cont">
                <img className="img img-big" src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                <img className="img img-big img-last" src="https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=600"/>
              </div>
              <div className="responsive-container-block img-cont">
                <img className="img" src="https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                <img className="img" src="https://images.pexels.com/photos/116077/pexels-photo-116077.jpeg?auto=compress&cs=tinysrgb&w=600"/>
                <img className="img" src="https://images.pexels.com/photos/3112004/pexels-photo-3112004.jpeg?auto=compress&cs=tinysrgb&w=600"/>
              </div>
            </div>
          </div>
        </div>
        <div className="right-pg">
        <span className="stroke-text">Ruunnn!!!!</span>
        <div className="ani1">
          <Lottie
            animationData={bannerAnimation}
            className="animate-slideInFromRight w-[100%]"
            // Adjust size as needed
          />
          <div className="cal">
            <img src={calories} alt="" />
            <div>
              <span>Calories Burned</span>
              <span>680+ <span className="stroke-text">Kcal</span></span>
            </div> 
          </div>
        </div>
        <span className="intro">
        "Transform your fitness journey with Aiimfit Gym—where strength meets dedication!"
        </span>
        </div>
      </div>
      <div className="join2">
        <div className="ani2">
        <Lottie
            animationData={bannerAnimation2}
            className="animate-slideInFromRight w-[90%]"
            // Adjust size as needed
          />
        </div>
        <div className="join3">
        <div className="left-j">
          <hr />
          <div>
            <span className="stroke-text">READY TO</span>
            <span>LEVEL UP</span>
          </div>
          <div>
            <span>TOUR BODY</span>
            <span className="stroke-text">WITH US..?</span>
          </div>
        </div>
        <div className="right-j">
          <form  action="" className="email-container" >
            <input type="email" placeholder="Enter Your Email" name="user_email" />
            <button className="emailbtn">Join Now</button>
          </form>
        </div>
        </div>
      </div>
   </>
  );
};

export default Main;

