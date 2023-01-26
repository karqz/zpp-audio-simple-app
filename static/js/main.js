'use strict'


// Wymogi tego co bierzemy na wejściu od użytkownika.
const userMediaConstraints = {
  audio: true,
};

const localAudioElement = document.getElementById('localAudio');

// Pobiera MediaStream od użytkownika i tworzymy graf manipulujący audio.
navigator.mediaDevices.getUserMedia(userMediaConstraints)
.then(function (stream) {
  // AudioContext pomaga w stworzeniu tego grafu.
  const audioCtx = new AudioContext();

  // Trzeba stworzyć węzły grafu na wejście i wyjście.
  const source = audioCtx.createMediaStreamSource(stream);
  const destination = audioCtx.createMediaStreamDestination();


  // Rejestrujemy nasz procesor.
  audioCtx.audioWorklet.addModule('/static/js/my-processor.js').then(() => {
    // Tworzymy nowy węzeł z naszym procesorem.
    let myProcessorNode = new AudioWorkletNode(audioCtx,'my-processor');

    // Łączymy go w grafie.
    source.connect(myProcessorNode);
    myProcessorNode.connect(destination);

    // Przekazujemy źródło do użytkownika:
    localAudioElement.srcObject = destination.stream;
  })
});