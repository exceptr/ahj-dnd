import { getCard } from "./dndCard";

export default class Trello {
  constructor() {
    this.boardControl = this.boardControl.bind(this);
    this.createCard = this.createCard.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.hideCardCreator = this.hideCardCreator.bind(this);
    this.showCardCreator = this.showCardCreator.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.loadLocalStorage = this.loadLocalStorage.bind(this);

    this.body = document.querySelector("body");
    this.cardBtnAdd = Array.from(document.querySelectorAll(".card-btn-add"));
    this.board = document.querySelector(".board");
    this.listContents = Array.from(document.querySelectorAll(".list-content"));

    this.todoColumn = document.getElementById("todo");
    this.processColumn = document.getElementById("process");
    this.doneColumn = document.getElementById("done");

    this.bordItem = {
      todo: [],
      process: [],
      done: [],
    };
  }

  hideCardCreator(e) {
    const target = e.target;
    const listWrapper = target.parentElement.parentElement;

    const cardBtnAdd = listWrapper.querySelector(".card-btn-add");
    const cardCreator = listWrapper.querySelector(".card-creator");
    const cardCreatorControl = listWrapper.querySelector(
      ".card-creator-control"
    );

    cardBtnAdd.classList.remove("hide");
    cardCreator.classList.add("hide");
    cardCreatorControl.classList.add("hide");
  }

  createCard(text, listContent) {
    this.newCard = document.createElement("div");
    this.newCard.classList.add("card");
    listContent.appendChild(this.newCard);

    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    listItem.innerText = text;
    listItem.style.pointerEvents = this.newCard.appendChild(listItem);

    const cardDell = document.createElement("div");
    cardDell.classList.add("card-dell");
    this.newCard.appendChild(cardDell);
    getCard();
    this.saveLocalStorage();
  }

  addListItem(e) {
    const text = this.cardCreatorText.value;
    const listContent =
      e.target.parentElement.parentElement.querySelector(".list-content");

    if (this.cardCreatorText.value.length >= 1) {
      this.createCard(text, listContent);
      this.cardCreatorText.value = "";
    }
  }

  showCardCreator(e) {
    e.preventDefault();
    this.target = e.target;
    this.parentEl = e.target.parentElement;

    this.cardCreator = this.parentEl.querySelector(".card-creator");
    this.cardCreatorControl = this.parentEl.querySelector(
      ".card-creator-control"
    );
    this.cardCreatorAdd = this.parentEl.querySelector(".card-creator-add");
    this.cardCreatorText = this.parentEl.querySelector(".card-creator-text");

    this.target.classList.add("hide");
    this.cardCreator.classList.remove("hide");
    this.cardCreatorControl.classList.remove("hide");
    this.cardCreatorAdd.addEventListener("click", this.addListItem);
  }

  boardControl(e) {
    if (e.target.classList.contains("card-dell")) {
      e.target.parentElement.remove();
    }
    if (e.target.classList.contains("card-creator-close")) {
      this.hideCardCreator(e);
    }
  }

  saveLocalStorage() {
    let dataBoardItem = {
      todo: [],
      process: [],
      done: [],
    };

    let todoItems = this.todoColumn.querySelectorAll(".list-item");
    let processItems = this.processColumn.querySelectorAll(".list-item");
    let doneItems = this.doneColumn.querySelectorAll(".list-item");

    todoItems.forEach((element) => {
      dataBoardItem.todo.push(element.textContent);
    });

    processItems.forEach((element) => {
      dataBoardItem.process.push(element.textContent);
    });

    doneItems.forEach((element) => {
      dataBoardItem.done.push(element.textContent);
    });

    this.bordItem = dataBoardItem;

    localStorage.setItem("Trello", JSON.stringify(this.bordItem));
  }

  loadLocalStorage() {
    let json = localStorage.getItem("Trello");
    let data;

    try {
      data = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }

    data.todo.forEach((element) => {
      this.createCard(element, this.todoColumn);
    });

    data.process.forEach((element) => {
      this.createCard(element, this.processColumn);
    });

    data.done.forEach((element) => {
      this.createCard(element, this.doneColumn);
    });
  }

  eventListenerCardBtnAdd() {
    for (let btn of this.cardBtnAdd) {
      btn.addEventListener("click", this.showCardCreator);
    }
  }

  eventListenerBoard() {
    this.board.addEventListener("click", this.boardControl);
  }

  eventListenerBeForeUnLoad() {
    window.addEventListener("beforeunload", this.saveLocalStorage);
  }

  eventListenerLoadItem() {
    document.addEventListener("DOMContentLoaded", this.loadLocalStorage);
  }
}
