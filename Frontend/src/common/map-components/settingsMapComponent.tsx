import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

const SettingsMap = ({ stations, getAllLinesAndDepartures }) => {
    const defaultLatitude = 58.966036;
    const defaultLongitude = 5.733064;
    const defaultZoom = 12;

    const markers = stations.slice(0, 800).map((station) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]}>
            <Popup>
                <p onClick={() => getAllLinesAndDepartures(station)}> {station.name}</p>
            </Popup>
        </Marker>
    ));

    return (
        <MapContainer
            center={[defaultLatitude, defaultLongitude]}
            zoom={defaultZoom}
            style={{
                width: "80%",
                height: "800px",
                borderRadius: "15px",
                margin: "auto",
            }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers}
        </MapContainer>
    );
};

export default SettingsMap;
