// prepare.js
// 规则介绍，选择拍照还是直接图片上传页面

import {btn_red_back, btn_gold_back, rule_frame} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),
    pageBack: 'https://qn.notionbase.com/files/0/20210126/FpeGjZnA8EfdGSLWHtEcPWbRVmBj.png',
    bReadRule: false,

    photoSrc: [],

    btnRedBack: btn_red_back,
    btnGoldBack: btn_gold_back,
    ruleFrame: rule_frame,
    isMusicOn: true,
  },
  onLoad: function(options) {   
    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FpeGjZnA8EfdGSLWHtEcPWbRVmBj.png'
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/Fo2qMeoWK-FDwlGnQrOGASNJZQNk.png'
      })
    } 
  },
  onShow: function() {
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
  onReady: function() {
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  onShareAppMessage: function() {
    return {
      title: '玩味新春 乐拼好年',
      path: 'pages/landing/index',
    }
  },
  onShareTimeline: function() {
  },
  onResize: function() {
  },
  onBtnCamera: function() {
    if(!this.data.bReadRule) return

    if(app.isIphone7()) {
      wx.navigateTo({
        url: '../photo7/index?type=camera',
      })
    } else {
      wx.navigateTo({
        url: '../photo/index?type=camera',
      })
    }
  },
  onBtnPhoto: function() {
    if(!this.data.bReadRule) return

    let that = this
    wx.chooseImage({
      count: 3 - that.data.photoSrc.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        
        that.data.photoSrc = that.data.photoSrc.concat(res.tempFilePaths)
        if(that.data.photoSrc.length >= 3) {
          var arr = that.data.photoSrc
          that.data.photoSrc = []
          wx.navigateTo({
            url: '../create/index?photoSrc=' + arr + '&from=photo',
          })
        }
      },
      fail(e) {
        console.log(e)
      }
    })
  },
  onBtnOk: function() {
    this.setData({
      bReadRule: true
    })

    // let that = this

    // this.animate('.page-rule', [
    //   {scale: [1.0, 1.0]},
    //   {scale: [0.0, 0.0]},
    // ], 500, function() {
    //   that.setData({
    //     bReadRule: true
    //   })

    //   that.clearAnimation('.page-rule', {}, function() {})
    // }.bind(this))
  }
})
