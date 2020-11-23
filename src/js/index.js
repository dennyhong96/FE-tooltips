import "core-js/stable";
import "regenerator-runtime/runtime";

import "../sass/main.scss";

// DOM Elements
const tooltips = document.querySelectorAll(".tooltips .tooltip");
const section = document.querySelector(".section");
const container = document.querySelector(".container");

function positionToolitp() {
  tooltips.forEach((tooltip) => {
    const pin = tooltip.querySelector(".tooltip__pin");
    const content = tooltip.querySelector(".tooltip__content");
    const arrow = tooltip.querySelector(".tooltip__content__arrow");

    // pin.getBoundingClientRect().left is relative to viewport
    // pin.offsetLeft is relative to it's parent

    content.style.left = `${pin.offsetLeft - content.offsetWidth / 2}px`;
    content.style.top = `${pin.offsetTop + 40}px`;
    arrow.style.left = `${pin.offsetLeft - content.offsetLeft + pin.offsetWidth / 2}px`;
  });
}

positionToolitp();
["load", "resize"].forEach((evt) => window.addEventListener(evt, positionToolitp));

let tooltipTimeoutId;

// Add listeners to tooltips
tooltips.forEach((tooltip) => {
  const pin = tooltip.querySelector(".tooltip__pin");
  const content = tooltip.querySelector(".tooltip__content");

  // Mouse moves over on pin or tooltip
  [pin, content].forEach((el) =>
    el.addEventListener("mouseover", function () {
      // If tooltip has a close timeout, clears it
      if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);

      // Open the tooltip
      content.classList.add("tooltip__content--active");
    })
  );

  // Mouse moves out on pin or tooltip
  [pin, content].forEach((el) =>
    el.addEventListener("mouseout", function () {
      // Close tooltip in 1 second
      tooltipTimeoutId = setTimeout(() => {
        content.classList.remove("tooltip__content--active");
      }, 1000);
    })
  );
});
