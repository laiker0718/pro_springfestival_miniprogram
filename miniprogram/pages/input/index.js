// input.js
// 输入想说的话页面

import {btn_red_back, btn_gold_back} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),
    pageBack: 'https://qn.notionbase.com/files/0/20210126/Fky_noS-6bA8KT0ddDOhVX3ryH2V.png',
    btnRedBack: btn_red_back,
    btnGoldBack: btn_gold_back,

    toName: '',
    showNameModal: false,
    tipModal: false,
    nameAuth: false,

    timer: null,
    isMusicOn: true,
  },
  onLoad: function(options) {   
    app.openMusic()

    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/Fky_noS-6bA8KT0ddDOhVX3ryH2V.png'
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FpZ_qL8tNvTKd77jpCXRapMy_JNj.png'
      })
    }
  },
  onShow: function() {
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
    console.log('onUnload')

    clearTimeout(this.data.timer)
  },
  onShareAppMessage:async function() {
    console.log('share app message')

    var url
    var shareid = wx.getStorageSync('shareid')
    console.log("share id:" + shareid)
    var shareName
    if (this.data.toName.length > 0) {
      shareName = this.data.toName
    } else {
      shareName = ' '
    }

    url = 'pages/share/index?name=' + shareName + '&url=' + app.getVideoUrl()

    console.log(url)

    this.goDownload()

    return {
      title: '玩味新春 乐拼好年',
      path: url,
      imageUrl: app.getVideoUrl() + '?vframe/jpg/offset/1'
    }
  },
  onShareTimeline: function() {
  },
  onResize: function() {
  },
  inputName: function(e) {
    console.log(e.detail.value)

    this.setData({
      toName: e.detail.value
    })
  },
  onBtnIgnore: function() {
    console.log('btn ignore')
  },
  onBtnShare: function() {
    console.log('btn share')
  },
  delay: function() {
    console.log('delay')
    const that = this
    return new Promise((resolve, reject) => {
      
    })
  },
  goDownload: function() {
    this.data.timer = setTimeout(() => {
      wx.navigateTo({
        url: '../download/index',
      })
    }, 1000)
  }
})
