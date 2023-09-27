import { formatTime } from "./calculateDelayComponent";
import bus from "../../Icons/images/bus.png";
import rail from "../../Icons/images/rail.png";
import water from "../../Icons/images/water.png";

type DepartureDetails = {
    line_number: string;
    destination: string;
    notices: string[];
    schedule_departure_time: string;
    line_name: string;
    name: string;
};

type DepartureDetailsCardProps = {
    departures: DepartureDetails[];
    selectedLines: string[];
};

const DepartureCard: React.FC<DepartureDetailsCardProps> = ({
    departures,
    selectedLines,
}) => {
    const uniqueDepartures = Array.from(
        new Set(departures.map((departure) => departure.line_number))
    );

    return (
        <div className="departures">
            <ul className="departureGrid">
                {uniqueDepartures.map((lineNumber) => {
                    const departureDetails = departures.find(
                        (departure) => departure.line_number === lineNumber
                    );
                    if (departureDetails) {
                        return (
                            <li className="departureItem" key={lineNumber}>
                                <button
                                    className={`departureButton ${selectedLines.includes(lineNumber) ? "selected" : ""
                                        }`}
                                >
                                    <div className="lineNameAndDestination">
                                        <p className="lineName">{departureDetails.line_name}</p>
                                        <p className="destinationText">
                                            {departureDetails.destination}
                                            {departureDetails.notices !== null ? (
                                                <li className="notice">
                                                    {"" + departureDetails.notices}
                                                </li>
                                            ) : null}
                                        </p>
                                        <div className="clockNoticeStatus">
                                            <p>
                                                {formatTime(departureDetails.schedule_departure_time)}{" "}
                                            </p>


                                        </div>
                                        <p className="transport-mode-img">
                                            {departureDetails.transport_mode === "bus" && (
                                                <>
                                                    <img src={bus} alt="" />
                                                </>
                                            )}
                                            {departureDetails.transport_mode === "rail" && (
                                                <>
                                                    <img src={rail} alt="" />
                                                </>
                                            )}
                                            {departureDetails.transport_mode === "water" && (
                                                <>
                                                    <img src={water} alt="" />
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </div>
    );
};

export default DepartureCard;
