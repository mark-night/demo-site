import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header");
    this.pageSections = document.querySelectorAll(".page-section");
    this.browserHeight = window.innerHeight;
    this.events();
  }

  events() {
    window.addEventListener(
      "scroll",
      throttle(() => this.runOnScroll(), 200)
    );
    window.addEventListener(
      "resize",
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 300)
    );
  }

  runOnScroll() {
    if (window.scrollY > 60) {
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }
    document
      .querySelectorAll(".primary-nav a")
      .forEach((el_a) => el_a.classList.remove("is-current-link"));
    this.pageSections.forEach((el) => {
      let threshold = window.scrollY + this.browserHeight / 2;
      if (
        el.offsetTop < threshold &&
        el.offsetTop + el.offsetHeight > threshold
      ) {
        let matchingLink = el.getAttribute("data-matching-link");
        document.querySelector(matchingLink).classList.add("is-current-link");
      }
    });
  }
}

export default StickyHeader;
