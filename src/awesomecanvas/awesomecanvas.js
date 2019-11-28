import React from "react";
import DNSContainer, { DNSImage } from "dns-container";
import { copyState, initializeState, onUndo as undo } from "./utils";
const AwesomeCanvas = props => {
  const _onChangeEnd = newData => {
    const topHistory = history[history.length - 1];
    let newHistory = copyState(topHistory);
    const historyToChange = newHistory[newData.id];

    Object.keys(newHistory).forEach(histKey => {
      if (histKey === newData.id) {
        newHistory[histKey].data = { ...newData };
      }
    });
    history.push(newHistory);
    setHistory([...history]);
  };

  const _onRemove = dataId => {
    console.log("chane remove data", dataId);
  };

  const _onMoveUp = dataId => {
    console.log("seem move up dataId", dataId);
  };

  const _onMoveDown = dataId => {
    console.log("seem move down", dataId);
  };

  const initialState = initializeState({
    props,
    _onChangeEnd,
    _onRemove,
    _onMoveDown,
    _onMoveUp
  });
  const [state, setState] = React.useState(initialState);
  const [history, setHistory] = React.useState([initialState]);

  React.useEffect(() => {
    const onUndo = e => {
      undo(e);
    };
    document.addEventListener("keydown", onUndo);
    return () => document.removeEventListener("keydown", onUndo);
  }, []);

  React.useEffect(() => {
    let topHistory = history[history.length - 1];
    let newState = copyState(topHistory);
    setState(newState);
  }, [history]);

  return (
    <DNSContainer {...props}>
      {Object.keys(state).map((key, i) => (
        <DNSImage
          key={key}
          data={state[key].data}
          onChangeEnd={state[key].onChangeEnd}
          onRemove={state[key].onRemove}
          onMoveUp={state[key].onMoveUp}
          onMoveDown={state[key].onMoveDown}
        />
      ))}
    </DNSContainer>
  );
};

export default AwesomeCanvas;
