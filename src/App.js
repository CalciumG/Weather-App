import React, { useState } from "react";
import "./index.css";
import ComponentWithGeolocation from "./Components/ComponentWithGeolocation";

const api = {
  key: "01e996920f65e535c780c5ad7bef78ce",
  base: "http://api.openweathermap.org/data/2.5/",
};

const cityApi = {
  key: "b6b6fa899ed2921a32d25deb7e6db975",
  base: "http://api.positionstack.com/v1/reverse?",
};

function App() {
  return (
    <div>
      <ComponentWithGeolocation />
    </div>
  );
}

export default App;
