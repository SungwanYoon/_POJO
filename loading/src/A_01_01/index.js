const coinList = document.querySelector("#jsCoin");

const UPDATE_READ_URL = "https://mbillpost.co.kr/updateReadStatus";
//const ACNS_D1_URL = "https://d1.mbillpost.co.kr?contentid=";
//const ACNS_D2_URL = "https://d2.mbillpost.co.kr?contentid=";
//const ACNS_D1_URL = "https://d1.mbillpost.co.kr";
//const ACNS_D2_URL = "https://d2.mbillpost.co.kr";

const CN_COIN_ROW = "coinRow";

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
  //  if (svrCode == "1") {
  //    passURL = ACNS_D1_URL;
  //  } else {
  //    passURL = ACNS_D2_URL;
  //  }
  passURL =
    "https://d" +
    svrCode +
    ".mbillpost.co.kr" +
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
  //alert(passURL);
  if (fileName) {
    const xhr = new XMLHttpRequest();
    const fetchURL = UPDATE_READ_URL + "/" + fileName;

    xhr.open("GET", fetchURL, true);
    xhr.onload = function() {
      location.href = passURL;
    };
    xhr.send(null);
  } else {
    alert("File name missing.");
  }
};

function init() {
  callAPI();
  //timeoutId = setTimeout(callAPI, 5000);
}

init();
