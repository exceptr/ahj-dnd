import {
  initialMovingElementPageXY,
  shifts,
  moveAt,
  isAbove,
  getElementBelow,
} from "./dnd";

let currentDroppable = null;
let placeholder;
let isDraggingStarted = false;
let movingElement;
let movingElementHeight;

function createPlaceholder() {
  placeholder = document.createElement("div");
  placeholder.style.height = movingElementHeight + "px";
  placeholder.classList.add("placeholder");
  movingElement.parentNode.insertBefore(placeholder, movingElement);
}

function onMouseMove(event) {
  event.preventDefault;
  if (!isDraggingStarted) {
    isDraggingStarted = true;
    createPlaceholder();
    Object.assign(movingElement.style, {
      position: "absolute",
      zIndex: 1000,
      left: `${initialMovingElementPageXY.x}px`,
      top: `${initialMovingElementPageXY.y}px`,
    });
  }
  moveAt(movingElement, event.pageX, event.pageY);

  let elementBelow = getElementBelow(movingElement, "by-center");
  if (!elementBelow) return;
  let droppableBelow = elementBelow.closest(".card");
  if (currentDroppable != droppableBelow) {
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      if (
        !isAbove(movingElement, currentDroppable) ||
        currentDroppable.classList.contains("emptySectionHiddenLesson")
      ) {
        currentDroppable.parentNode.insertBefore(placeholder, currentDroppable);
      } else {
        currentDroppable.parentNode.insertBefore(
          placeholder,
          currentDroppable.nextElementSibling
        );
      }
    }
  }
}

// function processEmptySections() {
//   document.querySelectorAll(".list-content").forEach((section) => {
//     if (!section.querySelector(".card:not(.emptySectionHiddenLesson)")) {
//       const emptySectionHiddenLesson = document.createElement("div");
//       emptySectionHiddenLesson.classList.add(
//         "card",
//         "emptySectionHiddenLesson"
//       );
//       section.append(emptySectionHiddenLesson);
//     } else {
//       const emptySectionHiddenLesson = section.querySelector(
//         ".emptySectionHiddenLesson"
//       );
//       emptySectionHiddenLesson &&
//         section.removeChild(emptySectionHiddenLesson);
//     }
//   });
// };

function onMouseUp() {
  if (!isDraggingStarted) {
    document.removeEventListener("mousemove", onMouseMove);
    movingElement.onmouseup = null;
    return;
  }

  placeholder.parentNode.insertBefore(movingElement, placeholder);
  Object.assign(movingElement.style, {
    position: "relative",
    left: "auto",
    top: "auto",
    zIndex: "auto",
    transform: "none",
    cursor: "grab",
  });

  document.removeEventListener("mousemove", onMouseMove);
  isDraggingStarted = false;
  placeholder && placeholder.parentNode.removeChild(placeholder);
  movingElement.onmouseup = null;
  movingElement = null;
}

function setMovingElement(event) {
  event.preventDefault;
  movingElement = event.target;
  movingElementHeight = movingElement.clientHeight;
}

function onMouseDown(event) {
  event.preventDefault;
  movingElement = event.target;
  if (movingElement.classList.contains("emptySectionHiddenLesson")) {
    return;
  }
  if (movingElement.classList.contains("card-dell")) {
    return;
  }
  setMovingElement(event);
  shifts.set(event.clientX, event.clientY, movingElement);
  initialMovingElementPageXY.set(movingElement);

  movingElement.style.cursor = "grabbing";
  document.addEventListener("mousemove", onMouseMove);
  movingElement.onmouseup = onMouseUp;
}

export function getCard() {
  for (const draggableElement of document.querySelectorAll(".card")) {
    draggableElement.onmousedown = onMouseDown;
    draggableElement.ondragstart = () => {
      return false;
    };
  }
}

export function dndCard() {
  window.addEventListener("load", getCard);
}
