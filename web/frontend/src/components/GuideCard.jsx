import React from "react";

const GuideCard = (guide) => {
  return (
    <div className="card guide-card ">
      <div className="card-body guide-card-body">
        <h5 className="card-title guide-card-text">
          <p className="guide-card-number">{guide.number}</p>
          {guide.text}
        </h5>
      </div>
      <img
        src={guide.image}
        className="card-img-bottom guide-card-image"
        alt="..."
      />
    </div>
  );
};

export default GuideCard;
