import { Link } from "react-router-dom";
import SettingsComponent from "../common/main-components/settingsComponent";
import DateTimeComponent from "../common/help-components/dateAndTimeComponent";


export function SettingsFunc() {
  return (
    <div className="app-container">
      <div className="header">
        <div>
          <h1>Instillinger</h1>
        </div>
        <div>
          <DateTimeComponent />
        </div>
        <Link to="/">
          <button>Tilbake</button>
        </Link>
      </div>
      <div className="context">
        <SettingsComponent />
      </div>
    </div>
  );
}
