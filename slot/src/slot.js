const body = document.querySelector("body");
const textarea = body.querySelector("textarea");

const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots(ring) {
  const repText = textarea.value.replace(/(?:\r\n|\r|\n)/g, "<br>");
  const arrText = repText.split("<br>");

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
  const playerIdx = Math.floor(Math.random() * arr.length);
  const player = arr[playerIdx];
  return player == "" ? arr[playerIdx - 1] : player;
}

function spin(timer) {
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
  console.log($("#" + ring.id + " div:eq(" + ring_ntr + ")"));
  $("#" + ring.id + " div:eq(" + ring_ntr + ")").addClass("bg-red");

  setTimeout(() => {
    $("#exampleModal").modal();
    const 선수이름 = $("#" + ring.id + " div:eq(" + ring_ntr + ") p").text();
    $(".modal-body").empty();
    $(".modal-body").append(선수이름);
  }, timer * 1000 + 1500);
}

function resetRing() {
  $("#ring1").empty();
  $("#ring2").empty();
  $("#ring3").empty();
  $("#ring4").empty();
  $("#ring5").empty();
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
    resetRing();
    createSlots($("#ring1"));
    createSlots($("#ring2"));
    createSlots($("#ring3"));
    createSlots($("#ring4"));
    createSlots($("#ring5"));

    var timer = 3;
    spin(timer);
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
    const playerName = $(".modal-body").text();
    textarea.value = textarea.value.replace(playerName, "");
    $("textarea").focusout();
  });

  $("textarea").focusout(function() {
    var avalue = $("textarea").val();
    var newVal = avalue.replace(/^\s*[\r\n]/gm, "");
    //var finalResults = newVal.replace("\n", "");
    $("textarea").val(newVal);
  });

  console.log("let's start");
});
