import React from "react";
import { DNSText } from "dns-container";
import { toTextObj } from "./toTextObj";

const AwesomeText = React.forwardRef((props, ref) => {
  const { id, firebase, data, onChange } = props;
  const [state, setState] = React.useState(data);
  React.useEffect(() => {
    firebase
      .collection("TextContents")
      .doc(id)
      .get()
      .then(docQuery => {
        if (docQuery.exists) {
          setState(toTextObj(docQuery));
        }
      });

    // eslint-disable-next-line
  }, [id, firebase]);

  React.useEffect(() => {
    updateRef({ content: state });
  });

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
    updateRef({ update });
  }, []);

  return (
    <React.Fragment>
      {state ? (
        <DNSText
          {...props}
          data={state}
          onChangeEnd={newData => {
            const textContentRef = firebase.collection("TextContents").doc(id);
            firebase.runTransaction(transaction => {
              return transaction.get(textContentRef).then(textContentDoc => {
                if (!textContentDoc.exists) {
                  throw Error("Text");
                }
                transaction.update(textContentRef, newData);
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

export default AwesomeText;
