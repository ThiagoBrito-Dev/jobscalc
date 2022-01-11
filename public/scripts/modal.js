export default function Modal({ animationClasses = [] }) {
  const wrapper = document.querySelector(".modal-wrapper");
  const modal = document.querySelector(".modal");
  const btnClose = document.getElementById("close-modal");
  let lastFocusedElement;

  btnClose.addEventListener("click", close);

  function handleFocus() {
    if (wrapper.classList.value.includes("on")) {
      lastFocusedElement.focus();
      return;
    }

    lastFocusedElement = document.activeElement;
    setTimeout(() => {
      modal.focus();
    }, 300);
  }

  function open() {
    handleFocus();

    document.body.addEventListener("keydown", createFocusTrap);
    document.body.addEventListener("keyup", closeOnEscape);

    wrapper.classList.add("on");
    modal.classList.add(...animationClasses);
  }

  function createFocusTrap(event) {
    if (event.key == "Tab") {
      const focusedElement = document.activeElement;

      if (event.shiftKey) {
        if (
          focusedElement.classList.value.includes("modal") ||
          focusedElement === btnClose
        ) {
          event.preventDefault();
        }
      } else {
        if (focusedElement === btnClose.nextElementSibling) {
          event.preventDefault();
        }
      }
    }
  }

  function close() {
    handleFocus();

    document.body.removeEventListener("keydown", createFocusTrap);
    document.body.removeEventListener("keyup", closeOnEscape);

    wrapper.classList.remove("on");
    modal.classList.remove(...animationClasses);
  }

  function closeOnEscape({ key }) {
    if (key == "Escape") {
      close();
    }
  }

  return {
    open,
    close,
  };
}
