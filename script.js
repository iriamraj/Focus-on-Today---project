const tickMark = document.querySelectorAll(".tick-mark");
const goalIput = document.querySelectorAll(".goal-iput");
const error = document.querySelector(".error");
const progressBar = document.querySelector(".progress-bar");

let progressBarWidth = 0;
let a = [...tickMark].forEach((tick, i) => {
  tick.addEventListener("click", () => {
    const isGoalInputValue = [...goalIput].every((input) => {
      return input.value;
    });

    if (isGoalInputValue) {
      tick.classList.toggle("tick-active");
    } else {
      error.classList.add("error-show");
    }

    if (tick.classList[1] === "tick-active") {
      tick.parentElement.nextElementSibling.classList.add('goal-iput-block')
      tick.parentElement.nextElementSibling.setAttribute("disabled", "");
      progressBarWidth += 33;
      progressBar.style.width = `${progressBarWidth}%`;
    } else {
      tick.parentElement.nextElementSibling.classList.remove('goal-iput-block')
      tick.parentElement.nextElementSibling.removeAttribute("disabled");
      progressBarWidth -= 33;
      progressBar.style.width = `${progressBarWidth}%`;
    }
  });
});

[...goalIput].forEach((input) => {
  input.addEventListener("click", () => {
    error.classList.remove("error-show");
  });
});
