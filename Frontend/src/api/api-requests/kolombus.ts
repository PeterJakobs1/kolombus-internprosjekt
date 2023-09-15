import { Station, Platform } from "../../types/type";

export const fetchStations = async () => {
  const apiUrl = "https://kolombus-reskin-api.azurewebsites.net/api/StopsPlaces";
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
  console.log(selectedStation.externalId)

  //const platformsUrl = `http://localhost:5000/api/StopsPlaces/${nsr_id}/platforms`;
  const platformsUrl = `https://kolombus-reskin-api.azurewebsites.net/api/StopsPlaces/${nsr_id}/platforms`;


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
  const thisDate = new Date().toISOString();
  console.log(thisDate)
  console.log(fetchLines)
  //const linesUrl = `http://localhost:5000/api/Platforms/${id}/departures??startTime=${thisDate}`;
  const linesUrl = `https://kolombus-reskin-api.azurewebsites.net/api/Platforms/${id}/departures??startTime=${thisDate}`;
  //const linesUrl = `http://localhost:5158/api/Platforms/${id}/departures`;
  
  console.log("departuresID" + "" + id);

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
