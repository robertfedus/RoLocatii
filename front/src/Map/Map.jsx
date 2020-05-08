import React, { Component } from 'react';
import './Map.css';
import SVG from './SVG/SVG';
import judete from './../judete.json';
import axios from 'axios';
import location_types from './location_types.json';
import Location from './Location';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationType: null,
      locationTypeRo: 'Toate locatiile',
      localitate: null,
      locations: null,
      nextPage: null,
      judet: null,
      showLocations: false
    };

    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount() {}

  getLocations(path) {
    const judet = judete[judete.findIndex((judet) => judet.id === path)];
    this.setState({ judet });
    const radius = '50000';
    this.setState({ localitate: judet.resedinta });
    const locationType = document.getElementById('select-location-type').value;
    axios
      .get(
        `https://rolocatii-back.herokuapp.com/api/v1/places?radius=${radius}&location=${judet.coord}&resedinta=${judet.resedinta}&type=${locationType}`
      )
      .then((response) => {
        if (response.data.data.next_page_token)
          this.setState({
            nextPage: response.data.data.next_page_token
          });

        this.setState({
          locations: response.data.data.results,
          showLocations: true
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  getLocationsByPage = () => {
    const judet = this.state.judet;
    const radius = '50000';
    this.setState({ localitate: judet.resedinta });
    const locationType = document.getElementById('select-location-type').value;
    axios
      .get(
        `https://rolocatii-back.herokuapp.com/api/v1/places?pagetoken=${this.state.nextPage}&radius=${radius}&location=${judet.coord}&resedinta=${judet.resedinta}&type=${locationType}`
      )
      .then((response) => {
        if (response.data.data.next_page_token)
          this.setState({
            nextPage: response.data.data.next_page_token
          });

        this.setState({
          locations: response.data.data.results,
          showLocations: true
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  changedLocationType = (event) => {
    let select = event.target;
    this.setState({
      locationTypeRo: select[select.selectedIndex].text,
      showLocations: false
    });
  };

  clickedPath = (event) => {
    this.getLocations(event.target.id);
  };

  render() {
    const duration = 300;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    };

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 }
    };

    return (
      <div className="page">
        <div className="map-section">
          <div className="top">
            <div className="map-wrapper">
              <SVG clickedPath={this.clickedPath} />
            </div>

            {this.state.showLocations ? (
              <div className="locations-wrapper">
                <h3>
                  {this.state.locationTypeRo} din {this.state.localitate}
                </h3>
                <div className="locations">
                  {this.state.locations
                    ? this.state.locations.map((location) => (
                        <Location
                          name={location.name}
                          rating={location.rating}
                          vicinity={location.vicinity}
                          id={location.place_id}
                        />
                      ))
                    : ''}

                  <div
                    onClick={this.getLocationsByPage}
                    style={{ color: '#fff', cursor: 'pointer' }}
                  >
                    Pagina urmatoare
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="map-options">
            <div className="location-type type-card">
              <h3>Selectează tipul de locatie</h3>

              <select
                name="location-type"
                id="select-location-type"
                onChange={this.changedLocationType}
              >
                <option value="null">Toate locatiile</option>
                {location_types.map((location) => (
                  <option value={location.value}>{location.ro}</option>
                ))}
              </select>
            </div>

            <div className="search-type type-card">
              <h3>Selectează tipul de cautare</h3>
              <select name="location-type" id="select-location-type">
                <option value="resedinte">
                  In reședinta de judet si apropiere
                </option>
                <option value="judete" disabled>
                  În tot judetul
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Map;
