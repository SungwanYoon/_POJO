const body = document.querySelector("body");
const goViewerForm = body.querySelector(".js-goViewer");
const submitBtn = body.querySelector(".submitBtn");

function handleSubmit(e) {
  e.preventDefault();
  goViewerForm.submit();
  console.log("Do Submit");
}

function init() {
  submitBtn.addEventListener("click", handleSubmit);
}

init();
