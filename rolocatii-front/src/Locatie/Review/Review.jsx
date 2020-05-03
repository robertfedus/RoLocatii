import React from 'react';
import './Review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Review = (props) => {
  let stars = [];
  for (let i = 0; i < parseInt(props.stars); i++) stars.push(1);

  return (
    <div className="review">
      <div className="image-rating">
        <img src={props.img} className="profile-pic" />
        {stars.map((el, index) => (
          <FontAwesomeIcon icon={faStar} className="rating-icon" key={index} />
        ))}
      </div>
      <div className="name-text">
        <div className="name">{props.name}</div>
        <div className="time">{props.time}</div>
        <div className="text">{props.text}</div>
      </div>
    </div>
  );
};

export default Review;
