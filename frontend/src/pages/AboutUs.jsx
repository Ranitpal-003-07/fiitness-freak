import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/About.css";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted", formData);
    // Clear form fields after submission
    setFormData({
      name: "",
      email: "",
      number: "",
      message: "",
    });
  };
  return (
    <>
    <section className="about-us">
      <h2>About Us</h2>
      <p>
      "Welcome to Aiimfit Gym, where we’re dedicated to helping you achieve your fitness potential. Our mission is to create a supportive environment with expert guidance and cutting-edge equipment tailored to all fitness levels. Join us at Aiimfit Gym and take the first step towards a stronger, healthier you!"
      </p>
      
      <button className="join-now">Join Now</button>
    </section>
    <section className="elements-main">
    <h2 className="three-elements-title">3 Elements</h2>
      <div className="three-elements">
        <div className="element mission">
          <h3>Mission</h3>
          <p>To inspire and empower our members.</p>
        </div>
        <div className="element vision">
          <h3>Vision</h3>
          <p>To become the leading fitness center.</p>
        </div>
      </div>
      <div className="three-elements">
        <div className="element values">
          <h3>Values</h3>
          <p>We value commitment, respect, and growth.</p>
        </div>
      </div>
    </section>
    <section className="choose-us">
      <div className="text">
                  <h1>Why Choose Us..?</h1>
                  <p>At Aiimfit Gym, we’re dedicated to helping you achieve your fitness goals through personalized training, state-of-the-art equipment, and a supportive community. Our experienced trainers focus on your unique needs, ensuring safe and effective workouts. With flexible membership options and a welcoming environment, Aiimfit Gym is your perfect partner on the journey to a healthier, stronger you.</p>
      </div>
      <div className="image">

      </div>
    </section>

    <section className="features">
      <h1>FEATURES</h1>
    </section>
    <section className="Trainers">

    </section>
    <section className="location">
      <h1>Location & Contact</h1>
      <div className="frame">
      <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Send Message
        </button>
        </form>
      </div>
        <div className="gmap">
        <iframe class="gmap_iframe" src="https://maps.google.com/maps?width=599&amp;height=403&amp;hl=en&amp;q=Aimfit gym , dakoha&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        </div>

      </div>
    </section>
    </>
  );
};

export default AboutUs;
