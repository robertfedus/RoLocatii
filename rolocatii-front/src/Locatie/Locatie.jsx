import React, { useState, useContext, useEffect } from 'react';
import './Locatie.css';
import axios from 'axios';
import GoogleApiWrapper from './GoogleMap/GoogleMap';
import Review from './Review/Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import getCookie from './../getCookie';

const Locatie = () => {
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [location, setLocation] = useState('null');
  const [errorMessage, setMessage] = useState(null);

  const paths = window.location.href.split('/');
  let locationId;

  if (!getCookie('lastLocation'))
    window.location.href = `${window.location.origin}/`;
  else locationId = getCookie('lastLocation');

  const fetchLocation = () => {
    axios
      .get(
        `https://rolocatii-back.herokuapp.com/api/v1/places/place?place_id=${locationId}`
      )
      .then((response) => {
        const location = response.data.data.result;
        setLat(location.geometry.location.lat);
        setLng(location.geometry.location.lng);
        setLocation(location);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (locationId) fetchLocation();
  }, [locationId]);

  const addToFavourites = () => {
    if (getCookie('jwt')) {
      const body = {
        email: getCookie('email'),
        favourite: {
          id: locationId,
          name: location.name,
          adress: location.formatted_address,
          rating: location.rating
        }
      };

      const config = {
        headers: {
          Authorization: `Bearer ${getCookie('jwt')}`
        }
      };

      axios
        .post(
          'https://rolocatii-back.herokuapp.com/api/v1/favourite',
          body,
          config
        )
        .then((response) => {
          console.log('Adaugat la favorite!');
        })
        .catch(function (error) {
          setMessage(error.response.data.message);
        });
    } else setMessage('Trebuie să fii autentificat pentru a face asta!');
  };

  const content = loading ? (
    <div>Se incarca...</div>
  ) : (
    <div className="page-content">
      <div className="top">
        <div className="google-map-wrapper">
          <div>
            <GoogleApiWrapper lat={lat} lng={lng} />
          </div>
        </div>

        <div className="info-wrapper">
          <div className="section">
            <h2>{location.name}</h2>
          </div>
          <div className="section">
            <span className="left">Adresa</span>
            <span className="right">{location.formatted_address}</span>
          </div>
          <div className="section">
            <span className="left">Telefon</span>
            <span className="right">{location.formatted_phone_number}</span>
          </div>
          <div>
            <span
              className="left"
              style={{
                color: '#ff5752',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              onClick={addToFavourites}
            >
              Adauga la favorite
            </span>
            <span
              className="left"
              style={{
                color: '#ff5752',
                display: 'block'
              }}
              onClick={addToFavourites}
            >
              {errorMessage}
            </span>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="reviews">
          {/* <div className="rolocatii">
            <span className="title">Review-uri RoLocatii</span>
            <Review />
          </div> */}
          <div className="google">
            <span className="title">
              Review-uri Google (
              <span>
                {location.rating}{' '}
                <FontAwesomeIcon icon={faStar} className="rating-icon" />
              </span>
              )
            </span>
            {location.reviews
              ? location.reviews.map((review) => {
                  return (
                    <Review
                      img={review.profile_photo_url}
                      stars={review.rating}
                      name={review.author_name}
                      text={review.text}
                      time={review.relative_time_description}
                    />
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    </div>
  );

  return <div className="location-page">{content}</div>;
};

export default Locatie;
