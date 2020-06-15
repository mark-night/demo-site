import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import Modal from "./modules/Modal";

new Modal();

new RevealOnScroll(document.querySelectorAll(".feature-item"), 0.8);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 0.7);

new StickyHeader();

new MobileMenu();

if (module.hot) {
  module.hot.accept();
}
