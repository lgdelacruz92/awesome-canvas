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
    const childrenReferences = childrenRefs.current;
    childrenReferences.forEach(childRef => {
      const content = childRef.current;
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

  return <DNSContainer {...props}>{childrenClones}</DNSContainer>;
};

export default AwesomeCanvas;
