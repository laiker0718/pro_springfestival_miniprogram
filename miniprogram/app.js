//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'dg-cny-2glxidmv5b526ba7',
        env: 'dg-cny-9grggs53fdb53b8c'
        // traceUser: true,
      })

      // 判断有没有缓存
      let that = this
      if (!wx.getStorageSync('userInfo')) {
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login]', res)
            that.globalData.userInfo = res.result.userInfo
            // 写入缓存
            wx.setStorageSync('userInfo', that.globalData.userInfo)
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
      } else {
          this.globalData.userInfo = wx.getStorageSync('userInfo')
      }
    }

    var info = wx.getSystemInfoSync()
    console.log(info)
    if (info.windowHeight / info.windowWidth > 2) {
      console.log('it is a big phone')
      this.globalData.isBigPhone = true
    } else {
      console.log('it is a small phone')
      this.globalData.isBigPhone = false
    }

    var model = info.model
    var value = model.search('iPhone 6')
    console.log(value)
    value = model.search('iPhone 7')
    console.log(value)
    if (model.search('iPhone 6') == 0 || model.search('iPhone 7') == 0) {
      console.log('is iphone7')
      this.globalData.isIphone7 = true
    }

    // 背景音乐
    this.globalData.innerAudioContext = wx.createInnerAudioContext()
    this.globalData.innerAudioContext.autoplay = true
    this.globalData.innerAudioContext.loop = true
    this.globalData.innerAudioContext.obeyMuteSwitch = true
    this.globalData.innerAudioContext.src = 'https://qn.notionbase.com/dg/bg-music.mp3'

    wx.getStorage({
      key: 'music',
      success: res => {
        console.log(res)
        console.log(res.data)
        if(!res.data) {
          this.pauseMusic()
        }
      },
      fail: e => {
        console.log(e)

        wx.setStorageSync('music', true)
      }
    })
  },
  onShow: function() {
    console.log('app onShow')
    
    var isOn = wx.getStorageSync('music')
    if(isOn) {
      this.openMusic()
    }
  },
  onHide: function() {
    console.log('app onHide')
  },
  globalData: {
    userInfo: null,
    isBigPhone: false,
    isIphone7: false,
    previewArr: [],
    photoArr: [],
    stickerIndex: 0,
    videoUrl: '',
    openid: '',
    innerAudioContext:null,
  },
  getOpenId() {
    return this.globalData.userInfo.openId
  },
  isBigPhone() {
    return this.globalData.isBigPhone
  },
  isIphone7() {
    return this.globalData.isIphone7
  },
  addPreviewToArr(photos) {
    this.globalData.previewArr = this.globalData.previewArr.concat(photos)
  },
  setPreviewArr(arr) {
    this.globalData.previewArr = []
    this.globalData.previewArr = this.globalData.previewArr.concat(arr)
  },
  getPreviewArr() {
    return this.globalData.previewArr;
  },
  addPhotoToArr(photos) {
    this.globalData.photoArr = this.globalData.photoArr.concat(photos)
  },
  setPhotoArr(arr) {
    this.globalData.photoArr = []
    this.globalData.photoArr = this.globalData.photoArr.concat(arr)
  },
  getPhotoArr() {
    return this.globalData.photoArr;
  },
  setStickerIndex(index) {
    this.globalData.stickerIndex = index
  },
  getStickerIndex() {
    return this.globalData.stickerIndex
  },
  setVideoUrl(url) {
    this.globalData.videoUrl = url
  },
  getVideoUrl() {
    return this.globalData.videoUrl
  },
  getOpenId() {
    return this.globalData.openid
  },
  setOpenId(s) {
    this.globalData.openid = s
  },
  openMusic() {
    console.log('play music')
    this.globalData.innerAudioContext.play()
  },
  pauseMusic() {
    console.log('pause music')
    this.globalData.innerAudioContext.pause()
  }
    
})