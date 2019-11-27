import React from "react";
import { DNSText } from "dns-container";
import { toTextObj } from "./toTextObj";

const AwesomeText = React.forwardRef((props, ref) => {
  const { id, firebase, data, onChange, onLoad } = props;
  const [state, setState] = React.useState(data);
  const [ready, setReady] = React.useState(false);

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
    updateRef({ content: state });
    if (state.id !== data.id) {
      setReady(true);
    }
    onLoad(ready, id);
  });

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
    updateRef({ update });
    // eslint-disable-next-line
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
