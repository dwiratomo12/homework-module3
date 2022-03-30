import React from "react";
import "../style/Card.css";

function Card({ imageUrl, title, artist }) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="card__data">
        <div className="card__content">
          <h3 className="card__title">{title}</h3>
          <p className="card__artist">{artist}</p>
        </div>

        <div className="card__action">
          <button className="btn">Select</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
