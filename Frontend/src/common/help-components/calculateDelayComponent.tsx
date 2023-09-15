
import { Departure } from "../../types/type";

export const calculateDelay = (departure: Departure): number => {
  const scheduleTime = new Date(departure.schedule_departure_time);
  const expectedTime = new Date(departure.expected_departure_time);
  const delayInMilliseconds = expectedTime.getTime() - scheduleTime.getTime();

  const delayInMinutes = delayInMilliseconds / 6000;
  return delayInMinutes;
};

export const formatDelayTime = (delayInMinutes: number): string => {
  if (delayInMinutes >= 60) {
    const hours = Math.floor(delayInMinutes / 60);
    const minutes = Math.round(delayInMinutes % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  } else {
    return `${Math.round(delayInMinutes)} minutter`;
  }
};

export const formatTime = (timeString: string): JSX.Element => {
  const inputDate = new Date(timeString);
  const currentTime = new Date();

  const timeDifferenceInMilliseconds =
    inputDate.getTime() - currentTime.getTime();
  const minutesDifference = Math.floor(timeDifferenceInMilliseconds / 60000);

  if (minutesDifference < 2) {
    return <span className="nowText">NÅ</span>;
  } else {
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes();

    if (minutesDifference < 10) {
      return <span className="nowText">{minutesDifference} min</span>;
    } else {
      return (
        <span>
          {hours}:{minutes.toString().padStart(2, "0")}
        </span>
      );
    }
  }
};
