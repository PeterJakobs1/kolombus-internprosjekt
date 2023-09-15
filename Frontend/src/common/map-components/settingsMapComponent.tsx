import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Platform, Station } from "../../types/type";
import marker from "../../Icons/images/marker.png";
import L from "leaflet";


// Create a custom icon using your custom PNG image
const customIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [32, 32], // Adjust the icon size as needed
    iconAnchor: [16, 32], // Adjust the icon anchor point if needed
});

interface SettingsMapProps {
    stations: Station[];
    platforms: Platform[];
    getAllLinesAndDepartures: (station: Station) => Promise<void>;
    onClickPlatform: (
        event: { currentTarget: { getAttribute: (arg0: string) => any } },
        lineName: string | null
    ) => Promise<void>;
    value: string | null; //
}

const SettingsMap: React.FC<SettingsMapProps> = ({ stations, getAllLinesAndDepartures }) => {
    const defaultLatitude = 58.966036;
    const defaultLongitude = 5.733064;
    const defaultZoom = 12;

    const markers = stations.slice(0, 800).map((station) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]}

            icon={customIcon} // Set the custom icon for this marker
        >
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
