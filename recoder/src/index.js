const recordBtn = document.querySelector("#jsRecordBtn");
const recordSpan = document.querySelector("#jsRecordSpan");

let streamObject;
let audioRecorder;

const stopRecording = () => {
  audioRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getAudio);
  stopWatch();
  recordBtn.value = "Start recording";
};

const startRecording = () => {
  audioRecorder = new MediaRecorder(streamObject);
  audioRecorder.start();
  audioRecorder.addEventListener("dataavailable", handleAudioData);
  recordBtn.addEventListener("click", stopRecording);
};

let interval;
let second = 0;
const startWatch = () => {
  interval = setInterval(updateSpan, 1000);
};

const stopWatch = () => {
  clearInterval(interval);
  interval = null;
  second = 0;
  recordSpan.innerHTML = "";
};

const updateSpan = () => {
  second++;
  recordSpan.innerHTML = `${second} second`;
};

const handleAudioData = event => {
  const { data: audioFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(audioFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const getAudio = () => {
  try {
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then(stream => {
        startWatch();
        recordBtn.value = "Stop recording";
        streamObject = stream;
        startRecording();
      })
      .catch(error => {
        console.dir(error);
        recordBtn.value = "☹️ Cant record";
      });
  } catch (error) {
    console.log(error);
  } finally {
    recordBtn.removeEventListener("click", getAudio);
  }
};

function init() {
  recordBtn.addEventListener("click", getAudio);
}

init();
