import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="homepage-hero">
      <style>{/* CSS styles */}</style>
      <div className="hero-video--overlay ">
        <div className="hero-text">Explore the World</div>
        <div className="hero-btns">
          <p className="hero-text-p">Want to know how?</p>
          <Link to="/planner" className="hero-btn-plan">get started</Link>
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
