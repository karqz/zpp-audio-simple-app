// TTutaj mamy kod naszego procesora, w którym można manipulować bezpośrednio dźwiękiem.
class MyProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    for (let i = 0; i < outputs.length; ++i) {
      for (let j = 0; j < outputs[i].length; ++j) {
        for (let k = 0; k < outputs[i][j].length; ++k) {
          // Tutaj można manipulować dźwiękiem.
          // Nic nie zmieniaj:
          outputs[i][j][k] = inputs[i][j][k];

          // Wycisz:
          // outputs[i][j][k] = 0;

          // Szum:
          // outputs[i][j][k] = Math.random() * 2 - 1;
        }
      } 
    }
    return true;
  }
}

// Trzeba zarejestrować procesor!
registerProcessor("my-processor", MyProcessor);
