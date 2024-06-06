const Hero = () => {
  return (
    <section className="homepage-hero component-index-1 bg-white">
      <style>{/* CSS styles */}</style>
      <div className="hero-video--overlay behave-as-bg">
        <div className="hero-text">BBN: Be Back Never</div>
        <div className="hero-btns">
          <p className="hero-text-p">Want to know how?</p>
          <button className="hero-btn-plan">get started</button>
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
