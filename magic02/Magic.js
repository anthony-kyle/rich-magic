var Magic = function () {
  var randomiseMagic = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  this.width = randomiseMagic(10, 50);
  this.height = this.width;
  this.top = randomiseMagic(0, document.documentElement.clientHeight);
  this.left = randomiseMagic(0, document.documentElement.clientWidth);
  this.red = randomiseMagic(0, 255);
  this.green = randomiseMagic(0, 255);
  this.blue = randomiseMagic(0, 255);

  // Human audible range is about 20 Hz to 20 kHz,
  // but anything above 3000 is getting pretty shrill
  this.Hz = randomiseMagic(200, 1000);
  this.milliseconds = 250;
};

Magic.prototype.getTheMagic = function () {
  var width = "width:" + this.width + "px;";
  var height = "height:" + this.height + "px;";
  var background = "background:rgb(" + 
    this.red + "," + 
    this.green + "," + 
    this.blue + ");"; 
  var top = "top:" + this.top + "px;";
  var left = "left:" + this.left + "px;";
  return width + height + top + left + background;
}

