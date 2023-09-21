import { Station, Platform } from "../../types/type";

export const fetchStations = async () => {
  const apiUrl =
    "https://kolombus-reskin-api.azurewebsites.net/api/StopsPlaces";
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
  const nsr_id = selectedStation.externalId;
  const platformsUrl = `https://kolombus-reskin-api.azurewebsites.net/api/StopsPlaces/${nsr_id}/platforms/`;

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

export const fetchLines = async (id: string | null) => {
  if (!id) {
    throw new Error("id is null or undefined");
  }

  const linesUrl = `https://kolombus-reskin-api.azurewebsites.net/api/Platforms/sa/lines`;

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

  // DEMO URL
  const departureUrl = `https://api.kolumbus.no/api/platforms/NSR%3AStopPlace%3A27498/departures?startTime=2023-09-18T09%3A07%3A13.607Z`;

  // ACTUAL URL
  // const thisDate = new Date().toISOString();
  // const departureUrl = `https://kolombus-reskin-api.azurewebsites.net/api/Platforms/${selectedPlatform}/departures?startTime=${thisDate}`;

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
      fetchLines(selectedStation.externalId),
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
