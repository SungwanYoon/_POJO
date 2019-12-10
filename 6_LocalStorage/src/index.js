// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const select = document.querySelector("select");

const COUNTRY_LS = "country";

function chkCountry() {
  const country = localStorage.getItem(COUNTRY_LS);
  if (country !== null) {
    console.log(country);
    select.value = country;
  }
}

function evtHandlerChangeSelect() {
  const currentVal = select.options[select.selectedIndex].value;
  localStorage.setItem(COUNTRY_LS, currentVal);
}

function init() {
  chkCountry();
  select.addEventListener("change", evtHandlerChangeSelect);
}

init();
