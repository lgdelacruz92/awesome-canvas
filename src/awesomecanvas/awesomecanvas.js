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
      if (childRef.current) {
        if (history[childRef.current.id].length > 20) {
          history[childRef.current.id].splice(0, 1);
        }
        history[childRef.current.id].push(childRef.current);
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
