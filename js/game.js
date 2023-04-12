let canvas;
let canvas2;
let world;
let keyboard = new Keyboard();
let audio_bg = new Audio('audio/bg_music2.mp3');
let audio_bg2 = new Audio('audio/thrilling.mp3');
let audio_won = new Audio('audio/won.mp3');
let audio_lost = new Audio('audio/lost.mp3');
let audio_walk = new Audio('audio/walking.mp3');
let imgVolume = 0;
let imgScreen = 0;
let windowSize = 0;


function init() {
  audio_bg.volume = 0;
  audio_bg2.volume = 0;
  mobileButtons();
}


/**
 * function to start the game by clicking on the "play"-button
 */
function startGame() {
  document.getElementById('startscreen').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('icons').classList.add('bottom');
  document.getElementById('iconHome').classList.remove('d-none');
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  audio_bg.volume = 0.7;
  audio_bg.play();
  audio_bg2.volume = 0;
  audio_bg2.play();
} 


/**
 * function to open the info menu by clicking on the "i"-button
 */
function openInfo() {
  document.getElementById('explanation').classList.remove('d-none');
}


/**
 * function to close the info menu by clicking on the screen
 */
function closeInfo() {
  document.getElementById('explanation').classList.add('d-none');
}


/**
 * function to change the volume by clicking on the "speaker"-button
 */
function changeVolume() {
  if (imgVolume == 0) {
    document.getElementById('volume').src = 'img/icons/volume_off.svg';
    imgVolume = 1;
    stopMusic();
  } else {
    document.getElementById('volume').src = 'img/icons/volume_on.svg';
    imgVolume = 0;
    playMusic();
  }
}


/**
 * fucntion to stop the music
 */
function stopMusic() {
  audio_bg.muted = true;
  audio_bg.pause();
  audio_bg2.muted = true;
  audio_bg2.pause();
}


/**
 * function to play music
 */
function playMusic() {
  audio_bg.muted = false;
  audio_bg.play();
  audio_bg2.muted = false;
  audio_bg2.play();
}


/**
 * function to switch to fullscreen
 */
function changeWindowSize() {
  if (imgScreen == 0) {
    settingsForFullscreen();
  } else {
    settingsForSmallscreen();
  }
}


/**
 * function to enable fullscreen
 */
function settingsForFullscreen() {
  document.getElementById('fullscreen').src = 'img/icons/minimize.svg';
  imgScreen = 1;
  enterFullscreen(document.getElementById('fs'));
  addFullscreenStyles();
  removeSmallscreenStyles();
}


/**
 * function to disable fullscreen
 */
function settingsForSmallscreen() {
  document.getElementById('fullscreen').src = 'img/icons/maximize.svg';
  imgScreen = 0;
  exitFullscreen(document.getElementById('fs'));
  addSmallscreenStyles();
  removeFullscreenStyles();
}

/**
 * function to enter fullscreen
 */
function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) { 
    element.webkitRequestFullscreen();
  }
}


/**
 * function to exit fullscreen
 */
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}


/**
 * function to add style for fullscreen
 */
function addFullscreenStyles() {
  document.getElementById('canvas').classList.add('canvasFullscreen');
  document.getElementById('startscreen').classList.add('startscreen_fs');
  document.getElementById('startscreen_img').classList.add('startscreen_img_fs');
}


/**
 * function to remove style for fullscreen
 */
function removeSmallscreenStyles() {
  document.getElementById('startscreen').classList.remove('startscreen');
  document.getElementById('startscreen_img').classList.remove('startscreen_img');
}


/**
 * function to add style when leaving fullscreen
 */
function addSmallscreenStyles() {
  document.getElementById('startscreen').classList.add('startscreen');
  document.getElementById('startscreen_img').classList.add('startscreen_img');
}


/**
 * function to remove style when leaving fullscreen
 */
function removeFullscreenStyles() {
  document.getElementById('canvas').classList.remove('canvasFullscreen');
  document.getElementById('startscreen').classList.remove('startscreen_fs');
  document.getElementById('startscreen_img').classList.remove('startscreen_img_fs');
}


/**
 * function to mute music when game is over and show endscreen
 */
function lostGame() {
  audio_bg.pause();
  audio_bg2.pause();
  audio_lost.volume = 1;
  audio_walk.muted = true;
  audio_lost.play();
  setTimeout(() => {
    document.getElementById('endscreen_lost').classList.remove('d-none');
    clearAllIntervals();
  }, 500);
}


/**
 * function to mute music when game is over and show endscreen
 */
function wonGame() {
  audio_bg.pause();
  audio_bg2.pause();
  audio_won.volume = 1;
  audio_won.play();
  audio_walk.muted = true;
  setTimeout(() => {
    document.getElementById('endscreen_won').classList.remove('d-none');
    clearAllIntervals();
  }, 500);
}


/**
 * function to clear all intervals after game is over
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * function to check which keys a pressed
 */
window.addEventListener("keydown", (e) => {
  if(e.keyCode == 37) {
    keyboard.left = true;
  };
  if(e.keyCode == 39) {
    keyboard.right = true;
  }
  if(e.keyCode == 32) {
    keyboard.space = true;
  }
  if(e.keyCode == 68) {
    keyboard.keyD = true;
  }
});


/**
 * function to check which keys a pressed
 */
window.addEventListener("keyup", (e) => {
  if(e.keyCode == 37) {
    keyboard.left = false;
  };
  if(e.keyCode == 39) {
    keyboard.right = false;
  }
  if(e.keyCode == 32) {
    keyboard.space = false;
  }
  if(e.keyCode == 68) {
    keyboard.keyD = false;
  }
});


/**
 * function to enable mobile buttons
 */
function mobileButtons() {

  document.getElementById('arrowLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.left = true;
  });

  document.getElementById('arrowLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.left = false;
  });

  document.getElementById('arrowRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.right = true;
  });

  document.getElementById('arrowRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.right = false;
  });

  document.getElementById('bottle').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.keyD = true;
  });

  document.getElementById('bottle').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.keyD = false;
  });

  document.getElementById('arrowUp').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.space = true;
  });

  document.getElementById('arrowUp').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.space = false;
  });
}