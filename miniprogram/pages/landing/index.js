//index.js

import {btn_red_back} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    pageBack: '../../assets/images/landing/background.png',
    btnRedBack: btn_red_back,

    videoUrl: 'https://qn.notionbase.com/files/1/20210126/FijEABptW34JrkhOPe4MmBvPSvOR.mp4',

    isMusicOn: true,
  },
  onLoad: function(options) { 
    if(app.isBigPhone()) {
      this.setData({
        pageBack: '../../assets/images/landing/background.png',
        videoUrl: 'https://qn.notionbase.com/files/1/20210126/FijEABptW34JrkhOPe4MmBvPSvOR.mp4'
      })
    } else {
      this.setData({
        pageBack: '../../assets/images/landing/background1080.png',
        videoUrl: 'https://qn.notionbase.com/files/1/20210202/FudyrNAIM0mv4Ij-BcY_UP4CbYDT.mp4',
      })
    } 
  },
  onShow: function() {
    console.log('onShow')

    app.setVideoUrl('')

    var arr = []
    app.setPhotoArr(arr)
    app.setPreviewArr(arr)

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
  onReady: function() {},
  onHide: function() {},
  onUnload: function() {},
  onShareAppMessage: function() {
    return {
      title: '玩味新春 乐拼好年',
      path: 'pages/landing/index',
    }
  },
  onShareTimeline: function() {},
  onResize: function() {},
  onBtnGo: function() {
    wx.navigateTo({
      url: '../prepare/index',
    })
  },
  onBtnDownload: function() {
    wx.navigateTo({
      url: '../stickers/index',
    })
  }
})
