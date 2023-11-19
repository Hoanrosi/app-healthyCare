import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: '400px',
      height: '400px',
    };

    const { google, latitude, longitude } = this.props;

    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyAI9kPkskayYti5ttrZL_UfBlL3OkMEbvs",
})(MapContainer);
