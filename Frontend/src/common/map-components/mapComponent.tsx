import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapComponentProps } from "../../types/type";
import { LatLngExpression } from "leaflet";

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

      <Marker position={markerPosition}>
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
