import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = React.forwardRef((props, ref) => {
  const { id, firebase, data, onChange } = props;
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
    updateRef({ content: data });
  }, [id, firebase, ref, data]);
  const update = data => {
    console.log("Updated", data);
  };

  const updateRef = item => {
    if (ref.current) {
      ref.current = { ...ref.current, ...item };
    } else {
      ref.current = item;
    }
  };

  React.useEffect(() => {
    updateRef({ update: update });
  }, []);
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
            updateRef({ content: newData });
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
