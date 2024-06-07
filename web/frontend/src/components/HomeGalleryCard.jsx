import React from "react";

const HomeGalleryCard = (place) => {
  return (
    <div className="col">
      <div
        className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
        style={{
          backgroundImage: `url(
            https://source.unsplash.com/400x400?${place.country_name})`,
          backgroundSize: "cover",
          width: "18rem",
        }}
      >
        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
          <p className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
            {place.short_title}
          </p>
          <strong>{place.country_name}</strong>
        </div>
      </div>
    </div>
  );
};

export default HomeGalleryCard;
