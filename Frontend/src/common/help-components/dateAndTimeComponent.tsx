import { useState, useEffect } from "react";


const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = {
    weekday: "long" as const,
    day: "numeric",
    month: "short",
  };

  const formattedDate = currentDateTime.toLocaleString("nb-NO", options);
  const formattedDateCapitalized =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const formattedTime = currentDateTime.toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <h4>
        {formattedDateCapitalized} {formattedTime}
      </h4>
    </div>
  );
};

export default DateTimeComponent;
