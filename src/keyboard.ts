window.addEventListener('keyup', function(event: KeyboardEvent) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event: KeyboardEvent) { Key.onKeydown(event); }, false);

const Key:any = {
  _pressed: {},

  isDown: (keyCode: number) => { return Key._pressed[keyCode] },

  onKeydown: (event: KeyboardEvent) => {
    Key._pressed[event.keyCode] = true;
  },
  
  onKeyup: (event: KeyboardEvent) => {
    delete Key._pressed[event.keyCode];
  },

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  SPACE: 32,
};

export default Key;


