import { Station, Platform } from "../../types/type";

export const fetchStations = async () => {
  const apiUrl = "http://localhost:5198/api/StopPlaces?name=ok";
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
};

export const fetchPlatforms = async (selectedStation: Station) => {
  if (!selectedStation) {
    throw new Error("No selected station provided");
  }
  const nsr_id = selectedStation.external_id;
 const platformsUrl = `http://localhost:5198/api/StopPlaces/${nsr_id}/platforms`;
  //const platformsUrl = `https://api.kolumbus.no/api/stopplaces/${nsr_id}/platforms`;

  try {
    const response = await fetch(platformsUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw error;
  }
};

export const fetchLines = async (nsr_id_lines: string | null) => {
  if (!nsr_id_lines) {
    throw new Error("nsr_id_lines is null or undefined");
  }

  const linesUrl = `http://localhost:5198/api/Platforms/${nsr_id_lines}/lines`; // Notice the '/' after nsr_id_lines
  console.log(nsr_id_lines);

  try {
    const response = await fetch(linesUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lines:", error);
    throw error;
  }
};


export const fetchDepartures = async (selectedPlatform: Platform[]) => {
  if (!selectedPlatform) {
    throw new Error("No selected platform provided");
  }

  const thisDate = new Date().toISOString();
  const departureUrl = `http://localhost:5198/api/Platforms/${selectedPlatform}/departures??startTime=${thisDate}`;
 // const departureUrl = `https://api.kolumbus.no/api/platforms/${selectedPlatform}/departures?startTime=${thisDate}`;

  try {
    const response = await fetch(departureUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching departures:", error);
    throw error;
  }
};

export const fetchTripDetails = async (selectedDepartureId: string) => {
  if (!selectedDepartureId) {
    throw new Error("No selected departure ID provided");
  }

  //const thisDate = new Date().toISOString();
  const apiUrl = `https://api.kolumbus.no/api/journeys/${selectedDepartureId}/stoptimes/`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trip details:", error);
    throw error;
  }
};

export const fetchAllData = async (selectedStation: Station) => {
  try {
    const [stations, platforms, lines, departures] = await Promise.all([
      fetchStations(),
      fetchPlatforms(selectedStation),
      fetchLines(selectedStation.external_id),
      fetchDepartures(selectedStation.platforms),
    ]);
    return {
      stations,
      platforms,
      lines,
      departures,
    };
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};
