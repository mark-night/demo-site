import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

new RevealOnScroll(document.querySelectorAll(".feature-item"), 0.8);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 0.7);

new StickyHeader();

new MobileMenu();

let modal;
document.querySelectorAll(".open-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // scritp splitting thanks to webpack (load file on the fly only when needed)
    if (typeof modal == "undefined") {
      // not imported yet
      import("./modules/Modal")
        .then((m) => {
          modal = new m.default();
          // make sure things got enough time to be prepared
          setTimeout(() => modal.openModal(), 20);
        })
        .catch((err) => {
          alert(`Something went wrong:
              ${err}`);
        });
    } else {
      modal.openModal();
    }
  });
});

if (module.hot) {
  module.hot.accept();
}
