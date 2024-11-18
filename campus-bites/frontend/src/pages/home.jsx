import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../CSS/home.css";
import card2 from "../assets/baking.png";
import cardItems from '../database/card_item.json';
import { useNavigate } from 'react-router-dom';

const homeData = {
  title: "COLLEGE CRAVINGS",
  image: card2,
  description: "Indulge Your Taste Buds in our Vibrant College Food Court!",
  CarouselItems: [
    {
      image: card2,
      title: "Slide 1 Title",
      description: "Slide 1 Description",
    },
    // ... other carousel items
  ],
  Baking: []
};

export default function Home() {
  const [scrollTop, setScrollTop] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollTop(scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSeeMore = () => {
    navigate('/item');
    window.scrollTo(0, 0);
  };

  const handleAboutClick = () => {
    navigate('/about');
    window.scrollTo(0, 0);
  };

  return (
    <div className="wholepage">
      <div className="container-fluid">
        <section id="home" className="hero is-full height">
          <div className="hero-body">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="has-text-left">
                    <h1>{homeData.title}</h1>
                    <p>{homeData.description}</p>
                    <button 
                      onClick={handleAboutClick} 
                      className="btn btn-primary"
                    >
                      About Us
                    </button>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="has-text-right">
                    <img src={card2} alt="Your Image" style={{ width: '110%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="card-grid">
            {cardItems.slice(0, 3).map((item, index) => (
              <div className="col-sm-4" key={index}>
                <Card item={item} showAddToCart={false} />
              </div>
            ))}
          </div>
        </div>
        <div className="see-more">
          <button className="details" onClick={handleSeeMore}>
            See More&gt;&gt;
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
