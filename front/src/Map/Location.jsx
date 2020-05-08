import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignature,
  faStar,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

const Location = (props) => {
  const goToLocation = () => {
    document.cookie = `lastLocation=${props.id}`;
    window.location.href = `${window.location.origin}/locatie`;
  };

  return (
    <div className="location">
      <div className="section">
        <span className="label">
          Nume <FontAwesomeIcon icon={faSignature} className="name-icon" />
        </span>
        <p className="answer">{props.name}</p>
      </div>

      <div className="section">
        <span className="label">
          Rating Google{' '}
          <FontAwesomeIcon icon={faStar} className="rating-icon" />
        </span>
        <p className="answer">{props.rating}</p>
      </div>
      <div className="section">
        <span className="label">
          Adresa{' '}
          <FontAwesomeIcon icon={faMapMarkedAlt} className="adress-icon" />
        </span>
        <p className="answer">{props.vicinity}</p>
      </div>

      <div className="section details-section">
        <a href="#" onClick={goToLocation}>
          <span className="details">Mai multe detalii</span>
        </a>
      </div>
    </div>
  );
};

export default Location;
