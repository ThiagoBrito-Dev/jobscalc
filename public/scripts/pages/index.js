import Modal from "../modal.js";

const modal = new Modal({ animationClasses: ["animate-pop", "back"] });

const cards = document.querySelectorAll(".cards .card");
const deleteForm = document.getElementById("delete-job");

for (let card of cards) {
  const cardId = card.dataset.id;

  const deleteButton = card.querySelector("button.delete");
  deleteButton.onclick = () => {
    modal.open();
    deleteForm.setAttribute("action", `/job/delete/${cardId}`);
  };
}
