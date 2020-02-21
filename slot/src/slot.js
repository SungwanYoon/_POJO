const body = document.querySelector("body");
const textarea = body.querySelector("textarea");

let slotting = false;

let repText = "";
let arrText = "";

let 선수이름 = "";

const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots(ring) {
  repText = textarea.value.replace(/(?:\r\n|\r|\n)/g, "<br>");
  arrText = repText.split("<br>");

  var slotAngle = 360 / SLOTS_PER_REEL;

  var seed = getSeed();

  for (var i = 0; i < SLOTS_PER_REEL; i++) {
    var slot = document.createElement("div");

    slot.className = "slot";

    // compute and assign the transform for this slot
    var transform =
      "rotateX(" + slotAngle * i + "deg) translateZ(" + REEL_RADIUS + "px)";

    slot.style.transform = transform;

    // setup the number to show inside the slots
    // the position is randomized to

    var content = $(slot).append("<p>" + getPlayer(arrText) + "</p>");

    // add the poster to the row

    ring.append(slot);
  }
}

function getSeed() {
  // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
  return Math.floor(Math.random() * SLOTS_PER_REEL);
}

function getCell() {
  return +Math.floor(Math.random() * 5) + 1;
}

function getPlayer(arr) {
  let doWhile = true;
  let playerIdx = 0;
  let player = "";
  if (textarea.value != "") {
    while (doWhile == true) {
      playerIdx = Math.floor(Math.random() * arr.length);
      player = arr[playerIdx];
      //console.log(player);
      if (player != "") {
        doWhile = false;
      }
    }
  }
  //return player == "" ? arr[playerIdx - 1] : player;
  return player;
}

function spin(timer) {
  slotting = true;
  $("#xray").click();
  const ring = body.querySelector("#ring" + getCell());

  //var txt = 'seeds: ';
  for (var i = 1; i < 6; i++) {
    var oldSeed = -1;
    /*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
    var oldClass = $("#ring" + i).attr("class");
    if (oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
      //console.log("[" + i + "] : " + oldSeed);
    }
    var seed = getSeed();
    while (oldSeed == seed) {
      seed = getSeed();
    }

    $("#ring" + i)
      .css(
        "animation",
        "back-spin 1s, spin-" + seed + " " + (timer + i * 0.5) + "s"
      )
      .attr("class", "ring spin-" + seed);
    //console.log("[" + i + "] : " + oldSeed);
  }

  ring.classList.add("ring-red");
  const ring_step = ring.classList[1].replace("spin-", "");
  const ring_ntr = ring_step > 7 ? +ring_step - 8 : +ring_step + 4;
  //console.log($("#" + ring.id + " div:eq(" + ring_ntr + ")"));
  $("#" + ring.id + " div:eq(" + ring_ntr + ")").addClass("bg-red");

  // pesdb 사이트 검색

  선수이름 = $("#" + ring.id + " div:eq(" + ring_ntr + ") p").text();
  const 선수 = pList.filter(function(pList) {
    return pList.name === 선수이름;
  });

  setTimeout(function() {
    coinSound();
    $("#exampleModal").modal();

    $(".modal-body").empty();
    $(".modal-body").append(선수이름 + "<br/>");
    if (선수.length == 0) {
      //$(".modal-body").append("검색가능한 선수가 아닙니다.");
    } else {
      const aTag = document.createElement("a");
      aTag.setAttribute("href", "http://pesdb.net/pes2020/?id=" + 선수[0].id);
      aTag.setAttribute("target", "_blank");
      aTag.append("PESDB Site GOGO!");
      $(".modal-body").append(aTag);
    }

    screamPlay();
    slotting = false;
    $("#xray").click();
  }, timer * 1000 + 2500);
}

function resetRing() {
  const slots = body.querySelectorAll(".slot");
  repText = textarea.value.replace(/(?:\r\n|\r|\n)/g, "<br>");
  arrText = repText.split("<br>");

  for (let sNum = 0; sNum < slots.length; sNum++) {
    slots[sNum].classList.remove("bg-red");
    const slotPlayer = slots[sNum].querySelector("p");
    slotPlayer.innerHTML = getPlayer(arrText);
  }
}

function coinSound() {
  var audio = document.getElementById("coin-sound");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

function startPlay() {
  var audio = document.getElementById("start-sound");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

function screamPlay() {
  var audio = document.getElementById("scream-sound");
  audio.volume = 0.5;
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

function clipboardCopy() {
  const tmpTxt = document.createElement("textarea");
  tmpTxt.style.position = "fixed";
  tmpTxt.style.top = 0;
  tmpTxt.style.left = 0;
  tmpTxt.style.width = "2em";
  tmpTxt.style.height = "2em";
  tmpTxt.style.padding = 0;
  tmpTxt.style.border = "none";
  tmpTxt.style.outline = "none";
  tmpTxt.style.boxShadow = "none";
  tmpTxt.style.background = "transparent";
  tmpTxt.value = 선수이름;
  const modalBody = document.querySelector(".modal-body");
  modalBody.appendChild(tmpTxt);
  tmpTxt.focus();
  tmpTxt.select();
  let succesful = document.execCommand("copy");
  modalBody.removeChild(tmpTxt);
  //console.log("copy : ", succesful);
}

$(document).ready(function() {
  // 1.슬롯만들기
  createSlots($("#ring1"));
  createSlots($("#ring2"));
  createSlots($("#ring3"));
  createSlots($("#ring4"));
  createSlots($("#ring5"));

  // hook start button
  $(".go").on("click", function() {
    startPlay();

    if (slotting) {
      //console.log("spinning");
    } else {
      coinSound();
      setTimeout(function() {
        resetRing();
        var timer = 3;
        spin(timer);
      }, 800);
    }
  });

  // hook xray checkbox
  $("#xray").on("click", function() {
    //var isChecked = $('#xray:checked');
    var tilt = "tiltout";

    if ($(this).is(":checked")) {
      tilt = "tiltin";
      $(".slot").addClass("backface-on");
      $("#rotate").css("animation", tilt + " 2s 1");

      setTimeout(function() {
        $("#rotate").toggleClass("tilted");
      }, 2000);
    } else {
      tilt = "tiltout";
      $("#rotate").css({ animation: tilt + " 2s 1" });

      setTimeout(function() {
        $("#rotate").toggleClass("tilted");
        $(".slot").removeClass("backface-on");
      }, 1900);
    }
  });

  // hook perspective
  $("#perspective").on("click", function() {
    $("#stage").toggleClass("perspective-on perspective-off");
  });

  $("#deleteBtn").on("click", function(e) {
    e.preventDefault();
    //const playerName = $(".modal-body").text();
    textarea.value = textarea.value.replace(선수이름, "");
    //console.log(playerName);

    clipboardCopy();
    $("textarea").focusout();
    $("#closeBtn").click();
  });

  $("#closeBtn").on("click", function(e) {
    clipboardCopy();
  });

  $("textarea").focusout(function() {
    var avalue = $("textarea").val();
    var newVal = avalue.replace(/^\s*[\r\n]/gm, "");
    //var finalResults = newVal.replace("\n", "");
    $("textarea").val(newVal);
  });

  $(".clear-text").click(function() {
    $("textarea").val("");
  });

  //console.log("let's start");
});
