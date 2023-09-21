import { formatTime } from "./calculateDelayComponent";

type DepartureDetails = {
    line_number: string;
    destination: string;
    notices: string[];
    schedule_departure_time: string;
    line_name: string;
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
                                        </p>
                                        <div className="clockNoticeStatus">
                                            <p>
                                                {formatTime(departureDetails.schedule_departure_time)}{" "}
                                            </p>

                                            {departureDetails.notices !== null ? (
                                                <p className="notice">
                                                    {"" + departureDetails.notices}
                                                </p>
                                            ) : null}
                                        </div>
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
