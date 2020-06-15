class Modal {
  constructor() {
    this.injectHTML();
    this.modal = document.querySelector(".modal");
    this.btnsToOpenModal = document.querySelectorAll(".open-modal");
    this.btnToCloseModal = document.querySelector(".modal__close");
    this.events();
  }

  events() {
    // buttons click to open modal
    this.btnsToOpenModal.forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.modal.classList.add("modal--visible");
      })
    );

    // button click to close modal
    this.btnToCloseModal.addEventListener("click", () => this.closeModal());

    // close modal when "ESC" is pressed and released
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modal.classList.remove("modal--visible");
  }

  injectHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modal">
        <div class="modal__inner">
          <h2 class="section-title section-title--blue section-title--less-margin">
            <img src="assets/images/icons/mail.svg" class="section-title__icon" />
            Get in <strong>Touch</strong>
          </h2>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">
              We will have an online order system in place soon. Until then, connect with us on any of the platforms below!
            </p>
          </div>
          <div class="social-icons">
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"/></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"/></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"/></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"/></a>
          </div>
        </div>
        <div class="modal__close">X</div>
      </div>
   `
    );
  }
}

export default Modal;
