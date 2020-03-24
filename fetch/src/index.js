const spanLocation = document.querySelector("#jsLocation");
const API_URL = "http://ip-api.com/json/";

function init() {
  spanLocation.innerHTML = "loading ...";

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      spanLocation.innerHTML =
        data.zip + ", " + data.city + ", " + data.country;
    })
    .catch(error => {
      spanLocation.innerHTML = error;
    });
}

init();
