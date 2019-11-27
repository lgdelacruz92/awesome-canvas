import React from "react";
import { DNSImage } from "dns-container";
import { toImageObj } from "./toImageObj";

const AwesomeImage = React.forwardRef((props, ref) => {
  const { id, firebase, data, onChange } = props;
  data.id = id;
  const [state, setState] = React.useState(data);

  const update = data => {
    setState({ ...data });
  };

  const updateRef = item => {
    if (ref.current) {
      ref.current = { ...ref.current, ...item };
    } else {
      ref.current = item;
    }
  };

  React.useEffect(() => {
    console.log("image update ref with content useeffect 1", { ...state });
    updateRef({ content: state });
  });

  React.useEffect(() => {
    console.log("image update ref with content useeffect 2");

    firebase
      .collection("ImageContents")
      .doc(id)
      .get()
      .then(docQuery => {
        if (docQuery.exists) {
          setState(toImageObj(docQuery));
        }
      });
  }, [id, firebase, ref, data]);

  React.useEffect(() => {
    console.log(
      "image update ref with content useeffect 3 ( attatching update)"
    );

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
