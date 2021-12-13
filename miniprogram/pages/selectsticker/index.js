// selectsticker.js
// sticker选择页面

import {
  btn_red_back,
  btn_gold_back
} from "../../utils/srouce"

import {random} from "../../utils/random"

const s = wx.getSystemInfoSync()

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),
    pageBack: 'https://qn.notionbase.com/files/0/20210130/FgzKpDwu_CS-l97gXa9uG8fMrabK.png',
    pageFrame: '../../assets/images/preview/frame.png',
    btnRedBack: btn_red_back,
    btnGoldBack: btn_gold_back,

    stickList: [
      'https://qn.notionbase.com/files/0/20210126/Fsb4DQ1CtKiO_uMTDH6JlJrvco4t.png',
      'https://qn.notionbase.com/files/0/20210126/Frg1B1OuON-xYYoyooWPftOBaFv-.png',
      'https://qn.notionbase.com/files/0/20210126/FnPJq38riFItoKtnMnI38E3KpLuq.png',
      'https://qn.notionbase.com/files/0/20210126/FiTvRRs62xBLt6EatYcZtVUgqb3Q.png',
      'https://qn.notionbase.com/files/0/20210126/Fi520TmSrm0Z_wJgQ-5kXOLGxxh5.png',
      'https://qn.notionbase.com/files/0/20210126/FjnyAkllwE_KTZdOF3SQne_hB7VY.png',
    ],
    leftMarginOfSwiper: s.windowWidth * 0.20,
    rightMarginOfSwiper: s.windowWidth * 0.20,
    currentIndex: 0,
    isClicked: false,
    isRotating: true,
    isFight: false,
    canvas: null,
    animId: null,
    rotateStickersLocs: [],
    rotateStickersBackLocs: [],
    isMusicOn: true,
  },
  onLoad: function (options) {
    if (app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210130/FgzKpDwu_CS-l97gXa9uG8fMrabK.png',
        pageFrame: '../../assets/images/preview/frame.png',
        leftMarginOfSwiper: s.windowWidth * 0.20,
        rightMarginOfSwiper: s.windowWidth * 0.20,
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210130/FuKTpc61VxLPu7Po1TEgq7ZcMnr9.png',
        pageFrame: '../../assets/images/preview/frame1080.png',
        leftMarginOfSwiper: s.windowWidth * 0.22,
        rightMarginOfSwiper: s.windowWidth * 0.22,
      })
    }

    if(this.data.isRotating) this.rotateStickers()
  },
  onShow: function () {
    var isOn = wx.getStorageSync('music')
    if(isOn) {
      app.openMusic()
    } else {
      app.pauseMusic()
    }
    this.setData({
      isMusicOn: isOn
    })
    console.log(isOn)
  },
  onReady: function () {},
  onHide: function () {},
  onUnload: function () {
    this.data.canvas.cancelAnimationFrame(this.data.animId)
  },
  onShareAppMessage: function () {
    return {
      title: '玩味新春 乐拼好年',
      path: 'pages/landing/index',
    }
  },
  onShareTimeline: function () {},
  onResize: function () {},
  onBtnGo: function () {
    console.log('onBtnGo')
    
    if(this.data.isRotating) return

    this.setData({
      isRotating: true,
      isFight: true
    })

    this.rotateStickers()
  },
  onBtnConfirm: function () {
    app.setStickerIndex(this.data.currentIndex)

    wx.navigateTo({
      url: '../create/index',
    })
  },
  onSwiperChange: function (e) {
    console.log(e)

    this.setData({
      currentIndex: e.detail.current
    })
  },
  onBtnLeft: function (e) {
    console.log('left: ' + this.data.currentIndex)

    if(this.data.isClicked) return;

    this.data.isClicked = true
    setTimeout( () => {
      this.data.isClicked = false
    }, 500)

    this.data.currentIndex--
    if (this.data.currentIndex < 0) {
      this.data.currentIndex = this.data.stickList.length - 1
    }

    let that = this
    this.setData({
      currentIndex: that.data.currentIndex
    })
  },
  onBtnRight: function (e) {
    console.log('right: ' + this.data.currentIndex)

    if(this.data.isClicked) return;

    this.data.isClicked = true
    setTimeout( () => {
      this.data.isClicked = false
    }, 500)

    this.data.currentIndex++
    if (this.data.currentIndex > this.data.stickList.length - 1) {
      this.data.currentIndex = 0
    }

    let that = this
    this.setData({
      currentIndex: that.data.currentIndex
    })
  },
  initRotateImages: function (canvas) {
    console.log('initRotateImages')
    this.data.rotateStickersLocs = []
    this.data.rotateStickersBackLocs = []

    var len = this.data.stickList.length
    for (var i = 0; i < len; i++) {
      var x = s.windowWidth + i * s.windowHeight * 0.3
      var y = 0
      var width = s.windowHeight * 0.3
      var height = s.windowHeight * 0.3

      if (this.data.isBigPhone) {
        x = s.windowWidth + i * s.windowHeight * 0.27
        width = s.windowHeight * 0.27
        height = s.windowHeight * 0.27
      }

      var item = {
        'x': x,
        'y': y,
        'cw': width,
        'ch': height,
        'width': width,
        'height': height,
        'img': null
      }

      var item2 = {
        'x': x - (len + 1) * width - s.windowWidth,
        'y': y + (height - height * 0.6) / 2,
        'cw': width,
        'ch': height,
        'width': width * 0.6,
        'height': height * 0.6,
        'img': null
      }

      this.data.rotateStickersLocs = this.data.rotateStickersLocs.concat(item)
      this.data.rotateStickersBackLocs = this.data.rotateStickersBackLocs.concat(item2)
    }

    var img0 = canvas.createImage()
    img0.onload = () => {
      this.data.rotateStickersLocs[0].img = img0
      this.data.rotateStickersBackLocs[0].img = img0
    }
    img0.src = this.data.stickList[0]

    var img1 = canvas.createImage()
    img1.onload = () => {
      this.data.rotateStickersLocs[1].img = img1
      this.data.rotateStickersBackLocs[1].img = img1
    }
    img1.src = this.data.stickList[1]

    var img2 = canvas.createImage()
    img2.onload = () => {
      this.data.rotateStickersLocs[2].img = img2
      this.data.rotateStickersBackLocs[2].img = img2
    }
    img2.src = this.data.stickList[2]

    var img3 = canvas.createImage()
    img3.onload = () => {
      this.data.rotateStickersLocs[3].img = img3
      this.data.rotateStickersBackLocs[3].img = img3
    }
    img3.src = this.data.stickList[3]

    var img4 = canvas.createImage()
    img4.onload = () => {
      this.data.rotateStickersLocs[4].img = img4
      this.data.rotateStickersBackLocs[4].img = img4
    }
    img4.src = this.data.stickList[4]

    var img5 = canvas.createImage()
    img5.onload = () => {
      this.data.rotateStickersLocs[5].img = img5
      this.data.rotateStickersBackLocs[5].img = img5
    }
    img5.src = this.data.stickList[5]

    console.log(this.data.rotateStickersLocs)
    console.log(this.data.rotateStickersBackLocs)
  },
  rotateStickers: function () {
    let that = this
    this.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const width = res[0].width
        const height = res[0].height
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        canvas.width = width * s.pixelRatio
        canvas.height = height * s.pixelRatio
        ctx.scale(s.pixelRatio, s.pixelRatio)

        that.data.canvas = canvas

        that.initRotateImages(canvas)

        const renderLoop = () => {
          that.render(canvas, ctx)

          that.data.animId = canvas.requestAnimationFrame(renderLoop)
        }
        that.data.animId = canvas.requestAnimationFrame(renderLoop)
      });
  },
  render: function (canvas, ctx) {
    if(!this.data.isRotating) return

    var w = s.windowWidth
    var h = s.windowHeight * 0.3
    if (this.data.isBigPhone) {
      h = s.windowHeight * 0.27
    }

    ctx.clearRect(0, 0, w, h);

    var gap = 15
    var arrLen = this.data.stickList.length
    for (var i = 0; i < arrLen; i++) {
      var item = this.data.rotateStickersBackLocs[i]

      if (item.img) ctx.drawImage(item.img, item.x, item.y, item.width, item.height)
      item.x += gap + 2
    }

    ctx.globalAlpha = 0.8
    for (var j = 0; j < arrLen; j++) {
      var item = this.data.rotateStickersLocs[j]

      if (item.img) ctx.drawImage(item.img, item.x, item.y, item.width, item.height)
      item.x -= gap
    }
    ctx.globalAlpha = 1

    if(this.data.rotateStickersLocs[5].x < -this.data.rotateStickersLocs[5].cw) {
      console.log('animation ended')

      canvas.cancelAnimationFrame(this.data.animId)

      var index = 0

      if(this.data.isFight) {
        index = random(0, arrLen) % arrLen
        console.log('random index: ' + index)
      }
      this.setData({
        isRotating: false,
        isFight: false,
        currentIndex: index
      })
    }
  },
})