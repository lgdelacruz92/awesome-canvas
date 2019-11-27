import React from "react";
import DNSContainer from "dns-container";

const AwesomeCanvas = props => {
  const children = React.Children.toArray(props.children);
  const childrenRefs = React.useRef([]);
  const [history, setHistory] = React.useState({});
  const [historyPos, setHistoryPos] = React.useState(0);

  if (childrenRefs.current.length <= 0) {
    children.forEach(child => {
      childrenRefs.current.push(React.createRef());
    });
  }

  const onChange = data => {
    const childrenReferences = childrenRefs.current;
    childrenReferences.forEach(childRef => {
      const content = childRef.current.content;
      if (content) {
        let childHistory = history[content.id];
        const isHistoryFull = childHistory.length > 20;
        if (isHistoryFull) {
          childHistory.splice(0, 1);
        }
        childHistory.push(content);
      }
    });
    setHistory({ ...history });
    setHistoryPos(historyPos + 1);
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
          if (historyPos > 0) {
            const childrenReferences = childrenRefs.current;
            childrenReferences.forEach(childRef => {
              childRef.current.update("test");
            });
          }
        }
      }
    };
    document.addEventListener("keydown", onUndo);
    return () => document.removeEventListener("keydown", onUndo);
  }, [historyPos]);

  return <DNSContainer {...props}>{childrenClones}</DNSContainer>;
};

export default AwesomeCanvas;
