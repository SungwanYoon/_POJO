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
  //  if (svrCode == "1") {
  //    passURL = ACNS_D1_URL;
  //  } else {
  //    passURL = ACNS_D2_URL;
  //  }
  const domain = "https://d" + svrCode + ".mbillpost.co.kr";
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
      ".pdf";
    const fetchURL = UPDATE_READ_URL + "/" + fileName;

    // PDF exist check
    console.log(pdfURL);
    fetch(pdfURL).then((response) => {
      if (response.status == 200) {
        // PDF read check
        fetch(fetchURL)
          .then((response) => {
            if (response.status == 200) {
              // Decrypt File
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
                    // Viewer call
                    location.href = passURL;
                  } else {
                    alert("can't decrypt file.");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                });
            } else {
              alert("can't update status.");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      } else {
        alert("can't find pdf file.");
      }
      return;
    });
  } else {
    alert("File name missing.");
  }
};

function init() {
  callAPI();
  //timeoutId = setTimeout(callAPI, 5000);
}

init();
