const tickMark = document.querySelectorAll(".tick-mark");
const goalIput = document.querySelectorAll(".goal-iput");
const error = document.querySelector(".error");
const progressBar = document.querySelector(".progress-bar");
const motivationText = document.querySelector(".motivationText");
const motivationText2 = document.querySelector(".motivation-text2");
const remainingTask = document.querySelector(".remainingTask");
const save = document.querySelector(".save");
const clear = document.querySelector(".clear");

let progressBarWidth = 0;
let remainingTaskLeft = 0;

const localData = JSON.parse(localStorage.taskData || false);

const writeValue = [...goalIput].forEach((input) => {
  [...tickMark].forEach((tick) => {
    if (localData[input.id]?.isComplited === "true") {
      input.previousElementSibling.children[0].classList.add("tick-active");

      input.classList.add("goal-iput-block");
    }
  });

  if (localData[input.id]?.task) {
    input.value = localData[input.id].task;
    input.setAttribute("disabled", "");
  }
  if (localData.progressBar) {
    progressBarWidth = localData.progressBar;
    progressBar.style.width = `${progressBarWidth}%`;
  }
  if (localData.remainingTask) {
    remainingTaskLeft = localData.remainingTask;
    remainingTask.innerText = remainingTaskLeft;
  }
});

let temp = [...tickMark].forEach((tick, i) => {
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

      remainingTaskLeft += 1;
      remainingTask.innerText = remainingTaskLeft;
    } else {
      tick.parentElement.nextElementSibling.classList.remove("goal-iput-block");
      tick.parentElement.nextElementSibling.removeAttribute("disabled");
      Number.parseFloat((progressBarWidth -= 100 / 3));
      if (progressBarWidth < 0) {
        progressBarWidth = 0;
      }
      progressBar.style.width = `${progressBarWidth}%`;

      remainingTaskLeft -= 1;
      remainingTask.innerText = remainingTaskLeft;
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
  const taskObj = {};
  goalIput.forEach((input) => {
    const inputId = input.id;
    taskObj[inputId] = {
      task: `${input.value}`,
      isComplited: `${input.previousElementSibling.children[0].classList[1] === "tick-active"}`,
    };
  });
  taskObj.progressBar = `${progressBarWidth}`;
  taskObj.remainingTask = remainingTaskLeft;
  localStorage.taskData = JSON.stringify(taskObj);
});

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
