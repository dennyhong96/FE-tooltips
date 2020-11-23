import "core-js/stable";
import "regenerator-runtime/runtime";

import "../sass/main.scss";

// DOM Elements
const tooltips = document.querySelectorAll(".tooltips .tooltip");
const section = document.querySelector(".section");

function positionToolitp() {
  tooltips.forEach((tooltip) => {
    const pin = tooltip.querySelector(".tooltip__pin");
    const content = tooltip.querySelector(".tooltip__content");
    const arrow = tooltip.querySelector(".tooltip__content__arrow");

    // pin.getBoundingClientRect().left is relative to viewport
    // pin.offsetLeft is relative to it's parent

    const tooltipRightBound = pin.offsetLeft + pin.offsetWidth / 2 + content.offsetWidth / 2;
    const sectionRightBound = section.offsetWidth;
    const pinLeftBount = pin.getBoundingClientRect().left;

    // If tooltip content is out of screen to the right side
    if (tooltipRightBound > sectionRightBound) {
      console.log("Right conflict");
      const extraLeft = sectionRightBound - tooltipRightBound;
      content.style.left = `${pin.offsetLeft - content.offsetWidth / 2 + extraLeft}px`;
    }
    // If tooltip content is out of screen to the left side
    else if (pinLeftBount < content.offsetWidth / 2) {
      console.log("Left conflict");
      const extraRight = content.offsetWidth / 2 - pinLeftBount;
      content.style.left = `${pin.offsetLeft - content.offsetWidth / 2 + extraRight}px`;
    }
    // Tooltip content is within the viewport
    else {
      content.style.left = `${pin.offsetLeft - content.offsetWidth / 2}px`;
    }

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
