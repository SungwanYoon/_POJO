const UPDATE_READ_URL = "https://mbillpost.co.kr/updateReadStatus";
const ACNS_D1_URL = "https://d1.mbillpost.co.kr";
const ACNS_D2_URL = "https://d2.mbillpost.co.kr";

const DECR_URL = "http://10.210.1.88:8095/desc";

let timeoutId;

const getPathParam = (num, url) => {
  if (!url) url = location.pathname;
  const args = url.split("/");

  if (args.length != 7) return null;
  if (!args[num]) return "";
  return args[num];
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
  passURL = "https://d" + svrCode + ".mbillpost.co.kr";

  passURL =
    passURL +
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

  if (fileName) {
    const xhr = new XMLHttpRequest();
    const fetchURL = UPDATE_READ_URL + "/" + fileName;
    xhr.open("GET", fetchURL, true);
    xhr.onload = function() {
      fetch(
        DECR_URL +
          "?filepath=" +
          "/" +
          "180006" +
          "/" +
          tplCode +
          "&filename=" +
          fileName
      )
        .then(response => {
          if (response.status == 200) {
            location.href = passURL;
          } else {
            alert("can't decrypt file.");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        });
    };
    xhr.send(null);
  } else {
    alert("can't file founded.");
  }
};

function init() {
  callAPI();
  //timeoutId = setTimeout(callAPI, 5000);
}

init();
