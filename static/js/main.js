(function () {
  var stage,
    scale,
    layer_bottom,
    layer_middle,
    layer_role,
    layer_top,
    imageDir = 'static/images/',
    imageManifest = [
      { src: "bottom/bg.png", id: "bottom_bg", container: "bottom", position: { x: 0, y: 0 } },
      { src: "middle/floor.png", id: "middle_floor", container: "middle", position: { x: 0, y: 492 } },
      { src: "middle/welcome.png", id: "middle_welcome", container: "middle", position: { x: 130, y: 152 } },
      { src: "top/direct.png", id: "top_direct", container: "top", position: { x: -20, y: 95 } },
    ],
    imageDisplayObjects = {},
    run_left = document.getElementById('run_left'),
    run_right = document.getElementById('run_right'),
    running = false;

  //绘制图片
  function drawImage(imgObject) {
    var image = new createjs.Bitmap(imgObject.img);
    image.x = imgObject.pos.x;
    image.y = imgObject.pos.y;

    switch (imgObject.container) {
      case 'bottom':
        layer_bottom.addChild(image);
        break;
      case 'middle':
        layer_middle.addChild(image);
        break;
      case 'role':
        layer_role.addChild(image);
        break;
      case 'top':
        layer_top.addChild(image);
        break;
    }
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
        pos: event.item.position,
        container: event.item.container,
      }
    }

    preload.on("progress", _handleProgress);
    preload.on("complete", _handleComplete);
    preload.on("fileload", _handleFileLoad);
    preload.loadManifest(imageManifest, true);
  }

  //初始化容器
  function initContainer() {
    function _createContainer() {
      var layer = new createjs.Container()
      layer.x = 0
      layer.y = 0
      stage.addChild(layer);
      return layer
    }
    layer_bottom = _createContainer()
    layer_middle = _createContainer()
    layer_role = _createContainer()
    layer_top = _createContainer()
  }

  //绑定控制事件
  function bindControlEvent() {
    function _run(direct) {
      (function (running) {
        setTimeout(function () {
          console.log('run ' + direct)
          if (running) {
            _run(direct)
          }
        }, 30)
      })(running)
    }

    run_left.addEventListener('touchstart', function (e) {
      e.preventDefault()
      running = true
      _run('left')
    });

    run_left.addEventListener('touchend', function (e) {
      e.preventDefault()
      running = false
      _run('left')
    });

    run_right.addEventListener('touchstart', function (e) {
      e.preventDefault()
      running = true
      _run('right')
    });

    run_right.addEventListener('touchend', function (e) {
      e.preventDefault()
      running = false
    });
  }

  //初始化舞台
  (function () {
    var documentElement = document.documentElement,
      w = documentElement.clientWidth,
      h = documentElement.clientHeight;

    stage = new createjs.Stage("canvas");
    createjs.Touch.enable(stage);

    stage.canvas.width = 750;
    stage.canvas.height = 1334;
    stage.scaleY = (h * 2 / 1334) / 2
    stage.scaleX = (w * 2 / 750) / 2

    bindControlEvent()
    initContainer()
    preloadImages()
  })()
})()