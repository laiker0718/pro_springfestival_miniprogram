// preview.js
// 照片预览页面

import {
  btn_red_back,
  btn_gold_back,
  preview_border
} from "../../utils/srouce"

const s = wx.getSystemInfoSync()

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),
    pageBack: 'https://qn.notionbase.com/files/0/20210126/FsJLOXPdwU91qKSogPEif4Yg4B3K.png',
    btnRedBack: btn_red_back,
    btnGoldBack: btn_gold_back,
    previewBorder: preview_border,

    photoSrc: [],
    
    isClicked: false,
    wWidth: s.windowWidth,
    wHeight: s.windowHeight,
    leftMarginOfSwiper: s.windowWidth * 0.25,
    rightMarginOfSwiper: s.windowWidth * 0.25,
    currentIndex: 0,

    isMusicOn: true,
  },
  onLoad: function (options) {
    if (app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FsJLOXPdwU91qKSogPEif4Yg4B3K.png',
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FpZ_qL8tNvTKd77jpCXRapMy_JNj.png',
      })
    }

    this.setData({
      photoSrc: app.getPreviewArr()
    })
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
  onUnload: function () {},
  onShareAppMessage: function () {
    return {
      title: '玩味新春 乐拼好年',
      path: 'pages/landing/index',
    }
  },
  onShareTimeline: function () {},
  onResize: function () {},
  onBtnRetake: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  onBtnOk: function () {
    console.log(app.getPhotoArr().length)

    wx.navigateTo({
      url: '../selectsticker/index',
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
      this.data.currentIndex = 2
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
    if (this.data.currentIndex > 2) {
      this.data.currentIndex = 0
    }

    let that = this
    this.setData({
      currentIndex: that.data.currentIndex
    })
  },
})