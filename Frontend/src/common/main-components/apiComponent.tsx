import { useState, useEffect, SetStateAction } from "react";
import Select from "react-select";
import { Station, Departure, Line, Platform } from "../../types/type";
import {
  fetchStations,
  fetchPlatforms,
  fetchDepartures,
  fetchLines,
} from "../../api/api-requests/kolombus";
import { useDispatch } from "react-redux";
import { stationActions } from "../../store/station";
import { platformActions } from "../../store/platform";
import lines, { lineActions } from "../../store/lines";
import MapComponent from "../map-components/mapComponent";
import SettingsMap from "../map-components/settingsMapComponent";
import trashcann from "../../Icons/images/trashcann.png";
import LineNamesCard from "../help-components/lineNameCard";
import DepartureCard from "../help-components/displayDepartures";
import PlatformsComponent from "../help-components/showPlatforms";

export const ApiComponent = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [stations, setStations] = useState<Station[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedStation, setSelectedStation] = useState<Station[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [, setLines] = useState<Line[]>([]);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const LOCAL_STORAGE_KEY = "selectedValues";
  const [noLinesAvailable, setNoLinesAvailable] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedLines] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleLineSelection = (lineName: string) => {
    const updatedSelectedLines = [...selectedLines];
    const index = updatedSelectedLines.indexOf(lineName);
    if (index !== -1) {
      updatedSelectedLines.splice(index, 1);
    } else {
      updatedSelectedLines.push(lineName);
    }
    const filteredDepartures =
      updatedSelectedLines.length > 0
        ? departures.filter((departure) =>
          updatedSelectedLines.includes(departure.line_name)
        )
        : departures;
    setDepartures(filteredDepartures);
  };

  const toggleMapDisplay = () => {
    setShowMap((prevShowMap) => !prevShowMap);
  };

  useEffect(() => {
    const savedValuesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    let savedValues = null;
    if (savedValuesJSON !== null) {
      savedValues = JSON.parse(savedValuesJSON);
    } else {
    }
    if (savedValues) {
      setSelectedOption(savedValues.selectedOption);
      setSelectedStation(savedValues.selectedStation);
      setPlatforms(savedValues.platforms);
      setLines(savedValues.lines);
      setDepartures(savedValues.departures);
      console.log(platforms);
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
    setSelectedOption("");
    setSelectedStation([]);
    setPlatforms([]);
    setLines([]);
    setDepartures([]);
  };

  const handleSearchInputChange = (newValue: SetStateAction<string>) => {
    setSearchInput(newValue);
  };

  const handleOptionChange = (selected: any | null) => {
    setSelectedOption(selected.value);
    if (selected.value) {
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

  const selectOptions: any[] = (
    filteredStations as { id: string; name: string }[]
  ).map((station) => ({
    value: station.id,
    label: station.name,
  }));

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

  useEffect(() => {
    dispatch(platformActions.selectPlatform(selectedStation));

    if (selectedStation.length > 0) {
      fetchPlatforms(selectedStation[0])
        .then((data) => {
          setPlatforms(data);
          console.log(selectedStation);
        })
        .catch((error) => console.error("Error fetching platforms:", error));
    }
  }, [dispatch, selectedStation]);

  async function getAllLinesAndDepartures(
    event: {
      currentTarget: { getAttribute: (arg0: string) => any };
    },
    lineName: string | null
  ) {
    try {
      const id = event.currentTarget.getAttribute("id");

      const linesData = await fetchLines(id);
      setLines(linesData);
      console.log(linesData);

      dispatch(lineActions.selectLine(linesData));
      const noLinesAvailable = linesData.length === 0;

      if (linesData.length === 0) {
        console.log("No lines available.");
      } else {
        const departuresData = await fetchDepartures(id);

        const filteredDepartures = lineName
          ? departuresData.filter(
            (departure: { line_name: string }) =>
              departure.line_name === lineName
          )
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
            <div className="searchDropDown">
              <Select
                classNamePrefix="Velg stasjon"
                value={selectedOption || " "}
                onChange={handleOptionChange}
                onInputChange={handleSearchInputChange}
                options={selectOptions || " "}
                placeholder="Søk..."
              />
              <button className="delete" onClick={deleteLocalStorage}>
                <img className="trash" src={trashcann} alt="" />
              </button>
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
            <div>
              <PlatformsComponent
                platforms={platforms}
                noLinesAvailable={noLinesAvailable}
                onPlatformClick={(platformId: any) => {
                  setButtonClicked(true);
                  getAllLinesAndDepartures(
                    { currentTarget: { getAttribute: () => platformId } },
                    null
                  );
                }}
              />
              {buttonClicked && (
                <div className="lineNamesCard">
                  <LineNamesCard
                    departures={departures}
                    selectedLines={selectedLines}
                    toggleLineSelection={toggleLineSelection}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="departures">
          <ul className="departureGrid">
            <li>
              <DepartureCard
                departures={departures}
                selectedLines={selectedLines}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="rightColumn">
        <div>
          {selectedStation.map((station) => (
            <div className="selectedValueInfo" key={station.id}>
              <div className="map">
                <button className="toggleMap" onClick={toggleMapDisplay}>
                  {showMap ? "Vis valgt stasjon" : "Se alle stasjoner"}
                </button>
                {showMap ? (
                  <SettingsMap
                    stations={stations}
                    value={selectedOption}
                    platforms={platforms}
                    onClickPlatform={getAllLinesAndDepartures}
                    getAllLinesAndDepartures={function (
                      _station: Station
                    ): Promise<void> {
                      throw new Error("Function not implemented.");
                    }}
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
