import React from "react";
import { Search, MapPin, Wind } from "react-feather";
import CurrentLocation from "./Components/CurrentLocation";
import Weather from "./Components/Weather";

function App() {
  return (
    <div className="overAllContainer">
      <CurrentLocation />
      <Weather />
    </div>
  );
}

export default App;
