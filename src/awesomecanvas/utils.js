import React from "react";
export const copyState = item => {
  let newCopy = {};
  Object.keys(item).forEach(stateId => {
    let itemData = item[stateId];
    newCopy[stateId] = {
      data: JSON.parse(JSON.stringify(itemData.data)),
      onChangeEnd: itemData.onChangeEnd,
      onRemove: itemData.onRemove,
      onMoveUp: itemData.onMoveUp,
      onMoveDown: itemData.onMoveDown
    };
  });
  return newCopy;
};

export const initializeState = dep => {
  const { props, _onChangeEnd, _onRemove, _onMoveDown, _onMoveUp } = dep;
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
};

let time = 0;

export const onUndo = (e, setHistory) => {
  const isCMDKey = e.key === "Meta";
  if (isCMDKey) {
    time = Date.now();
  }

  if (e.key === "z") {
    const isPressedAtTheSameTime = Date.now() - time < 200;
    if (isPressedAtTheSameTime) {
      console.log("undo");
      setHistory(h => {
        if (h.length <= 1) {
          return [...h];
        } else {
          h.splice(h.length - 1, 1);
          return [...h];
        }
      });
    }
  }
};

export const initializeRefs = props => {
  const children = React.Children.toArray(props.children);
  return children.map(child => React.createRef());
};
