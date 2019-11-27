import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = props => {
  const { id, firebase, data } = props;
  const [state, setState] = React.useState(data);
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
  }, [id, firebase]);
  return (
    <DNSImage
      {...props}
      data={state}
      onChangeEnd={newData => {
        console.log("new data", newData);
      }}
      onRemove={remove => console.log("remove", remove)}
      onMoveUp={() => {}}
      onMoveDown={() => {}}
    />
  );
};

export default AwesomeImage;
