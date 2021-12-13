// share.js
// 分享页

import {ec_background} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),
    pageBack: 'https://qn.notionbase.com/files/0/20210201/Ft-kEh3TpErCiOfl9qy3jKDZZanN.png',
    ecBack: ec_background,
    
    isFullScreen: true,
    videoContext: null,
    videoUrl: '',
    vWidth: 0,
    vHeight: 0,

    nameFrom: '开心的小莉',
  },
  onLoad: function(options) {   
    // options.url = 'https://qn.notionbase.com/dg/FutMYprn3d8wLloX-Z9T2otsAa2r.mp4'

    app.pauseMusic()

    console.log(options) 

    var s = wx.getSystemInfoSync();
    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210201/Ft-kEh3TpErCiOfl9qy3jKDZZanN.png',
        nameFrom: options.name,
        videoUrl: options.url,
        vWidth: s.windowWidth * 0.8,
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210130/FgALswdeMPzg_-uo72P3t_4c5JQC.png',
        nameFrom: options.name,
        videoUrl: options.url,
        vWidth: s.windowWidth * 0.7,
      })
    }
  },
  onShow: function() {},
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
  videoPlayEnded: function(e) {
    console.log('video play ended')

    if(!this.data.isFullScreen) return

    this.setData({
      isFullScreen: false
    })
  },
  onBtnFullScreen: function() {
    console.log('video play ended')
    this.data.isFullScreen = !this.data.isFullScreen

    let that = this
    this.setData({
      isFullScreen: that.data.isFullScreen
    })
  },
  onBtnHome: function() {
    console.log('go home')

    wx.redirectTo({
      url: '../landing/index',
    })
  },
  onBtnDownload: function() {
    console.log('go download stickers')

    wx.navigateTo({
      url: '../stickers/index',
    })
  },
  onBtnEc: function() {
    wx.navigateToMiniProgram({
      appId: 'wx553e40a3288bf7ea',
      // path: ''
    })
  },
})
