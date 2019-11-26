import React from "react";
import "./App.css";
import AwesomeCanvas from "./awesomecanvas/awesomecanvas";
import AwesomeImage from "./awesomecanvas/awesomeimage";

function App() {
  return (
    <div className="App">
      <AwesomeCanvas width={500} height={700}>
        <AwesomeImage id="id123" />
      </AwesomeCanvas>
    </div>
  );
}

export default App;
