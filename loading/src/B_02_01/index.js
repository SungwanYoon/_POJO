const coinList = document.querySelector("#jsCoin");

const MAIN_URL = "https://mbillpost.co.kr";
const UPDATE_READ_URL = "https://mbillpost.co.kr/updateReadStatus";
const DECR_URL = "https://mbillpost.co.kr/desc";

let timeoutId;

const getPathParam = (num, url) => {
  if (!url) url = location.pathname;
  const args = url.split("/");

  if (args.length != 7) return null;
  if (!args[num]) return "";
  return args[num];
};

const api = {
  fetchAPI: () =>
    fetch(UPDATE_READ_URL, {
      method: "get",
      mode: "cors",
    }),
};

const invokeAPI = () => {
  return new Promise((resolve, reject) => {
    resolve(api.fetchAPI());
  });
};

const callAPI = () => {
  const cmpCode = getPathParam("1");
  const authType = getPathParam("2");
  const svrCode = getPathParam("3");
  const fileType = getPathParam("4");
  const tplCode = getPathParam("5");
  const fileName = getPathParam("6");

  // Routing Logics
  let passURL = "";

  const domain = "https://d" + svrCode + ".mbillpost.co.kr";

  if (fileName) {
    const pdfURL =
      MAIN_URL +
      "/" +
      "pdfcheck" +
      "/" +
      "180006" +
      "/" +
      tplCode +
      "/" +
      fileName +
      ".enc";
    const fetchURL = UPDATE_READ_URL + "/" + fileName;

    // PDF exist check
    fetch(pdfURL).then((response) => {
      if (response.status == 200) {
        // PDF Descrption
        fetch(
          DECR_URL +
            "?filepath=" +
            "/" +
            "pdf" +
            "/" +
            "180006" +
            "/" +
            tplCode +
            "&filename=" +
            fileName
        )
          .then((response) => {
            if (response.status == 200) {
              // PDF read check
              const xhr = new XMLHttpRequest();
              xhr.open("GET", fetchURL, true);
              xhr.onload = function() {
                // Viewer call
                passURL =
                  domain +
                  "/" +
                  cmpCode +
                  "/" +
                  svrCode +
                  "/" +
                  fileType +
                  "/" +
                  tplCode +
                  "/" +
                  fileName;

                location.href = passURL;
              };
              xhr.send(null);
            } else {
              location.href = "/404";
              //alert("can't decrypt file.");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      } else {
        location.href = "/404";
        //alert("can't find pdf file.");
      }
      return;
    });
  } else {
    location.href = "/404";
    alert("File name missing.");
  }
};

function init() {
  callAPI();
  //timeoutId = setTimeout(callAPI, 5000);
}

init();
