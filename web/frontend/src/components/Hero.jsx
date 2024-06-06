import React, { useState, useEffect } from "react";
import axios from "axios";

const Hero = () => {
  const [posts, setPosts] = useState([]); // renamed setPost to setPosts
  const [searchQuery, setSearchQuery] = useState(""); // added state for search query

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data); // updated to setPosts
    } catch (error) {
      console.error("Error getting posts", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // add logic to handle search submission
  };

  return (
    <section className="homepage-hero component-index-1 bg-white">
      <style>{/* CSS styles */}</style>
      <div className="hero-video--overlay behave-as-bg">
        <div className="hero-text">Discover the world</div>
        <div className="hero-btns">
            <button className="hero-btn-plan">Plan Trip</button>
            <button className="hero-btn-learn">Learn more</button>
        </div>
      </div>
      <div className="hero-video--wrap">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg-video"
          poster="https://www.jacadatravel.com/wp-content/uploads/2024/01/Homepage-Header-Frame.jpg"
        >
          <source
            src="https://www.jacadatravel.com/wp-content/uploads/2024/01/Jacada-Homepage-video-global-updated2024.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};

export default Hero;
