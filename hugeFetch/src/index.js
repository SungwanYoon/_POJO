const FILENAMES = [
  "test001.enc",
  "test002.enc",
  "test003.enc",
  "test004.enc",
  "test005.enc",
  "test006.enc",
  "test007.enc",
  "test008.enc",
  "test009.enc",
  "test010.enc",
  "test011.enc",
  "test012.enc",
  "test013.enc",
  "test014.enc",
  "test015.enc",
  "test016.enc",
  "test017.enc",
  "test018.enc",
  "test019.enc",
  "test020.enc",
  "test021.enc",
  "test022.enc",
  "test023.enc",
  "test024.enc",
  "test025.enc",
  "test026.enc",
  "test027.enc",
  "test028.enc",
  "test029.enc",
  "test030.enc",
  "test031.enc",
  "test032.enc",
  "test033.enc",
  "test034.enc",
  "test035.enc",
  "test036.enc",
  "test037.enc",
  "test038.enc",
  "test039.enc",
  "test040.enc",
  "test041.enc",
  "test042.enc",
  "test043.enc",
  "test044.enc",
  "test045.enc",
  "test046.enc",
  "test047.enc",
  "test048.enc",
  "test049.enc",
  "test050.enc",
  "test051.enc",
  "test052.enc",
  "test053.enc",
  "test054.enc",
  "test055.enc",
  "test056.enc",
  "test057.enc",
  "test058.enc",
  "test059.enc",
  "test060.enc",
  "test061.enc",
  "test062.enc",
  "test063.enc",
  "test064.enc",
  "test065.enc",
  "test066.enc",
  "test067.enc",
  "test068.enc",
  "test069.enc",
  "test070.enc",
  "test071.enc",
  "test072.enc",
  "test073.enc",
  "test074.enc",
  "test075.enc",
  "test076.enc",
  "test077.enc",
  "test078.enc",
  "test079.enc",
  "test080.enc",
  "test081.enc",
  "test082.enc",
  "test083.enc",
  "test084.enc",
  "test085.enc",
  "test086.enc",
  "test087.enc",
  "test088.enc",
  "test089.enc",
  "test090.enc",
  "test091.enc",
  "test092.enc",
  "test093.enc",
  "test094.enc",
  "test095.enc",
  "test096.enc",
  "test097.enc",
  "test098.enc",
  "test099.enc",
  "test100.enc",
];

const ST_URL = "https://mbillpost.co.kr/metlife/m/1/1/1008/";

const createIFRAME = (filename) => {
  const ifrm = document.createElement("iframe");
  ifrm.setAttribute("src", ST_URL + filename);
  ifrm.style.width = "160px";
  ifrm.style.height = "120px";
  document.body.appendChild(ifrm);
};

function init() {
  FILENAMES.forEach(function(item, index, array) {
    createIFRAME(item);
  });
}
init();
