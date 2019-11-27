export const toImageObj = doc => {
  return {
    alt: doc.get("alt"),
    height: doc.get("height"),
    id: doc.get("id"),
    index: doc.get("index"),
    paperId: doc.get("paperId"),
    scaledHeight: doc.get("scaledHeight"),
    scaledWidth: doc.get("scaledWidth"),
    selected: doc.get("selected"),
    src: doc.get("src"),
    translateX: doc.get("translateX"),
    translateY: doc.get("translateY"),
    type: doc.get("type"),
    width: doc.get("width"),
    x: doc.get("x"),
    y: doc.get("y")
  };
};
