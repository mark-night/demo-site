import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class RevealOnScroll {
  constructor(els, threshold) {
    this.itemsToReveal = els;
    this.threshold = threshold;
    this.checkThrottle = throttle(this.checkIfInView, 200).bind(this);
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.checkThrottle);
    window.addEventListener(
      "resize",
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 300)
    );
  }

  checkIfInView() {
    this.itemsToReveal.forEach((el) => {
      if (!el.isRevealed) {
        let inViewRatio = el.getBoundingClientRect().y / this.browserHeight;
        if (inViewRatio < this.threshold) {
          el.classList.add("reveal-item--is-in-view");
          el.isRevealed = true;
          if (el.isLast) {
            window.removeEventListener("scroll", this.checkThrottle);
          }
        }
      }
    });
  }

  hideInitially() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add("reveal-item");
      el.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLast = true;
  }
}

export default RevealOnScroll;
