import React from "react";
import DNSContainer, { DNSImage } from "dns-container";

const AwesomeCanvas = props => {
  const { width, height } = props;
  const children = React.Children.toArray(props.children);
  children.forEach(c => {
    const child = React.cloneElement(c);
    console.log("The child", child);
  });
  return (
    <DNSContainer width={width} height={height}>
      {props.children}
    </DNSContainer>
  );
};

export default AwesomeCanvas;
