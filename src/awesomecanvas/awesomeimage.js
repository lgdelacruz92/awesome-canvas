import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = React.forwardRef((props, ref) => {
  const { id, firebase, data } = props;
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
  }, [id, firebase]);
  return (
    <React.Fragment>
      {state ? (
        <DNSImage
          {...props}
          data={state}
          onChangeEnd={newData => {
            const imageContentRef = firebase
              .collection("ImageContents")
              .doc(id);
            firebase.runTransaction(transaction => {
              return transaction.get(imageContentRef).then(imageContentDoc => {
                if (!imageContentDoc.exists) {
                  throw Error("Image data does not exists");
                }
                transaction.update(imageContentRef, newData);
              });
            });
            ref.current = newData;
          }}
          onRemove={remove => console.log("remove", remove)}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
        />
      ) : null}
    </React.Fragment>
  );
});

export default AwesomeImage;
