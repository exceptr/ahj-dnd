export default class Trello {
    constructor() {
        this.boardControl = this.boardControl.bind(this);
        this.createCard = this.createCard.bind(this);
        this.addListItem = this.addListItem.bind(this);
        this.hideCardCreator = this.hideCardCreator.bind(this);
        this.showCardCreator = this.showCardCreator.bind(this);

        this.cardBtnAdd = Array.from(document.querySelectorAll('.card-btn-add'));
        this.board = document.querySelector('.board');
    }

    hideCardCreator(e) {
        const target = e.target;
        const listWrapper = target.parentElement.parentElement;

        const cardBtnAdd = listWrapper.querySelector('.card-btn-add');
        const cardCreator = listWrapper.querySelector('.card-creator');
        const cardCreatorControl = listWrapper.querySelector('.card-creator-control');

        cardBtnAdd.classList.remove('hide');
        cardCreator.classList.add('hide');
        cardCreatorControl.classList.add('hide');
    }

    createCard(text, listContent) {
        this.newCard = document.createElement('div');
        this.newCard.classList.add('card');
        listContent.appendChild(this.newCard);

        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerText = text;
        this.newCard.appendChild(listItem);

        const cardDell = document.createElement('div');
        cardDell.classList.add('card-dell');
        this.newCard.appendChild(cardDell);
    }

    addListItem(e) {
        const text = this.cardCreatorText.value;
        const listContent = e.target.parentElement.parentElement.querySelector('.list-content');

        if (this.cardCreatorText.value.length >= 1) {
            this.createCard(text, listContent);
            this.cardCreatorText.value = '';
        }
    }

    showCardCreator(e) {
        e.preventDefault();
        this.target = e.target;
        this.parentEl = e.target.parentElement;

        this.cardCreator = this.parentEl.querySelector('.card-creator');
        this.cardCreatorControl = this.parentEl.querySelector('.card-creator-control');
        this.cardCreatorAdd = this.parentEl.querySelector('.card-creator-add');
        this.cardCreatorText = this.parentEl.querySelector('.card-creator-text');

        this.target.classList.add('hide');
        this.cardCreator.classList.remove('hide');
        this.cardCreatorControl.classList.remove('hide');
        this.cardCreatorAdd.addEventListener('click', this.addListItem);
    }

    boardControl(e) {
        if (e.target.classList.contains('card-dell')) {
            e.target.parentElement.remove();
        }
        if (e.target.classList.contains('card-creator-close')) {
            this.hideCardCreator(e);
        }
    }

    eventListenerCardBtnAdd() {
        for (let btn of this.cardBtnAdd) {
            btn.addEventListener('click', this.showCardCreator);
        }
    }

    eventListenerBoard() {
        this.board.addEventListener('click', this.boardControl)
    }
}