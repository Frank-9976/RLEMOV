var SENSITIVITY = 0.5;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var a = document.createElement("a");
document.body.appendChild(a);
a.style = "display: none";
function saveData(data, fileName) {
  var blob = new Blob([data], {type: "octet/stream"});
  var url = URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

async function convertImages(el) {
  var files = el.files;
  var result = [];
  var fileName = '';
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    fileName += file.name.split('.')[0] + '_'
    var image = await createImageBitmap(file);
    var frameResult = [];
    var width = image.width > 127 ? 127 : image.width;
    var height = image.height > 63 ? 63 : image.height;
    frameResult[0] = width;
    ctx.drawImage(image, 0, 0, width, height);
    var data = ctx.getImageData(0, 0, width, height).data;
    var firstPixel = ctx.getImageData(0, 0, 1, 1).data;
    var currentlyBlack = testIfBlack(firstPixel[0], firstPixel[1], firstPixel[2], firstPixel[3]);
    frameResult[1] = currentlyBlack ? 1 : 0;
    var runLength = 1;
    for (var j = 4; j < data.length; j += 4) {
      var isBlack = testIfBlack(data[j], data[j + 1], data[j + 2], data[j + 3]);
      if (isBlack == currentlyBlack) runLength++;
      else {
        frameResult.push(runLength);
        currentlyBlack ^= true;
        runLength = 1;
      }
    }
    if (currentlyBlack) frameResult.push(runLength);
    //modification here
    const maxSavings = 32;
    let result2 = frameResult.slice(0, 2);
    const fPC = frameResult[1]
    for (let i2 = 2; i2 < frameResult.length; i2++) {
      let f = frameResult[i2];
      if (f > maxSavings) result2.push(f);
      else {
        let r = '';
        while (r.length + f <= maxSavings) {
          let color = (i2 + fPC) % 2;
          r += color.toString().repeat(f);
          i2++;
          f = frameResult[i2];
        }
        i2--;
        result2.push(-1 * parseInt('1' + r, 2));
      }
    }
    result[i] = result2;
    //end modification
  }
  var strResult = '';
  var largestIndex = Math.max.apply(null, result.map(r => r.length));
  for (var i = 0; i < largestIndex; i++) {
    strResult += result.map(r => r[i]).join(',') + '\r\n';
  }
  //also changed file name
  fileName += Math.random().toString().substr(2, 5) + '_rlemov2.csv'
  saveData(strResult, fileName);
}

function testIfBlack(r, g, b, a) {
  var squaredBrightness = 0.299 * (r / 255) ** 2 + 0.587 * (g / 255) ** 2 + 0.114 * (b / 255) ** 2;
  return squaredBrightness * a / 255 < SENSITIVITY ** 2;
}