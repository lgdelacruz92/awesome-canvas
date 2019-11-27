import React from "react";
import DNSContainer, { DNSImage } from "dns-container";
import uuid from "react-uuid";

const AwesomeCanvas = props => {
  const _onChangeEnd = newData => {
    console.log("changed seem", newData);
    state[newData.id].data = { ...newData };
    setState({ ...state });
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

  const [state, setState] = React.useState(() => {
    const children = React.Children.toArray(props.children);

    let startState = {};
    children.forEach(child => {
      let childId = child.props.data.id;
      startState[childId] = {
        data: child.props.data,
        onChangeEnd: newData => {
          _onChangeEnd(newData);
          child.props.onChangeEnd(newData);
        },
        onRemove: () => {
          _onRemove(childId);
          child.props.onRemove();
        },
        onMoveUp: () => {
          _onMoveUp(childId);
          child.props.onMoveUp();
        },
        onMoveDown: () => {
          _onMoveDown(childId);
          child.props.onMoveDown();
        }
      };
    });
    return startState;
  });
  const [history, setHistory] = React.useState([]);
  const [historyPos, setHistoryPos] = React.useState(-1);

  React.useEffect(() => {
    let time = 0;
    const onUndo = e => {
      const isCMDKey = e.key === "Meta";
      if (isCMDKey) {
        time = Date.now();
      }

      if (e.key === "z") {
        const isPressedAtTheSameTime = Date.now() - time < 200;
        if (isPressedAtTheSameTime) {
          console.log("undo", historyPos);

          if (historyPos > 0) {
            let prevState = history[historyPos - 1];
            let newState = {};
            Object.keys(prevState).forEach(prevStateId => {
              let prevStateData = prevState[prevStateId];
              newState[prevStateId] = {
                data: JSON.parse(JSON.stringify(prevStateData.data)),
                onChangeEnd: prevStateData.onChangeEnd,
                onRemove: prevStateData.onRemove,
                onMoveUp: prevStateData.onMoveUp,
                onMoveDown: prevStateData.onMoveDown
              };
            });
            console.log("New State");
            setState(newState);
          }
        }
      }
    };
    document.addEventListener("keydown", onUndo);
    return () => document.removeEventListener("keydown", onUndo);
  }, [historyPos]);

  const copyState = () => {
    let stateCopy = {};
    Object.keys(state).forEach(stateId => {
      let stateData = state[stateId];
      stateCopy[stateId] = {
        data: JSON.parse(JSON.stringify(stateData.data)),
        onChangeEnd: stateData.onChangeEnd,
        onRemove: stateData.onRemove,
        onMoveUp: stateData.onMoveUp,
        onMoveDown: stateData.onMoveDown
      };
    });
    return stateCopy;
  };

  React.useEffect(() => {
    setHistory(his => {
      if (his.length > 4) {
        his.splice(0, 1);
      }

      return [...his, copyState()];
    });
  }, [state]);

  React.useEffect(() => {
    setHistoryPos(history.length - 1);
  }, [history]);

  return (
    <DNSContainer {...props}>
      {Object.keys(state).map(key => (
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
