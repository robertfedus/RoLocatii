import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import './Searchbar.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        alert(`Latitudine: ${latLng.lat}\nLongitudine: ${latLng.lng}`)
      )
      .catch((error) => console.error('Error', error));
  };

  render() {
    return (
      <div className="searchbar">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Caută o locatie',
                  className:
                    suggestions.length === 0
                      ? 'location-search-input'
                      : 'location-search-input active'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Se încarcă...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';

                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button type="submit">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </div>
        </button>
      </div>
    );
  }
}

export default Searchbar;
