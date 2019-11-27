import React from "react";
import { DNSText } from "dns-container";
import { toTextObj } from "./toTextObj";

const AwesomeText = props => {
  const { id, firebase, data } = props;
  const [state, setState] = React.useState(null);
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
  }, [id, firebase]);
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
          }}
          onRemove={remove => console.log("remove", remove)}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AwesomeText;
