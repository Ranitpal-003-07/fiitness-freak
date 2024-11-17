import React from 'react';
import '../Styles/Programs.css'
import heroImg from '../assets/gym-02.png'
import dumbellIcon from '../assets/dumble.png'
import yoga from '../assets/yoga-pose.png'
import lunges from '../assets/lunges.png'
import extended from '../assets/extended.png'
import startimg from '../assets/trainer.png'
import {programsData} from '../Data/ProgramsData'
import rightarrow from '../assets/rightArrow.png'
import {plansData} from '../Data/PlansData'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import image4 from '../assets/image4.png'
import nb from '../assets/nb.png'
import adidas from '../assets/adidas.png'
import nike from '../assets/nike.png'
import tick from '../assets/tick.png'
import whiteTick from '../assets/whiteTick.png'






const ContactUs = () => {
 
  return (
   <>
   <section>
    <div className="container">
      <div className="hero_wrapper">
        <div className="hero_content">
          <h2 className="section_title">Exercise is a key to  
              <span className="highlight">HEALTHY</span> 
              LifeStyle
          </h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam aliquid nemo in repellendus</p>
          <div className="btns">
            <button className="watch_btn">
            <button className="register_btn">Get Started</button>
              <div className="wbtn"><svg className='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#B197FC" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
              <p>Watch Video</p>
              </div>
            </button>

          </div>
        </div>
        <div className="hero_img">
          <div className="hero_img_wrapper">
            <div className="box01">
              <div className="box02">
                <div className="box03">
                  <div className="boximg">
                    <img src={heroImg} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="heart_rate">
              <h5>Heart Rate</h5>
              <h6>2856bpm</h6>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#B197FC" d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4l87 0c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31l104.5 0c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240l-132 0c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9L16 240c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1l0 5.8c0 16.9-2.8 33.5-8.3 49.1z"/></svg>
              </span>
            </div>

            <div className="gym_location">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#63E6BE" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              </span>
                <h5>Find a Gym Near You</h5>
            </div>

            <div className="dumbell_icon">
              <img src={dumbellIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="exercise_container">
        <div className="exercise_top">
            <h2 className="section_title">
                Benifits of <span className='highlight'>
                    Exercise
                </span>
            </h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elSapiente consequuntur molestias id earum maxime beatae dolorianimi laborum reprehenderit amet libero nihil eius explicanon distinctio optio, voluptas fuga provident?
            </p>
        </div>

        <div className="exercise_wrapper">
              <div className="exercise_item">
                  <span className="exercise_icon">
                      <img src={lunges} alt="" />
                   </span>
                  <div className="exercise_content">
                      <h4>Healthy Life</h4>
                      <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicielit. Ut repudiandae temporibus reiciendis aliquconsequuntur id, recusandae quisquam accusantium seqiste accusamus libero nemo atque ex?
                      </p>

                  </div>
              </div>

              <div className="exercise_item">
                  <span className="exercise_icon">
                      <img src={yoga} alt="" />
                  </span>
                  <div className="exercise_content">
                      <h4>Healthy Life</h4>
                      <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicielit. Ut repudiandae temporibus reiciendis aliquconsequuntur id, recusandae quisquam accusantium seqiste accusamus libero nemo atque ex?
                      </p>

                  </div>
              </div>

              <div className="exercise_item">
                  <span className="exercise_icon">
                      <img src={extended} alt="" />
                  </span>
                  <div className="exercise_content">
                      <h4>Healthy Life</h4>
                      <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicielit. Ut repudiandae temporibus reiciendis aliquconsequuntur id, recusandae quisquam accusantium seqiste accusamus libero nemo atque ex?
                      </p>

                  </div>
              </div>
            </div>
          </div>
          <div className="start_container">
                <div className="start_wrapper">
                    <div className="start_img">
                        <img src={startimg} alt="" />
                    </div>

                    <div className="start_content">
                        <h2 className="section_title">
                            Ready To Make A 
                            <span className="highlight">Change...?</span>
                        </h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit inventore ea ipsam, ipsum culpa voluptatibus ex ducimus numquam commodi porro?
                        </p>

                        <button className="register_button">
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#B197FC" d="M400.1 194.8C389.2 197.6 380.2 199.1 371 202.4C363.7 204.3 356.3 206.3 347.8 208.5L347.2 208.6C343 209.8 342.6 209.9 338.7 205.4C334 200.1 330.6 196.7 324.1 193.5C304.4 183.9 285.4 186.7 267.7 198.2C246.5 211.9 235.6 232.2 235.9 257.4C236.2 282.4 253.3 302.9 277.1 306.3C299.1 309.1 316.9 301.7 330.9 285.8C333 283.2 334.9 280.5 337 277.5V277.5L337 277.5C337.8 276.5 338.5 275.4 339.3 274.2H279.2C272.7 274.2 271.1 270.2 273.3 264.9C277.3 255.2 284.8 239 289.2 230.9C290.1 229.1 292.3 225.1 296.1 225.1H397.2C401.7 211.7 409 198.2 418.8 185.4C441.5 155.5 468.1 139.9 506 133.4C537.8 127.8 567.7 130.9 594.9 149.3C619.5 166.1 634.7 188.9 638.8 218.8C644.1 260.9 631.9 295.1 602.1 324.4C582.4 345.3 557.2 358.4 528.2 364.3C522.6 365.3 517.1 365.8 511.7 366.3C508.8 366.5 506 366.8 503.2 367.1C474.9 366.5 449 358.4 427.2 339.7C411.9 326.4 401.3 310.1 396.1 291.2C392.4 298.5 388.1 305.6 382.1 312.3C360.5 341.9 331.2 360.3 294.2 365.2C263.6 369.3 235.3 363.4 210.3 344.7C187.3 327.2 174.2 304.2 170.8 275.5C166.7 241.5 176.7 210.1 197.2 184.2C219.4 155.2 248.7 136.8 284.5 130.3C313.8 124.1 341.8 128.4 367.1 145.6C383.6 156.5 395.4 171.4 403.2 189.5C405.1 192.3 403.8 193.9 400.1 194.8zM48.3 200.4C47.1 200.4 46.7 199.8 47.4 198.8L53.9 190.4C54.5 189.5 56.1 188.9 57.3 188.9H168.6C169.8 188.9 170.1 189.8 169.5 190.7L164.2 198.8C163.6 199.8 162 200.7 161.1 200.7L48.3 200.4zM1.2 229.1C0 229.1-.3 228.4 .3 227.5L6.9 219.1C7.5 218.2 9 217.5 10.3 217.5H152.4C153.6 217.5 154.2 218.5 153.9 219.4L151.4 226.9C151.1 228.1 149.9 228.8 148.6 228.8L1.2 229.1zM75.7 255.9C75.1 256.8 75.4 257.7 76.7 257.7L144.6 258C145.5 258 146.8 257.1 146.8 255.9L147.4 248.4C147.4 247.1 146.8 246.2 145.5 246.2H83.2C82 246.2 80.7 247.1 80.1 248.1L75.7 255.9zM577.2 237.9C577 235.3 576.9 233.1 576.5 230.9C570.9 200.1 542.5 182.6 512.9 189.5C483.9 196 465.2 214.4 458.4 243.7C452.8 268 464.6 292.6 487 302.6C504.2 310.1 521.3 309.2 537.8 300.7C562.4 287.1 575.8 268 577.4 241.2C577.3 240 577.3 238.9 577.2 237.9z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="programs" id="programs">
                <div className="programs_header">
                    <span className='stroke_text'>Explore our</span>
                    <span className='highlight'>Programs</span>
                    <span className='stroke_text'>To shape You</span>
                </div>
                <div className="program_cata">
                    {programsData.map((program)=>(
                        <div className="cata">
                        {program.image}
                        <span>{program.heading}</span>
                        <span>{program.details}</span>
                        <div className="join_now">
                            <span>Join Now</span>
                            <img src={rightarrow} alt="" />
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="reasons">
            <div className="left_r">
                <img src={image1} alt="" />
                <img src={image2} alt="" />
                <img src={image3} alt="" />
                <img src={image4} alt="" />
            </div>
            <div className="right_r">
                <span>Some Reasons</span>
                <div >
                    <span className="stroke_text" >Why</span>
                    <span className='us'>Choose Us..?</span>
                </div>

                <div className='details_r'>
                    <div>
                        <img src={tick} alt=""></img>
                        <span>OVER 10+ EXPERT COACHES</span>
                    </div>
                    <div>
                        <img src={tick} alt="" />
                        <span>TRAIN SMARTER AND FASTER THAN BEFORE</span>
                    </div>
                    <div>
                        <img src={tick} alt="" />
                        <span>1 MONTH FREE PERSONAL TRAINER FOR NEW MEMBER</span>
                    </div>
                    <div>
                        <img src={tick} alt="" />
                        <span>RELIABLE PARTNERS</span>
                    </div>
                </div>

                <span style={{
                    color:"lavender",
                    fontWeight:"bold",
                    marginTop:"1rem"
                }}>
                    OUR PARTNERS
                </span>

                <div className="partners">
                    <img src={nb} alt="" />
                    <img src={adidas} alt="" />
                    <img src={nike} alt="" />
                </div>
            </div>
        </div>
        <div className="plans_container">
            <div className="programs_header" style={{gap:"2rem"}}>
                <span className='stroke_text1'>READY TO START</span>
                <span>YOUR JOURNEY</span>            
                <span className='stroke_text1'> WITH US..!!!</span>
            </div>
            <div className="plans">
                {plansData.map((plan,i)=>(
                    <div className="plan" key={i}>
                        {plan.icon}
                        <span>{plan.name}</span>
                        <span>Rs. {plan.price}</span>
                        <div className="features">
                            {plan.features.map((feature,i)=>(
                                <div className="feature">
                                    <img src={whiteTick} alt="" />
                                    <span key={i}>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <span>See More Benefits</span>
                        </div>
                        <button className="btn">
                            Join Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    
   </section>
   </>
  );
};

export default ContactUs;