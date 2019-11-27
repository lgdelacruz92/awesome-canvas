import React from "react";
import "./App.css";
import AwesomeCanvas from "./awesomecanvas/awesomecanvas";
import AwesomeImage from "./awesomecanvas/awesomeimage";

import firebase from "./firebase";

function App() {
  return (
    <div className="App">
      <AwesomeCanvas width={500} height={700}>
        <AwesomeImage id="J2rtyvOciilRkGvQt7Ia" firebase={firebase} />
      </AwesomeCanvas>
    </div>
  );
}

export default App;
