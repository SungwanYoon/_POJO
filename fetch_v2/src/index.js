const coinList = document.querySelector("#jsCoin");

const API_URL = " https://api.coinpaprika.com/v1/tickers";
const CN_COIN_ROW = "coinRow";

let nIntervId;

const api = {
  fetchCoin: () =>
    fetch(API_URL, {
      method: "get",
      mode: "cors"
    })
};

const invokeAPI = () => {
  return new Promise((resolve, reject) => {
    resolve(api.fetchCoin());
  });
};

const callAPI = () => {
  // reset
  coinList.innerHTML = "";

  let wordDiv = document.createElement("div");
  wordDiv.className = CN_COIN_ROW;
  wordDiv.innerHTML = "Fetching,,.";
  coinList.appendChild(wordDiv);

  invokeAPI()
    .then(res => {
      return res.json();
    })
    .then(data => {
      // reset
      coinList.innerHTML = "";
      data.forEach(function(item, index, array) {
        let coinRow = document.createElement("div");
        let coinId = document.createElement("div");
        let coinPrice = document.createElement("div");

        coinRow.className = CN_COIN_ROW;
        coinId.innerHTML = item.id;
        coinPrice.innerHTML = item.quotes.USD.price;

        coinRow.appendChild(coinId);
        coinRow.appendChild(coinPrice);

        coinList.appendChild(coinRow);
      });
    });
};

function init() {
  nIntervId = setInterval(callAPI, 5000);
}

init();
