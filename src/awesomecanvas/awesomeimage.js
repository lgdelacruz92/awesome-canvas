import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = props => {
  return <DNSImage {...props} />;
};

export default AwesomeImage;
