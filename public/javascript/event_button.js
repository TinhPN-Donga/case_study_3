let isShow = false;
let imageMore = document.querySelector("#more");
let noteElement = document.querySelector("#note");
let groupContainer = document.getElementsByClassName("group");

function updateNoteContainer() {
  imageMore.style.display = isShow ? "none" : "block";
  for (let e of groupContainer) {
    e.style.display = isShow ? "flex" : "none";
  }
}

noteElement.addEventListener("click", () => {
  isShow = !isShow;
  updateNoteContainer();
});

function start() {
  updateNoteContainer();
}

start();
