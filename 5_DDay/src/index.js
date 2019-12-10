import "./styles.css";

const clockTitle = document.querySelector(".js-clock");
const NINE_HOURS_MILLISECONDS = 32400000;

function getTime() {
  const xmasDay = new Date("2019-12-24:00:00:00+0900");
  const now = new Date();
  const difference = new Date(xmasDay - now - NINE_HOURS_MILLISECONDS);
  const days = difference.getDate();
  const minutes = difference.getMinutes();
  const hours = difference.getHours();
  const seconds = difference.getSeconds();
  clockTitle.innerText = `${days < 10 ? `0${days}` : days}d ${
    hours < 10 ? `0${hours}` : hours
  }h ${minutes < 10 ? `0${minutes}` : minutes}m ${
    seconds < 10 ? `0${seconds}` : seconds
  }s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
