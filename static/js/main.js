(function () {
  var stage,
    scale,
    imageDir = 'static/images/',
    imageManifest = [
      { src: "canvas-bg.png", id: "canvasBg", position: { x: 0, y: 0 } }, //画布底部背景
    ],
    imageDisplayObjects = {};

  //绘制图片
  function drawImage(imgObject) {
    var image = new createjs.Bitmap(imgObject.img);
    image.x = imgObject.pos.x;
    image.y = imgObject.pos.y;
    image.scale = scale * 0.8
    stage.addChild(image);
    stage.update()
  }

  //预加载图片资源
  function preloadImages() {
    var preload = new createjs.LoadQueue(true, imageDir);

    function _handleProgress(event) {
      // console.log('preloadImages handleProgress', event.loaded)
    }

    function _handleComplete(event) {
      Object.keys(imageDisplayObjects).forEach(function (itemId) {
        drawImage(imageDisplayObjects[itemId])
      })
    }

    function _handleFileLoad(event) {
      imageDisplayObjects[event.item.id] = {
        img: event.result,
        pos: event.item.position
      }
    }

    preload.on("progress", _handleProgress);
    preload.on("complete", _handleComplete);
    preload.on("fileload", _handleFileLoad);
    preload.loadManifest(imageManifest, true);
  }

  //初始化舞台
  (function () {
    var documentElement = document.documentElement,
      w = documentElement.clientWidth,
      h = documentElement.clientHeight;

    stage = new createjs.Stage("canvas");
    createjs.Touch.enable(stage);

    //加载背景图
    var preloadBg = new createjs.LoadQueue();
    preloadBg.addEventListener("fileload", function (event) {
      scale = h / event.result.height
      stage.canvas.width = w;
      stage.canvas.height = h;
      preloadImages()
    });
    preloadBg.loadFile(imageDir + 'canvas-bg.png');
  })()
})()