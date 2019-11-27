import React from "react";
import DNSContainer from "dns-container";

const AwesomeCanvas = props => {
  const [state, setState] = React.useState(() => {
    const children = React.Children.toArray(props.children);

    let startState = {};
    children.forEach(child => {
      let childId = child.props.data.id;
      startState[childId] = {
        data: child.props.data,
        onChangeEnd: child.props.onChangeEnd,
        onRemove: child.props.onRemove,
        onMoveUp: child.props.onMoveUp,
        onMoveDown: child.props.onMoveDown
      };
    });
    return startState;
  });

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

  return <DNSContainer {...props}></DNSContainer>;
};

export default AwesomeCanvas;
