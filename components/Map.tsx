import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

const Map = () => {
  const [myLatitude, setMyLatitude] = useState(0);
  const [myLongitude, setMyLongitude] = useState(0);
  const [mapReady, setMapReady] = useState(false)
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function (position){
      setMyLatitude(position.coords.latitude)
      setMyLongitude(position.coords.longitude)
      setMapReady(true)
      console.log(position)
    })
    
  }, [])
  
  
    return (
    <>
    { mapReady &&
      <MapContainer center={[myLatitude, myLongitude]} zoom={15} scrollWheelZoom={true} style={{height: 550, width: 680}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[myLatitude, myLongitude]}>
        
        </Marker>
      </MapContainer>
    }
    </>
  );
};

export default Map;
