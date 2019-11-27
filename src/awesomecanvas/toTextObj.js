export const toTextObj = doc => {
  return {
    color: doc.get("color"),
    fontFamily: doc.get("fontFamily"),
    fontSize: doc.get("fontSize"),
    fontStyle: doc.get("fontStyle"),
    fontWeight: doc.get("fontWeight"),
    id: doc.get("id"),
    index: doc.get("index"),
    paperId: doc.get("paperId"),
    text: doc.get("text"),
    textAlign: doc.get("textAlign"),
    textDecoration: doc.get("textDecoration"),
    type: doc.get("type"),
    x: doc.get("x"),
    y: doc.get("y")
  };
};
