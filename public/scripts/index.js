import Modal from "./modal.js";

// const menuSection = document.getElementById("menu-section");
// const menu = document.getElementById("menu");

// menu.onclick = () => {
//   menuSection.classList.add("on");
// };

const modal = Modal({ animateClasses: ["animate-pop", "back"] });

const cards = document.querySelectorAll(".cards .card");
const deleteForm = document.querySelector("#delete-job");

for (let card of cards) {
  const cardId = card.dataset.id;

  const deleteButton = card.querySelector("button.delete");
  deleteButton.onclick = () => {
    modal.open();
    deleteForm.setAttribute("action", `/job/delete/${cardId}`);
  };
}
