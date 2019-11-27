import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = props => {
  const { id, firebase } = props;
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    firebase
      .collection("ImageContents")
      .doc(id)
      .get()
      .then(docQuery => {
        if (docQuery.exists) {
          setState(toImageObj(docQuery));
        }
      });
  }, [id]);
  console.log("state", state);
  return (
    <React.Fragment>
      {state ? (
        <DNSImage
          data={state}
          onChangeEnd={newData => {
            console.log("new data", newData);
          }}
          onRemove={remove => console.log("remove", remove)}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AwesomeImage;
