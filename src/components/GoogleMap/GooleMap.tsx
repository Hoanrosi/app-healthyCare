import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807,
        }}
      ></Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY",
})(MapContainer);
