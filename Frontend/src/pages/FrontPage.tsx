import { Link } from "react-router-dom";
import DateTimeComponent from "../common/help-components/dateAndTimeComponent";
import { ApiComponent } from "../common/main-components/apiComponent";
import { useEffect } from "react";
import logo from "../Icons/images/logo.png";


export function FrontFunc() {
  const refreshInterval = 60 * 1000;

  useEffect(() => {
    const timerId = setTimeout(() => {
      window.location.reload();
    }, refreshInterval);
    return () => clearTimeout(timerId);
  }, [refreshInterval]);

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <img className="logo" src={logo} alt="" />
        </div>
        <div>
          <DateTimeComponent />
        </div>
        <Link to={"/settings"}>
          <button className="Innstillinger">Innstillinger</button>
        </Link>{" "}
      </div>

      <div className="context">
        <ApiComponent />
      </div>
    </div>
  );
}

export default FrontFunc;
