import React from "react";
import DNSContainer from "dns-container";

const AwesomeCanvas = props => {
  const children = React.Children.toArray(props.children);
  const childrenRefs = React.useRef([]);
  const [history, setHistory] = React.useState({});

  if (childrenRefs.current.length <= 0) {
    children.forEach(child => {
      childrenRefs.current.push(React.createRef());
    });
  }

  const onChange = data => {
    console.log("On change");
  };

  const childrenClones = children.map((child, i) =>
    React.cloneElement(child, {
      ref: childrenRefs.current[i],
      onChange
    })
  );

  React.useEffect(() => {
    childrenClones.forEach(child => {
      setHistory(h => ({ ...h, [child.props.id]: [] }));
    });

    // eslint-disable-next-line
  }, []);

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

  return <DNSContainer {...props}>{childrenClones}</DNSContainer>;
};

export default AwesomeCanvas;
