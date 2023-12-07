import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 21.032327202294823,
  lng: 105.78492155630006,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script12",
    googleMapsApiKey: "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const position = {
    lat: 21.032327202294823,
    lng: 105.78492155630006,
  };

  const onLoad1 = (marker) => {
    console.log("marker: ", marker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          onLoad={onLoad1}
          position={position}
          label={{ text: `lable custom`, color: "#fff" }}
        ></Marker>
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
