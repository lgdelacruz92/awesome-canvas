import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = React.forwardRef((props, ref) => {
  const { id, firebase, data, onChange } = props;
  console.log("data=", data);
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
            onChange(ref.current);
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
