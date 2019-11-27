import React from "react";
import DNSContainer, { DNSImage } from "dns-container";

const AwesomeCanvas = props => {
  const _onChangeEnd = newData => {
    console.log("changed seem", newData);
    state[newData.id].data = newData;
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
          console.log("undo");
        }
      }
    };
    document.addEventListener("keydown", onUndo);
    return () => document.removeEventListener("keydown", onUndo);
  }, []);

  React.useEffect(() => {
    setHistory(h => [...h, state]);
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
