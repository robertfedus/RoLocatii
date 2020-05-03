import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const GoogleMap = (props) => {
  const mapStyles = {
    width: '30%',
    height: '40%'
  };
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: props.lat,
        lng: props.lng
      }}
    >
      <Marker name={'Current location'} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA_Rb8VyZp258TtwgI1Fso2byw5TVj1AXI'
})(GoogleMap);
