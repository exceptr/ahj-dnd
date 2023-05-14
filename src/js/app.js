import Trello from "./trello";
import { dndCard } from "./dndCard";

dndCard();

const trello = new Trello();
trello.eventListenerCardBtnAdd();
trello.eventListenerBoard();
trello.eventListenerBeForeUnLoad();
trello.eventListenerLoadItem();
