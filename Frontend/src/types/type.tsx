export interface Station {
  isFavorite: any;
  public_code: string;
  platforms: Platform[];
  transport_mode: string;
  value: string;
  longitude: number;
  latitude: number;
  name: string;
  externalId: string;
  id: string;

}
export interface Delay {
  minutes: number;
}

export interface DepartureDetails {
  destination: string;
  notices: string[];
  schedule_departure_time: string;
  line_name: string;
  line_number: string;
}

export interface PlatformsComponentProps {
  platforms: Platform[];
  noLinesAvailable: boolean;
  onPlatformClick: (platformId: string) => void;
}

export interface Platform {
  longitude: any;
  id: string;
  name: string;
  public_code: string;
  nsr_id: string;
  nsr_id_lines: string | null;
  modifications: string;
}

export interface Line {
  id: string;
  name: string;
  nsr_id: string;
  lineName: string;
}

export interface Options {
  weekday: string;
  day: string;
  month: string;
}

export interface MapComponentProps {
  latitude: number;
  longitude: number;
  name: string;
}
export interface SettingsMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

export interface Departure {
  expected_departure_time: string;
  schedule_departure_time: string;
  length: number;
  line_name: string;
  schedule_arrival_time: string;
  expected_arrival_time: string;
  notices: string[];
  trip_id: string;
  nsr_id_lines: string;
  id: string;
  name: string;
  nsr_id: string;
  destination: string;
  setDepartures: string;
  line_number: string;
}
export interface Options {
  weekday: string;
  day: string;
  month: string;
}
export interface NSR_ID_LINES {
  id: string;
}
export interface Trips {
  setSelectedDepartureId: string;
  setShowPopup: boolean;
}
