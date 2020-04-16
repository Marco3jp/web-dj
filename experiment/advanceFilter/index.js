import {EffectView} from "./effectView";
import {AudioBufferSourceItem} from "./audioBufferSourceItem";
import {AudioDestinationItem} from "./audioDestinationItem";

const audioFileInputElm = document.querySelector("#audio-track");
const reader = new FileReader();
const audioCtx = new AudioContext();

const audioDestinationItem = new AudioDestinationItem(audioCtx.destination);
const audioBufferSourceItem = new AudioBufferSourceItem(audioCtx.createBufferSource());
const lowpassView = new EffectView(audioCtx, "lowpass", audioDestinationItem);
const highpassView = new EffectView(audioCtx, "highpass", audioDestinationItem);
const bandpassView = new EffectView(audioCtx, "bandpass", audioDestinationItem);
const lowshelfView = new EffectView(audioCtx, "lowshelf", audioDestinationItem);
const highshelfView = new EffectView(audioCtx, "highshelf", audioDestinationItem);
const peakingView = new EffectView(audioCtx, "peaking", audioDestinationItem);
const notchView = new EffectView(audioCtx, "notch", audioDestinationItem);
const allpassView = new EffectView(audioCtx, "allpass", audioDestinationItem);


audioFileInputElm.addEventListener("input", () => {
    reader.readAsArrayBuffer(audioFileInputElm.files[0]);
});

reader.addEventListener("load", () => {
    audioCtx.decodeAudioData(reader.result, (buffer) => {
        window.lastEffectItem = audioBufferSourceItem;
        audioBufferSourceItem.node.buffer = buffer;
        audioBufferSourceItem.node.connect(audioCtx.destination);
        audioBufferSourceItem.nextItem = audioDestinationItem;
        audioDestinationItem.prevItem = audioBufferSourceItem;

        audioBufferSourceItem.node.start();
    });
});
