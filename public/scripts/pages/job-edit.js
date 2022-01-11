import Modal from "../modal.js";

const modal = new Modal({ animationClasses: ["animate-pop", "back"] });
document.querySelector(".open-modal").addEventListener("click", modal.open);
