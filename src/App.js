import React from "react";
import "./App.css";
import AwesomeCanvas from "./awesomecanvas/awesomecanvas";
import AwesomeImage from "./awesomecanvas/awesomeimage";
import firebase from "./firebase";
import { imageData } from "./data";

function App() {
  return (
    <div className="App">
      <AwesomeCanvas width={500} height={700}>
        <AwesomeImage
          data={imageData}
          onChangeEnd={(e, newData) => {}}
          onRemove={() => {}}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
        />
      </AwesomeCanvas>
    </div>
  );
}

export default App;
