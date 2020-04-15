const bpm = 183.0;

const pitchList = {
    "f4": 349.23,
    "f#4": 369.99,
    "g4": 392.00,
    "g#4": 415.30,
    "a4": 440.00,
    "a#4": 466.16,
    "b4": 493.88,
    "c5": 523.25,
    "c#5": 554.37,
    "d5": 587.33,
    "d#5": 622.25,
    "r": 0,
};

const notes = [
    // 出会った日から
    {pitch: "g#4", length: 480},
    {pitch: "g#4", length: 480},
    {pitch: "g4", length: 240},
    {pitch: "g#4", length: 480},
    {pitch: "a#4", length: 240},
    {pitch: "a#4", length: 960},
    {pitch: "r", length: 960},
    // 走ってきたよ
    {pitch: "g#4", length: 480},
    {pitch: "g#4", length: 480},
    {pitch: "a#4", length: 240},
    {pitch: "c#5", length: 480},
    {pitch: "c5", length: 240},
    {pitch: "g#4", length: 960},
    {pitch: "r", length: 960},
    // 一秒イゴの未来へ
    {pitch: "g#4", length: 480},
    {pitch: "g#4", length: 480},
    {pitch: "c#5", length: 240},
    {pitch: "c5", length: 720},
    {pitch: "a#4", length: 480},
    {pitch: "g#4", length: 480},
    {pitch: "g4", length: 480},
    {pitch: "g#4", length: 960},
    {pitch: "f4", length: 720},
    {pitch: "a#4", length: 240},
    {pitch: "a#4", length: 1440},
    {pitch: "r", length: 960},
    // どんな時間も
    {pitch: "g#4", length: 480},
    {pitch: "g#4", length: 480},
    {pitch: "g4", length: 240},
    {pitch: "g#4", length: 480},
    {pitch: "a#4", length: 240},
    {pitch: "a#4", length: 960},
    {pitch: "r", length: 960},
    // 勝利って瞬間に
    {pitch: "g#4", length: 480},
    {pitch: "g#4", length: 240},
    {pitch: "a#4", length: 480},
    {pitch: "c#5", length: 720},
    {pitch: "c5", length: 480},
    {pitch: "c#5", length: 480},
    {pitch: "d#5", length: 240},
    {pitch: "g#4", length: 2160},
    {pitch: "r", length: 1200},
    // 続いてるって信じてる
    {pitch: "f4", length: 240},
    {pitch: "f4", length: 240},
    {pitch: "g4", length: 240},
    {pitch: "g#4", length: 480},
    {pitch: "g4", length: 240},
    {pitch: "g#4", length: 480},
    {pitch: "a#4", length: 480},
    {pitch: "c#5", length: 720},
    {pitch: "c5", length: 480},
    {pitch: "a#4", length: 480},
    {pitch: "g#4", length: 240},
    {pitch: "g#4", length: 1200},
    {pitch: "r", length: 1920},
];

let scoreIndex = 0;

const audioCtx = new AudioContext();
const track = audioCtx.createOscillator();
track.frequency.setValueAtTime(pitchList[notes[scoreIndex].pitch], audioCtx.currentTime);
track.connect(audioCtx.destination);
track.start();
setTimeout(playMusic, 60 / bpm * 1000 / 480 * notes[scoreIndex].length);

function playMusic() {
    scoreIndex++;
    track.frequency.setValueAtTime(pitchList[notes[scoreIndex].pitch], audioCtx.currentTime);
    setTimeout(playMusic, 60 / bpm * 1000 / 480 * notes[scoreIndex].length)
}
