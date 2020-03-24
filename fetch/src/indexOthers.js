import "./styles.css";

const GEO = document.getElementById("geo");

const API_URL = "http://ip-api.com/json/";

const api = {
  fetchGeo: () =>
    fetch(API_URL, {
      method: "GET",
      mode: "cors"
    })
};
const invokeAPI = () => {
  return new Promise((resolve, reject) => {
    console.log("INFO HAS BEEN FCKING REQUESTED 😝");
    resolve(api.fetchGeo());
  });
};

const callApi = () => {
  invokeAPI()
    .then(res => {
      console.log("INFO HAS BEEN FCKING ARRIVED 😍");
      return res.json();
    })
    .then(data => {
      GEO.innerHTML = `
            Country : ${data.country}
            Country Code : ${data.countryCode}
            Region Name : ${data.regionName}
            City : ${data.city}
            lat/long : ${data.lat} / ${data.lon}
            `;
    });
};

const init = () => {
  callApi();
};

init();
