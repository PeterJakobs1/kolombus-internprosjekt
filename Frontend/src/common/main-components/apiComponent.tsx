/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, SetStateAction } from "react";
import {
  calculateDelay,
  formatTime,
} from "../help-components/calculateDelayComponent";
import {
  fetchStations,
  fetchPlatforms,
  fetchLines,
  fetchDepartures,
} from "../../api/api-requests/kolombus";
import Select from "react-select";
import { Departure, Line, Platform, Station } from "../../types/type";
import { sortDeparturesByArrivalTime } from "../help-components/sortDeparturesByArrivalTime";
import { useDispatch } from "react-redux";
import { stationActions } from "../../store/station";
import platform, { platformActions } from "../../store/platform";
import lines, { lineActions } from "../../store/lines";
import MapComponent from "../map-components/mapComponent";
import LineNamesCard from "../help-components/lineNameCard";
import SettingsMap from "../map-components/settingsMapComponent";
import trashcann from "../../Icons/images/trashcann.png";

export const ApiComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [stations, setStations] = useState<Station[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedStation, setSelectedStation] = useState<Station[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [, setLines] = useState<Line[]>([]);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const LOCAL_STORAGE_KEY = "selectedValues";
  const [noLinesAvailable, setNoLinesAvailable] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [clickedLineDepartures,] = useState([false]);
  const [selectedLines,] = useState<string[]>([]);
  const dispatch = useDispatch();


  const toggleLineSelection = (lineName: string) => {
    const updatedSelectedLines = [...selectedLines];
    const index = updatedSelectedLines.indexOf(lineName);
    if (index !== -1) {
      updatedSelectedLines.splice(index);
    } else {
      updatedSelectedLines.push(lineName);
    }
    const filteredDepartures = updatedSelectedLines.length > 0
      ? departures.filter((departure) => updatedSelectedLines.includes(departure.line_name))
      : departures;
    setDepartures(filteredDepartures,);
  };

  const toggleMapDisplay = () => {
    setShowMap((prevShowMap) => !prevShowMap);
  };

  useEffect(() => {
    const savedValuesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedValues = JSON.parse(savedValuesJSON);

    if (savedValues) {
      setSelectedOption(savedValues.selectedOption);
      setSelectedStation(savedValues.selectedStation);
      setPlatforms(savedValues.platforms);
      setLines(savedValues.lines);
      setDepartures(savedValues.departures);
    }
  }, []);

  useEffect(() => {
    const valuesToSave = {
      selectedOption,
      selectedStation,
      platforms,
      lines,
      departures,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(valuesToSave));
  }, [selectedOption, selectedStation, platforms, departures]);

  const deleteLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setSelectedOption([]);
    setSelectedStation([]);
    setPlatforms([]);
    setLines([]);
    setDepartures([]);
  };

  const handleSearchInputChange = (newValue: SetStateAction<string>) => {
    setSearchInput(newValue);
  };

  const handleOptionChange = (selected: SetStateAction<null>) => {
    setSelectedOption(selected);
    if (selected) {
      const selectedStationId = selected.value;
      const selectedStation = stations.find(
        (station) => station.id === selectedStationId
      );
      if (selectedStation) {
        setSelectedStation([selectedStation]);
      }
      setPlatforms([]);
      setLines([]);
      setDepartures([]);
      setNoLinesAvailable(false);
    } else {
      setSelectedStation([]);
      setPlatforms([]);
      setLines([]);
      setDepartures([]);
      setNoLinesAvailable(false);
    }
    fetchStations()
      .then((response) => {
        setStations(response);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  };

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const selectOptions = (
    filteredStations as { id: string; name: string }[]
  ).map((station) => ({
    value: station.id,
    label: station.name,
  }));

  // gets each stopplace from db
  useEffect(() => {
    dispatch(stationActions.selectStation(selectedStation));
    fetchStations()
      .then((response) => {
        setStations(response);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  }, [dispatch, selectedOption, selectedStation]);

  // gets all platforms from each stopplace
  useEffect(() => {
    dispatch(platformActions.selectPlatform(selectedStation));

    if (selectedStation.length > 0) {
      fetchPlatforms(selectedStation[0])
        .then((data) => {
          setPlatforms(data);
        })
        .catch((error) => console.error("Error fetching platforms:", error));
    }
  }, [dispatch, selectedStation]);


  // gets all lines and departures from each platform
  async function getAllLinesAndDepartures(event: {
    currentTarget: { getAttribute: (arg0: string) => any };
  }, lineName: string | null) {
    try {
      const id =
        event.currentTarget.getAttribute("id");


      const linesData = await fetchLines(id);
      setLines(linesData);

      dispatch(lineActions.selectLine(linesData));
      const noLinesAvailable = linesData.length === 0;

      if (linesData.length === 0) {
        console.log("No lines available.");
      } else {
        const departuresData = await fetchDepartures(id);

        const filteredDepartures = lineName
          ? departuresData.filter((departure: { line_name: string; }) => departure.line_name === lineName)
          : departuresData;
        setDepartures(filteredDepartures);
      }
      setNoLinesAvailable(noLinesAvailable);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <div className="gridContainer">
      <div className="leftColumn">
        <h1>
          {selectedStation.map((station) => (
            <div className="selectedValue" key={station.id}>
              {station.name}
            </div>
          ))}
        </h1>
        <div className="gridContainer">
          <div className="dropdownBar">
            <h3 className="pickStation">Velg stasjon</h3>
            <div>
              <p className="searchDropDown">
                <Select
                  classNamePrefix="Velg stasjon"
                  value={selectedOption}
                  onChange={(selected) =>
                    handleOptionChange(selected as SetStateAction<null>)
                  }
                  onInputChange={handleSearchInputChange}
                  options={selectOptions}
                  placeholder="Søk..."
                />
                <button className="delete" onClick={deleteLocalStorage}>
                  <img className="trash" src={trashcann} alt="" />
                </button>
              </p>
            </div>
          </div>
        </div>
        <div>
          {selectedStation.map((station) => (
            <div className="selectedValueInfo" key={station.id}></div>
          ))}
        </div>

        <div className="platforms">
          {selectedStation.length > 0 && (
            <div className="platforms">
              <h4 className="pickStop">Velg stopp</h4>
              <p className="platformList">
                {platforms.length > 0 ? (
                  platforms.map((platform) => (

                    <button
                      className="platformButton"
                      value={selectedOption}
                      onClick={getAllLinesAndDepartures}
                      id={platform.id}
                      key={platform.id}
                    >
                      {platform.name}


                    </button>

                  ))
                ) : (
                  <span className="noPlatforms">Ingen busstopp funnet</span>
                )}

                {noLinesAvailable && platforms.length > 0 && (
                  <p className="noLinesAvailable">Ingen linjer tilgjengelig</p>
                )}


              </p>
              <div className="lineNamesCard">
                <LineNamesCard
                  departures={departures}
                  selectedLines={selectedLines}
                  toggleLineSelection={toggleLineSelection}
                />
              </div>

            </div>
          )}
        </div>

        <div className="departures">
          <ul className="departureGrid">
            {clickedLineDepartures &&
              departures
                .filter((departure) => {
                  const departureTime = new Date(
                    departure.schedule_departure_time
                  );
                  const currentTime = new Date();
                  return departureTime > currentTime;
                })
                .slice(0, 8)
                .sort(sortDeparturesByArrivalTime)
                .map((departure) => {
                  const delay = calculateDelay(departure);

                  return (
                    <li className="departureItem" key={departure.id}>
                      <button
                        className="departureButton"
                        data-departure-id={departure.nsr_id_lines}
                      >
                        <div className="lineNameAndDestination">
                          <p className="lineName">{departure.line_name}</p>
                          <p className="destinationText">
                            {departure.destination}
                          </p>
                          <div className="clockNoticeStatus">
                            <p>
                              {formatTime(departure.schedule_departure_time)}{" "}
                            </p>
                            <p>
                              {delay > 0
                                ? `Forsinket med ${Math.floor(delay)} minutter`
                                : ""}
                            </p>
                            {departure.notices !== null ? (
                              <p className="notice">{"" + departure.notices}</p>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>

      <div className="rightColumn">
        <div>
          {selectedStation.map((station) => (
            <div className="selectedValueInfo" key={station.id}>
              <div className="map">
                <button className="toggleMap" onClick={toggleMapDisplay}>
                  {showMap ? "Vis valgt stasjon" : "Vis stasjoner på kartet"}
                </button>
                {showMap ? (
                  <SettingsMap
                    stations={stations}
                    value={selectedOption}
                    platforms={platforms}
                    onClickPlatform={getAllLinesAndDepartures}
                  />

                ) : (
                  <MapComponent
                    latitude={selectedStation[0]?.latitude}
                    longitude={selectedStation[0]?.longitude}
                    name={selectedStation[0]?.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
