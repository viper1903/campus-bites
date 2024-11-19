import React from "react";
import "../CSS/about.css";
import pic1 from  "../assets/Mohitsharma.png";
import pic2 from "../assets/SouravNarayan.jpg";
import pic3 from "../assets/reetikaformal.jpg";
import pic4 from "../assets/parinitiformal.jpg";



const AboutUs = () => {
  const teamMembers = [
    { name: "Mohit Sharma", image: pic1 },
    { name: "Sourav Narayan", image: pic2 },
    { name: "Reetika", image: pic3 },
    { name: "Pariniti Sinha", image: pic4 },
  ];

  return (
    <div className="about">
      <div className="about-us">
        <h1>Know Us Better...</h1>
        <p className="heading-p">

          We are a team of freshers who are passionate about transforming the canteen management system. Our goal is to enhance efficiency, transparency, and customer 
          satisfaction by leveraging technology. We believe in innovation, collaboration, sustainability, and continual improvement. Join us on this exciting journey!

        </p>
      </div>
      <div className="container1">
        <div className="box">
          <h2>Why?</h2>

          <p>We're driven to transform canteen management. Our system aims to boost efficiency, transparency,
           and customer satisfaction by leveraging technology. We're committed to innovation, collaboration, sustainability, 
           and continual improvement to empower canteens for success.</p>
        </div>
        <div className="box">
          <h2>What?</h2>
          <p>We offer a comprehensive canteen management system that streamlines operations with features like order management, inventory control, and customizable menus.
          Our platform provides insightful reporting, and facilitates effective communication. With integration capabilities and scalability,
           we empower canteens to optimize processes, enhance customer satisfaction, and drive growth.</p>
        </div>
        <div className="box">
          <h2>How?</h2>
          <p>We start by understanding what canteens need. Then, we build our system step by step, making changes along the way if needed. 
          We use simple but strong technology to keep things running smoothly and safely. We're always ready to help if there are any problems.
           After the system is set up, we listen to feedback and keep trying to make it better.</p>

        </div>
      </div>
      <div className="team-title">
        <h2>Our Team</h2>
      </div>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
