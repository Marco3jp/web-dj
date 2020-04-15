/**
 *
 * @type {HTMLInputElement}
 */
const audioFileInputElm = document.querySelector("#audio-track");
const disableLowpassButtonElm = document.querySelector("#disable-lowpass");
const disableHighpassButtonElm = document.querySelector("#disable-highpass");
const enableLowpassButtonElm = document.querySelector("#enable-lowpass");
const enableHighpassButtonElm = document.querySelector("#enable-highpass");
const highpassThresholdInputElm = document.querySelector("#highpass-threshold");
const lowpassThresholdInputElm = document.querySelector("#lowpass-threshold");
const setHighpassThresholdButtonElm = document.querySelector("#set-highpass");
const setLowpassThresholdButtonElm = document.querySelector("#set-lowpass");

const reader = new FileReader();
const audioCtx = new AudioContext();
const lowpass = audioCtx.createBiquadFilter();
const highpass = audioCtx.createBiquadFilter();
lowpass.type = "lowpass";
highpass.type = "highpass";
setLowpassThreshold();
setHighpassThreshold();

let isEnableLowpass = false;
let isEnableHighpass = false;

audioFileInputElm.addEventListener("input", () => {
    reader.readAsArrayBuffer(audioFileInputElm.files[0]);
});

setLowpassThresholdButtonElm.addEventListener("click", () => {
    setLowpassThreshold();
});

setHighpassThresholdButtonElm.addEventListener("click", () => {
    setHighpassThreshold();
});


reader.addEventListener("load", () => {
    audioCtx.decodeAudioData(reader.result, (buffer) => {
        let track = audioCtx.createBufferSource();
        track.buffer = buffer;
        track.connect(audioCtx.destination);

        disableLowpassButtonElm.addEventListener("click", () => {
            isEnableLowpass = false;
            disableLowpassButtonElm.disabled = true;
            enableLowpassButtonElm.disabled = false;

            lowpass.disconnect();

            if (isEnableHighpass) {
                track.connect(highpass);
            } else {
                track.connect(audioCtx.destination);
            }
        });

        enableLowpassButtonElm.addEventListener("click", () => {
            isEnableLowpass = true;
            disableLowpassButtonElm.disabled = false;
            enableLowpassButtonElm.disabled = true;

            track.disconnect();
            track.connect(lowpass);
            if (isEnableHighpass) {
                lowpass.connect(highpass);
            } else {
                lowpass.connect(audioCtx.destination);
            }

        });

        disableHighpassButtonElm.addEventListener("click", () => {
            isEnableHighpass = false;
            disableHighpassButtonElm.disabled = true;
            enableHighpassButtonElm.disabled = false;

            highpass.disconnect();

            if (isEnableLowpass) {
                lowpass.connect(audioCtx.destination);
            } else {
                track.connect(audioCtx.destination);
            }
        });

        enableHighpassButtonElm.addEventListener("click", () => {
            isEnableHighpass = true;
            disableHighpassButtonElm.disabled = false;
            enableHighpassButtonElm.disabled = true;

            if (isEnableLowpass) {
                lowpass.disconnect();
                lowpass.connect(highpass);
            } else {
                track.disconnect();
                track.connect(highpass);
            }
            highpass.connect(audioCtx.destination);
        });

        track.start();
    }, () => {
        throw new Error("error");
    });
});

function setLowpassThreshold() {
    lowpass.frequency.setValueAtTime(lowpassThresholdInputElm.valueAsNumber, audioCtx.currentTime);
}

function setHighpassThreshold() {
    highpass.frequency.setValueAtTime(highpassThresholdInputElm.valueAsNumber, audioCtx.currentTime);
}

/*
fullset: track -> lowpass -> highpass -> destination
initialize: track -> distination
 */

