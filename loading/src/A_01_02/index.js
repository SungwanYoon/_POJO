const coinList = document.querySelector("#jsCoin");

const UPDATE_READ_URL = "https://mbillpost.co.kr/updateReadStatus";

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
    const fetchURL = UPDATE_READ_URL + "/" + fileName;

    console.log("1. update read status");
    fetch(fetchURL)
      .then((response) => {
        if (response.status == 200) {
          console.log("2. call d1 or d2");
          location.href = passURL;
        } else {
          alert("can't update status.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("3. end of status");
        console.log(data);
      });
  } else {
    alert("file name missing");
  }
};

function init() {
  callAPI();
  //timeoutId = setTimeout(callAPI, 5000);
}

init();
