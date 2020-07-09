angular

  .module('magic', [])
  .controller('Magician', Magician)
  .directive('magicShow', ['$interval', '$timeout', magicShow])

function Magician () {
  var vm = this;
  vm.magics = []; 

  function contextInit () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  }

  function gainInit () {
    gainNode = vm.audio.createGain();
    gainNode.connect(vm.audio.destination);
    gainNode.gain.value = 0;
    return gainNode;
  }

  function oscillatorInit () {
    oscillator = vm.audio.createOscillator();
    oscillator.connect(vm.gainNode);

    // Change here for waveform. Options:
    // sine, square, saw, triangle
    oscillator.type = 'sawtooth';
    oscillator.start();
    return oscillator;
  }

  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  console.log("IsChrome = " +isChrome);
  console.log(navigator.userAgent.indexOf("Chrome"));
  console.log("isEdge = " + isEdge);
  if ((isChrome == true || navigator.userAgent.indexOf("Chrome") !== -1) && isEdge == false && isEdgeChromium == false && isSafari == false && isOpera == false){
    document.getElementById('click').style.display = "block";
  }
  document.addEventListener('click',touchStarted);
  function touchStarted() {
    document.getElementById('click').style.display = "none";
    vm.audio.resume();
  }
  vm.audio = contextInit();
  vm.gainNode = gainInit();
  vm.oscillator = oscillatorInit();
}

function magicShow($interval, $timeout) {
  return {
    templateUrl: 'magic02/magicWand.html',
    link: function (scope) {
      $interval(function() {
        var m = new Magic();
        scope.vm.magics.push(m);
        scope.vm.oscillator.frequency.value = m.Hz;

        // Change here for more volume (up to 1)
        scope.vm.gainNode.gain.value = 0.3;

        $timeout(function() {
          scope.vm.gainNode.gain.value = 0;
        }, m.milliseconds);
      }, 100);
    }
  }
}

