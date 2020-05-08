import React, { Component } from 'react';
import './Profile.css';
import getCookie from './../getCookie';
import axios from 'axios';
import Location from './../Map/Location';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favourites: null
    };
  }

  componentDidMount = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie('jwt')}`
      }
    };

    axios
      .get(
        `https://rolocatii-back.herokuapp.com/api/v1/favourite?email=${getCookie(
          'email'
        )}`,
        config
      )
      .then((response) => {
        this.setState({ favourites: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteAccount = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie('jwt')}`
      }
    };

    axios
      .delete(
        `https://rolocatii-back.herokuapp.com/api/v1/auth?email=${getCookie(
          'email'
        )}`,
        config
      )
      .then((response) => {
        window.location.href = `${window.location.origin}/deconectare`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    if (!getCookie('jwt')) window.location.href = `${window.location.origin}/`;
    let bottomContent = null;

    if (this.state.favourites)
      bottomContent = this.state.favourites.map((fav) => (
        <Location
          name={fav.name}
          rating={fav.rating}
          vicinity={fav.adress}
          id={fav.id}
        />
      ));

    return (
      <div className="profile-page">
        <div className="top">
          <div className="personal-details">
            <div className="details">
              <div className="section">
                <h2>Informatii personale</h2>
              </div>
              <div className="section">
                <span className="left">Nume</span>
                <span className="right">{getCookie('name')}</span>
              </div>
              <div className="section">
                <span className="left">Email</span>
                <span className="right">{getCookie('email')}</span>
              </div>
              <div className="delete" onClick={this.deleteAccount}>
                Șterge contul
              </div>
            </div>
            <div className="profile-picture">
              <img
                src="https://image.flaticon.com/icons/svg/747/747376.svg"
                alt=""
                className="profile-pic"
              />
            </div>
          </div>
        </div>

        {this.state.favourites !== null ? (
          <div className="bottom">
            <div className="locations-wrapper">
              <h3 style={{ color: 'white' }}>Locatii favorite</h3>
              <div className="locations">{bottomContent}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Profile;
