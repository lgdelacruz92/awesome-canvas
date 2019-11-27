import React from "react";
import DNSContainer from "dns-container";

const AwesomeCanvas = props => {
  return <DNSContainer {...props}>{props.children}</DNSContainer>;
};

export default AwesomeCanvas;
