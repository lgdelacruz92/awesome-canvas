import React from "react";
import DNSContainer from "dns-container";

const AwesomeCanvas = props => {
  const children = React.Children.toArray(props.children);
  const childrenRefs = React.useRef([]);

  if (childrenRefs.current.length <= 0) {
    children.forEach(child => {
      childrenRefs.current.push(React.createRef());
    });
  }

  const onChange = data => {
    console.log(data, "changed");
  };

  const childrenClones = children.map((child, i) =>
    React.cloneElement(child, {
      ref: childrenRefs.current[i],
      onChange
    })
  );

  return <DNSContainer {...props}>{childrenClones}</DNSContainer>;
};

export default AwesomeCanvas;
