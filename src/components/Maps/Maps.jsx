import React, { useEffect, useState } from "react";
import logo  from "../../assets/svg/logo.svg";
import './Maps.sass'
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";

import { Search } from "./Search";


const mapContainerStyle = {
  height: "400px",
  width: "100%",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const Map= ({
    setLocation, 
    location, 
    setPlaceName, 
    defaultAddress,
    defaultPlaceName}) => {

  const [locationBySearch, setLocationBySearch] = useState();


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDoH60nuOyBogAvb-hrikuyVj65ydLi9a8",
    libraries: ["places"],
  });

  useEffect(()=>{
    if(defaultAddress){
      setLocation({
        latitude: defaultAddress.lat,
        longitude: defaultAddress.lng
      })
    }
  }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return <span>Error</span>;
  if (!isLoaded) return <span>Loading...</span>;

 
 
  return (
      <>
      <div className="mapsWrapper">
      <img  className="mapsLogo" src = {logo} alt = "logo"></img>

      <Search 
        panTo={panTo} 
        setLocation = {setLocation} 
        setLocationBySearch = {setLocationBySearch} 
        setPlaceName = {setPlaceName} 
        defaultPlaceName = {defaultPlaceName} />
  
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={defaultAddress || center}
        options={options}
        onLoad={onMapLoad}
      >

      {(locationBySearch || (+location?.latitude!==0 && +location?.longitude!==0)) && <Marker
            position={{
              lat: +locationBySearch?.latitude || +location?.latitude || +defaultAddress?.lat ,
              lng: +locationBySearch?.longitude || +location?.longitude || +defaultAddress?.lng
            }}
          />}
      </GoogleMap>
    </div>
      </>
   
  );
}


export default Map