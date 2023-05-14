export const initialMovingElementPageXY = {
  x: 0,
  y: 0,
  set: (movingElement) => {
    const rect = movingElement.getBoundingClientRect();
    initialMovingElementPageXY.x = rect.x + window.scrollX;
    initialMovingElementPageXY.y = rect.y + window.scrollY;
  },
};

export const shifts = {
  shiftX: 0,
  shiftY: 0,
  set: (clientX, clientY, movingElement) => {
    shifts.shiftX = clientX - movingElement.getBoundingClientRect().left + 10;
    shifts.shiftY = clientY - movingElement.getBoundingClientRect().top + 60;
  },
};

export const moveAt = (element, pageX, pageY) => {
  element.style.transform = `translate(${
    pageX - initialMovingElementPageXY.x - shifts.shiftX
  }px, ${
    pageY - initialMovingElementPageXY.y - shifts.shiftY
  }px) rotate(-3deg)`;
};

export const getElementCoordinates = (node, searchCoordsBy) => {
  const rect = node.getBoundingClientRect();
  return {
    top:
      searchCoordsBy == "by-center"
        ? rect.top + rect.height / 2
        : rect.top + 10,
    left: rect.left + rect.width / 2,
  };
};

export const isAbove = (nodeA, nodeB) => {
  const rectA = nodeA.getBoundingClientRect();
  const rectB = nodeB.getBoundingClientRect();

  return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

export const getElementBelow = (movingElement, searchCoordsBy) => {
  const movingElementCenter = getElementCoordinates(
    movingElement,
    searchCoordsBy
  );
  movingElement.hidden = true;
  let elementBelow = document.elementFromPoint(
    movingElementCenter.left,
    movingElementCenter.top
  );
  movingElement.hidden = false;
  return elementBelow;
};
