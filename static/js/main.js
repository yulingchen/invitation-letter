(function () {
  var stage,
    scale,
    layer_bottom,
    layer_middle,
    layer_role,
    layer_top,
    imageDir = 'static/images/',
    imageManifest = [
      // 背景
      { src: "bottom/bg.png", id: "bottom_bg", container: "bottom", position: { x: 0, y: 0 } },

      // 欢迎
      { src: "middle/enter_bg.png", id: "middle_enter_bg", container: "middle", position: { x: 0, y: 492 } },
      { src: "middle/welcome.png", id: "middle_welcome", container: "middle", position: { x: 130, y: 152 } },

      // 签到门
      { src: "middle/wall_shadow.png", id: "middle_wall_shadow", container: "middle", position: { x: 1312, y: 1031 } },
      { src: "middle/signin_bg.png", id: "middle_signin_bg", container: "middle", position: { x: 1343, y: 149 } },
      { src: "middle/door_left.png", id: "middle_door_left", container: "middle", position: { x: 1368, y: 594 } },
      { src: "middle/wall_left.png", id: "middle_wall_left", container: "middle", position: { x: 1328, y: 0 } },

      // 表彰门
      { src: "middle/wall_shadow2.png", id: "middle_wall_shadow_2", container: "middle", position: { x: 4812, y: 1033 } },
      { src: "middle/commendation_bg.png", id: "middle_commendation_bg", container: "middle", position: { x: 4855, y: 268 } },
      { src: "middle/door_left.png", id: "middle_door_left_2", container: "middle", position: { x: 4868, y: 594 } },
      { src: "middle/wall_left.png", id: "middle_wall_left_2", container: "middle", position: { x: 4828, y: 0 } },

      // 抽奖-装饰
      { src: "middle/lottery_decorate.png", id: "middle_lottery_decorate", container: "middle", position: { x: 5300, y: 100 } },

      // 钞票-装饰
      { src: "middle/bill_decorate1.png", id: "middle_bill_decorate1", container: "middle", position: { x: 8600, y: 110 } },
      { src: "middle/bill_decorate2.png", id: "middle_bill_decorate2", container: "middle", position: { x: 8700, y: 110 } },

      // 表彰-转盘
      { src: "middle/turnplate.png", id: "middle_turnplate", container: "middle", position: { x: 9747, y: 398 } },

      // 领奖-装饰
      { src: "middle/prize_decorate.png", id: "middle_prize_decorate", container: "middle", position: { x: 9500, y: 100 } },

      // 结束门
      { src: "middle/end_bg.png", id: "middle_end_bg", container: "middle", position: { x: 10572, y: 888 } },
      { src: "middle/door_left.png", id: "middle_door_left_3", container: "middle", position: { x: 10568, y: 594 } },
      { src: "middle/wall_left.png", id: "middle_wall_left_3", container: "middle", position: { x: 10528, y: 0 } },

      // 欢迎 - 指示牌
      { src: "top/direct.png", id: "top_direct", container: "top", position: { x: -20, y: 95 } },

      // 签到-架子
      { src: "top/shelf.png", id: "top_shelf", container: "top", position: { x: 1530, y: -133 } },

      // 签到门-顶部
      { src: "top/door_right.png", id: "top_door_right", container: "top", position: { x: 1395, y: 635 } },
      { src: "top/wall_right.png", id: "top_wall_right", container: "top", position: { x: 1393, y: 0 } },
      { src: "top/doorbell.png", id: "top_doorbell", container: "top", position: { x: 1421, y: 920 } },

      // 表彰-幕布
      { src: "top/curtain.png", id: "top_curtain", container: "top", position: { x: 4910, y: 0 } },

      // 表彰门-顶部
      { src: "top/door_right.png", id: "top_door_right_2", container: "top", position: { x: 4895, y: 635 } },
      { src: "top/wall_right.png", id: "top_wall_right_2", container: "top", position: { x: 4893, y: 0 } },

      // 结束门-顶部
      { src: "top/door_right.png", id: "top_door_right_3", container: "top", position: { x: 10595, y: 635 } },
      { src: "top/wall_right.png", id: "top_wall_right_3", container: "top", position: { x: 10593, y: 0 } },

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
          var diff = direct === 'right' ? 5 : -5
          layer_bottom.regX = layer_bottom.regX + diff
          layer_middle.regX = layer_middle.regX + diff
          layer_role.regX = layer_role.regX + diff
          layer_top.regX = layer_top.regX + diff
          stage.update()

          if (running) {
            _run(direct)
          }
        })
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
    stage.scaleX = (w * 2 / 750) / 2 //todo

    bindControlEvent()
    initContainer()
    preloadImages()
  })()
})()