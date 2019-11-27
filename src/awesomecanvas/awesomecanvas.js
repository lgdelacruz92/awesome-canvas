import React from "react";
import DNSContainer, { DNSImage } from "dns-container";

const AwesomeCanvas = props => {
  const { width, height } = props;
  return (
    <DNSContainer width={width} height={height}>
      {props.children}
    </DNSContainer>
  );
};

export default AwesomeCanvas;
