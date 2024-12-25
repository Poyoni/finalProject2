

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IDeadliestAttacksStats, IAttackGroupStats, IDeadliestRegionStats } from "../../types/attackType";



const customIcon = L.icon({
  iconUrl: "https://static.vecteezy.com/system/resources/previews/009/267/936/non_2x/location-icon-design-free-png.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const data = useSelector((state: RootState) => state.data.data);


  const ClickHandler = () => {
    useMapEvent("click", (event) => {
      const { lat, lng } = event.latlng;
      setPosition([lat, lng]);
    });
    return null; 
  };

  const renderMarkers = () => {

    if (Array.isArray(data)) {
      return data.map((item, index) => {
        if (isDeadliestAttacksStats(item)) {
          return (
            <Marker
              key={index}
              position={[item.location.latitude, item.location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <strong>Region: </strong> {item.region} <br />
                <strong>Average Casualties: </strong> {item.averageCasualties.toFixed(2)} <br />
                <strong>Latitude: </strong> {item.location.latitude} <br />
                <strong>Longitude: </strong> {item.location.longitude}
              </Popup>
            </Marker>
          );
        } else if (isAttackGroupStats(item)) {
          return (
            <Marker
              key={index}
              position={[item.location.latitude, item.location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <strong>Attack Group: </strong> {item.group} <br />
                <strong>Average Casualties: </strong> {item.totalAttacks.toFixed(2)} <br />
                <strong>Latitude: </strong> {item.location.latitude} <br />
                <strong>Longitude: </strong> {item.location.longitude}
              </Popup>
            </Marker>
          );
        } else if (isDeadliestRegionStats(item)) {
          console.log(item);
          return (
            <Marker
              key={index}
              position={[item.location.latitude, item.location.longitude]}
              icon={customIcon}
            >
              <Popup>
                <strong>Region: </strong> {item.region} <br />
                <strong>Casualties: </strong> {item.totalCasualties.toFixed(2)} <br />
                <strong>Latitude: </strong> {item.location.latitude} <br />
                <strong>Longitude: </strong> {item.location.longitude}
              </Popup>
            </Marker>
          );
        }
        return null;
      });
    } else if (data && data.location) {
      return (
        <Marker
          position={[data.location.latitude, data.location.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>Location: </strong> {data.location.name} <br />
            <strong>Average Casualties: </strong> {data.averageCasualties.toFixed(2)} <br />
            <strong>Latitude: </strong> {data.location.latitude} <br />
            <strong>Longitude: </strong> {data.location.longitude}
          </Popup>
        </Marker>
      );
    }
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[0, 0]}
        zoom={1}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickHandler />

        {renderMarkers()}

        {position && (
          <Marker position={position}>
            <Popup>
              You clicked here:<br />
              Lat: {position[0]}<br />
              Lng: {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};



const isDeadliestAttacksStats = (data: any): data is IDeadliestAttacksStats => {
  return data && data.region && data.location && data.averageCasualties !== undefined;
};

const isAttackGroupStats = (data: any): data is IAttackGroupStats => {
  return data && data.group && data.location && data.totalAttacks !== undefined;
};

const isDeadliestRegionStats = (data: any): data is IDeadliestRegionStats => {
  return data && data.region && data.location && data.totalCasualties !== undefined;
};

export default MapComponent;
