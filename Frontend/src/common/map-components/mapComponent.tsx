import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapComponentProps } from "../../types/type";
import { LatLngExpression } from "leaflet";
import customMarkerIcon from "../../Icons/images/marker.png";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  name,
}) => {
  const markerPosition: LatLngExpression = [latitude, longitude];

  return (
    <MapContainer
      center={markerPosition}
      zoom={16}
      style={{
        width: "80%",
        height: "800px",
        borderRadius: "15px",
        margin: "auto",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={markerPosition} icon={customIcon}>
        <Popup>
          <div>
            <h3>{name}</h3>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
