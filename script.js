const tickMark = document.querySelectorAll(".tick-mark");
const goalIput = document.querySelectorAll(".goal-iput");
const error = document.querySelector(".error");
const progressBar = document.querySelector(".progress-bar");
const motivationText = document.querySelector(".motivationText");
const motivationText2 = document.querySelector(".motivation-text2");
const save = document.querySelector(".save");

let progressBarWidth = 0;

if (localStorage.firValue) {
  goalIput[0].value = localStorage.firValue;
} 
if (localStorage.secValue) {
  goalIput[1].value = localStorage.secValue;
} 
if (localStorage.thirValue) {
  goalIput[2].value = localStorage.thirValue;
}

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
      tick.parentElement.nextElementSibling.classList.add("goal-iput-block");
      tick.parentElement.nextElementSibling.setAttribute("disabled", "");
      Number.parseFloat((progressBarWidth += 100 / 3));
      progressBar.style.width = `${progressBarWidth}%`;
    } else {
      tick.parentElement.nextElementSibling.classList.remove("goal-iput-block");
      tick.parentElement.nextElementSibling.removeAttribute("disabled");
      Number.parseFloat((progressBarWidth -= 100 / 3));
      if (progressBarWidth < 34) {
        progressBarWidth = 0;
      }
      progressBar.style.width = `${progressBarWidth}%`;
    }

    if (progressBarWidth > 60) {
      motivationText.innerText = "Just a step away, keep going!";
      motivationText2.innerText = "“Keep Going, You’re making great progress!”";
    } else {
      motivationText.innerText = "Raise the bar by completing your goals!";
      motivationText2.innerText = "“Move one step ahead, today!”";
    }
  });
});

[...goalIput].forEach((input) => {
  input.addEventListener("click", () => {
    error.classList.remove("error-show");
  });
});

save.addEventListener("click", () => {
  console.log(localStorage);
  localStorage.firValue = goalIput[0].value;
  localStorage.secValue = goalIput[1].value;
  localStorage.thirValue = goalIput[2].value;
});
