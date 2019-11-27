import React from "react";
import DNSContainer from "dns-container";

const AwesomeCanvas = props => {
  console.log("children", props.children);
  return <DNSContainer {...props}>{props.children}</DNSContainer>;
};

export default AwesomeCanvas;
