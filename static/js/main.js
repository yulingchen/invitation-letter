(function () {
  var stage,
    w = document.documentElement.clientWidth,
    h = document.documentElement.clientHeight,
    scale = (h * 2 / 1334) / 2,
    center = (w - 326 * scale) / 2 / scale,
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

      //结束-分享图片
      // { src: "middle/share.png", id: "middle_share", container: "middle", position: { x: 11100, y: 50 } },

      // 角色
      { src: "role/shadow.png", id: "role_shadow", container: "role", position: { x: center + 118, y: 1171 } },
      { src: "role/stand_eyeopen_right.png", id: "role_stand_eyeopen_right", container: "role", position: { x: center, y: 738 } },
      { src: "role/stand_eyeclose_right.png", id: "role_stand_eyeclose_right", hidden: true, container: "role", position: { x: center, y: 738 } },
      { src: "role/stand_eyeopen_left.png", id: "role_stand_eyeopen_left", hidden: true, container: "role", position: { x: center + 10, y: 738 } },
      { src: "role/stand_eyeclose_left.png", id: "role_stand_eyeclose_left", hidden: true, container: "role", position: { x: center + 10, y: 738 } },
      { src: "role/axle.png", id: "role_axle", container: "role", position: { x: center + 106, y: 1033 } },

      // 欢迎 - 指示牌
      { src: "top/direct.png", id: "top_direct", container: "top", position: { x: -20, y: 95 } },

      // 签到-架子
      { src: "top/shelf.png", id: "top_shelf", container: "top", position: { x: 1530, y: -133 } },

      // 签到-气球左
      { src: "top/balloon_left.png", id: "top_balloon_left", container: "top", position: { x: 1570, y: 1140 } },

      // 签到-礼物左
      { src: "top/gift_left.png", id: "top_gift_left", container: "top", position: { x: 1815, y: 1120 } },

      // 签到-拍照
      { src: "top/photograph1.png", id: "top_photograph1", container: "top", position: { x: 2840, y: 1041 } },
      { src: "top/photograph2.png", id: "top_photograph2", container: "top", position: { x: 3345, y: 990 } },
      { src: "top/photograph3.png", id: "top_photograph3", container: "top", position: { x: 3105, y: 1165 } },
      { src: "top/photograph4.png", id: "top_photograph4", container: "top", position: { x: 2878, y: 1050 } },
      { src: "top/photograph5.png", id: "top_photograph5", container: "top", position: { x: 2955, y: 1025 } },

      // 签到-气球右
      { src: "top/balloon_right.png", id: "top_balloon_right", container: "top", position: { x: 3690, y: 1070 } },

      // 签到-礼物右
      { src: "top/gift_right.png", id: "top_gift_right", container: "top", position: { x: 4435, y: 1180 } },

      // 签到门-顶部
      { src: "top/door_right.png", id: "top_door_right", container: "top", position: { x: 1395, y: 635 } },
      { src: "top/wall_right.png", id: "top_wall_right", container: "top", position: { x: 1393, y: 0 } },
      { src: "top/doorbell.png", id: "top_doorbell", container: "top", position: { x: 1421, y: 920 } },

      // 表彰-幕布
      { src: "top/curtain.png", id: "top_curtain", container: "top", position: { x: 4910, y: 0 } },

      // 表彰门-顶部
      { src: "top/door_right.png", id: "top_door_right_2", container: "top", position: { x: 4895, y: 635 } },
      { src: "top/wall_right.png", id: "top_wall_right_2", container: "top", position: { x: 4893, y: 0 } },

      //表彰-鼓掌
      { src: "top/applause1.png", id: "top_applause1", container: "top", position: { x: 5345, y: 1219 } },
      { src: "top/applause2.png", id: "top_applause2", container: "top", position: { x: 5354, y: 1184 } },
      { src: "top/applause3.png", id: "top_applause3", container: "top", position: { x: 5318, y: 1201 } },
      { src: "top/applause4.png", id: "top_applause4", container: "top", position: { x: 5465, y: 1120 } },
      { src: "top/applause5.png", id: "top_applause5", container: "top", position: { x: 5625, y: 1158 } },
      { src: "top/applause6.png", id: "top_applause6", container: "top", position: { x: 5460, y: 1245 } },
      { src: "top/applause7.png", id: "top_applause7", container: "top", position: { x: 5580, y: 1215 } },

      //表彰-跳舞
      { src: "top/dance1.png", id: "top_dance1", container: "top", position: { x: 6510, y: 1045 } },
      { src: "top/dance2.png", id: "top_dance2", container: "top", position: { x: 6725, y: 1017 } },
      { src: "top/dance3.png", id: "top_dance3", container: "top", position: { x: 6935, y: 1060 } },
      { src: "top/dance4.png", id: "top_dance4", container: "top", position: { x: 7120, y: 1015 } },

      //表彰-灯光
      { src: "top/lighting_left.png", id: "top_lighting_left", container: "top", position: { x: 5795, y: 245 } },
      { src: "top/lighting_right.png", id: "top_lighting_right", container: "top", position: { x: 6370, y: 245 } },

      //表彰-游戏
      { src: "top/game_decorate.png", id: "top_game_decorate", container: "top", position: { x: 8280, y: 835 } },
      { src: "top/game1.png", id: "top_game1", container: "top", position: { x: 8370, y: 1000 } },
      { src: "top/game5.png", id: "top_game5", container: "top", position: { x: 9010, y: 990 } },
      { src: "top/game4.png", id: "top_game4", container: "top", position: { x: 8905, y: 970 } },
      { src: "top/game3.png", id: "top_game3", container: "top", position: { x: 8726, y: 945 } },
      { src: "top/game2.png", id: "top_game2", container: "top", position: { x: 8540, y: 990 } },

      //表彰-抽奖
      { src: "top/draw_people.png", id: "top_draw_people", container: "top", position: { x: 9700, y: 995 } },
      { src: "top/lucky_draw.png", id: "top_lucky_draw", container: "top", position: { x: 9990, y: 1102 } },

      //结束门-顶部
      { src: "top/door_right.png", id: "top_door_right_3", container: "top", position: { x: 10595, y: 635 } },
      { src: "top/wall_right.png", id: "top_wall_right_3", container: "top", position: { x: 10593, y: 0 } },
    ],
    imageBlobs = {},
    imageDisplayObjects = {},
    loadedImagesFinished = false,
    run_left = document.getElementById('run_left'),
    run_right = document.getElementById('run_right'),
    run_disable = false,
    run_direction = 'right',
    run_distance = 0,
    run_max_distance = 10540;

  //绘制图片
  function drawImage(imgObject) {
    var image = new createjs.Bitmap(imgObject.img);
    image.x = imgObject.pos.x;
    image.y = imgObject.pos.y;
    image.visible = !imgObject.hidden
    imageDisplayObjects[imgObject.id] = image

    switch (imgObject.container) {
      case 'bottom':
        layer_bottom.addChild(image);
        break;
      case 'middle':
        layer_middle.addChild(image);
        break;
      case 'role':
        if (imgObject.id === 'role_axle') {
          image.scale = 2
        }
        layer_role.addChild(image);
        break;
      case 'top':
        layer_top.addChild(image);
        break;
    }
    stage.update()
  }

  //绘制角色提示文字
  function drawRoleText() {
    var roleText = new createjs.Text("Hello World", "24px Arial", "#000"),
      bounds = roleText.getBounds();
    drawRoleCenter = (w - bounds.width * scale) / 2 / scale;

    roleText.textAlign = 'start'
    roleText.x = drawRoleCenter
    roleText.y = 700
    roleText.textBaseline = "alphabetic";

    var RoleTextRect = new createjs.Shape();
    RoleTextRect.x = drawRoleCenter;
    RoleTextRect.y = 680;
    RoleTextRect.graphics.clear().beginStroke("#ddd").beginFill("#FFFFFF").drawRect(-10, -10, roleText.getMeasuredWidth() + 20, 50);

    imageDisplayObjects['RoleTextRect'] = RoleTextRect
    imageDisplayObjects['roleText'] = roleText

    layer_role.addChild(RoleTextRect);
    layer_role.addChild(roleText);

    RoleTextRect.visible = false
    roleText.visible = false

    stage.update()
  }

  //隐藏角色提示文字
  function hideRoleText() {
    var RoleTextRect = imageDisplayObjects['RoleTextRect']
    var roleText = imageDisplayObjects['roleText']
    RoleTextRect.visible = false
    roleText.visible = false
  }

  //更新角色提示文字
  function setRoleText(text) {
    var RoleTextRect = imageDisplayObjects['RoleTextRect']
    var roleText = imageDisplayObjects['roleText']
    RoleTextRect.graphics.clear().beginStroke("#ddd").beginFill("#FFFFFF").drawRect(-10, -10, roleText.getMeasuredWidth() + 20, 50);
    RoleTextRect.visible = true
    roleText.visible = true
    roleText.text = text
  }

  //预加载图片资源
  function preloadImages() {
    var preload = new createjs.LoadQueue(true, imageDir);

    function _handleProgress(event) {
      // console.log('preloadImages handleProgress', event.loaded)
    }

    function _handleComplete(event) {
      Object.keys(imageBlobs).forEach(function (itemId) {
        drawImage(imageBlobs[itemId])
      })
      drawRoleText()
      loadedImagesFinished = true
    }

    function _handleFileLoad(event) {
      imageBlobs[event.item.id] = {
        id: event.item.id,
        img: event.result,
        pos: event.item.position,
        container: event.item.container,
        hidden: event.item.hidden || false
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
  function bindEvents() {
    function _roleRotation(id, isRun, direction) {
      var role_stand_eyeopen = imageDisplayObjects[id]
      role_stand_eyeopen.rotation = isRun ? direction === 'right' ? 5 : -5 : 0
      role_stand_eyeopen.regX = isRun ? direction === 'right' ? -30 : 32 : 0
      role_stand_eyeopen.regY = isRun ? direction === 'right' ? 16 : -12 : 0
      stage.update()
    }

    run_left.addEventListener('touchstart', function (e) {
      e.preventDefault()
      createjs.Ticker.paused = false
      run_direction = 'left'
      imageDisplayObjects['role_stand_eyeopen_right'].visible = false
      imageDisplayObjects['role_stand_eyeopen_left'].visible = true
      _roleRotation('role_stand_eyeopen_left', true, 'left')
    });

    run_left.addEventListener('touchend', function (e) {
      e.preventDefault()
      createjs.Ticker.paused = true
      _roleRotation('role_stand_eyeopen_left', false, 'left')
    });

    run_right.addEventListener('touchstart', function (e) {
      e.preventDefault()
      createjs.Ticker.paused = false
      run_direction = 'right'
      imageDisplayObjects['role_stand_eyeopen_right'].visible = true
      imageDisplayObjects['role_stand_eyeopen_left'].visible = false
      _roleRotation('role_stand_eyeopen_right', true, 'right')
    });

    run_right.addEventListener('touchend', function (e) {
      e.preventDefault()
      createjs.Ticker.paused = true
      _roleRotation('role_stand_eyeopen_right', false, 'right')
    });
  }

  //显示分享图片
  function showShare() {
    var posHeight = document.getElementById('position').clientHeight
    document.getElementById('code_picture').style.display = 'block'
    document.getElementById('position').style.display = 'block'
    document.getElementById('position').style.bottom = 0;
    document.getElementById('canvas').style.display = 'none'
    document.getElementById('code_picture').style.bottom = (posHeight - 68) + 'px'
  }

  //定时器回调
  function handleTick(event) {
    if (!event.paused && loadedImagesFinished && !run_disable) {
      run_distance += run_direction === 'right' ? 10 : -10
      if (run_distance < 0) run_distance = 0
      if (run_distance > run_max_distance) run_distance = run_max_distance
      console.log('run_distance', run_distance)

      //画布移动
      if (run_distance >= 0 && run_distance <= run_max_distance) {
        layer_bottom.regX = run_distance
        layer_middle.regX = run_distance
        layer_top.regX = run_distance
        stage.update()
      }

      //角色提示文字
      hideRoleText()
      if (run_distance >= 50 && run_distance <= 900 && run_direction === 'right') {
        setRoleText('Let’s Go !')
      } else if (run_distance >= 1150 && run_distance <= 1880) {
        setRoleText('领伴手礼啦!')
      } else if (run_distance >= 2160 && run_distance <= 3250) {
        setRoleText('快来拍一张鸭~')
      } else if (run_distance >= 3440 && run_distance <= 4000) {
        setRoleText('一起玩游戏吧~')
      } else if (run_distance >= 4820 && run_distance <= 5530) {
        setRoleText('666~666666~')
      } else if (run_distance >= 6000 && run_distance <= 7390) {
        setRoleText('好High哟~')
      } else if (run_distance >= 7950 && run_distance <= 8860) {
        setRoleText('谁是最强战队呢?')
      } else if (run_distance >= 9280 && run_distance <= 9920) {
        setRoleText('你是锦鲤本鲤嘛~')
      } else if (run_distance >= run_max_distance) {
        run_disable = true
        layer_role.visible = false
        stage.update()
        showShare()
      }
    }
  }

  function timeDown(id, endDateStr) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    //输出到页面
    document.getElementById(id).innerHTML = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
    //延迟一秒执行自己
    setTimeout(function () {
      timeDown(id, endDateStr);
    }, 1000)
  }

  //初始化舞台
  (function () {
    stage = new createjs.Stage("canvas");
    createjs.Touch.enable(stage);

    stage.canvas.width = 750;
    stage.canvas.height = 1334;
    stage.scale = scale;

    //注册监听器
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 30;
    createjs.Ticker.paused = true;

    bindEvents()
    initContainer()
    preloadImages()

    timeDown("timeDown", "2019-1-15 14:30:00")
  })()
})()