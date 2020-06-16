import "../styles/styles.css";
import "lazysizes";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import ClientArea from "./modules/ClientArea";

import React from "react";
import ReactDOM from "react-dom";
function ExampleComponent() {
  return (
    <div>
      <h1>React Example Component</h1>
      <p> React is great, worth to take a look.</p>
    </div>
  );
}
ReactDOM.render(<ExampleComponent />, document.querySelector("#react-example"));

new RevealOnScroll(document.querySelectorAll(".feature-item"), 0.8);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 0.7);

new StickyHeader();

new MobileMenu();

new ClientArea();

let modal;
document.querySelectorAll(".open-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // scritp splitting thanks to webpack (load file on the fly only when needed)
    if (typeof modal == "undefined") {
      // not imported yet
      import(/* webpackChunkName: "modal" */ "./modules/Modal")
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
