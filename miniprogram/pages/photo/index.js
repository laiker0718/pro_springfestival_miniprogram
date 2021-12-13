// photo.js
// 拍摄页面

const app = getApp()

Page({
  data: {
    isFront: true,
    wWidth: 0,
    wHeight: 0,
    isBigPhone: true,

    cameraCtx: null,
    urlTaken: '../../assets/images/photo/photo-taken-0.png',
    isCanClick: true,
    nPhoto: 0,
    photoSrc: [],
    isMusicOn: true,
  },
  onLoad: function (options) {
    var s = wx.getSystemInfoSync();
    this.setData({
      wWidth: s.windowWidth,
      wHeight: s.windowHeight,
      isBigPhone: app.isBigPhone()
    })

    this.data.cameraCtx = wx.createCameraContext()
  },
  onShow: function () {
    console.log("onShow")

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
  onBtnPhotograph: function () {
    console.log('onBtnPhotograph')

    if(!this.data.isCanClick) return
    this.data.isCanClick = false

    let that = this
    wx.chooseImage({
      count: 3 - that.data.nPhoto,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        that.addPhoto(res.tempFilePaths)
      },
      fail(e) {
        console.log(e)
        that.data.isCanClick = true
      }
    })
  },
  startTakePhotos: function () {
    console.log('startTakePhotos')

    if(!this.data.isCanClick) return
    this.data.isCanClick = false

    let that = this
    this.data.cameraCtx.takePhoto({
      quality: 'high',
      success(res) {
        console.log(res)
        
        var photos = [].concat(res.tempImagePath)
        that.addPhoto(photos)
      },
      fail(e) {
        console.log(e)
        that.data.isCanClick = true
      }
    })
  },
  switchCamera: function () {
    this.data.isFront = !this.data.isFront

    let that = this
    this.setData({
      isFront: that.data.isFront
    })
  },
  addPhoto: function (photos) {
    if(this.data.nPhoto >= 3) return 
    
    this.data.photoSrc = this.data.photoSrc.concat(photos)
    this.data.nPhoto += photos.length
    this.data.urlTaken = '../../assets/images/photo/photo-taken-' + this.data.nPhoto + '.png'

    let that = this
    this.setData({
      nPhoto: that.data.nPhoto,
      photoSrc: that.data.photoSrc,
    })

    console.log('photo num: ' + this.data.nPhoto)
    console.log(this.data.photoSrc)

    this.clearAnimation('.image-tip', {}, function () {
      console.log('clear image tip animation')
      that.animate('.image-tip', [
        {scale: [1, 1], opacity: 1, translate: ['0', '0'], ease: 'ease-in'},
        {scale: [0, 0], opacity: 0, translate: ['-100%', '-100%'], ease: 'ease-in'}
      ], 500, function () {
        console.log('image tip animation complete')

        that.setData({
          urlTaken: that.data.urlTaken,
          isCanClick: true
        })

        if (that.data.nPhoto >= 3) {
          that.clearAnimation('.image-tip', {}, function () {
            console.log('photo ok, navigate to next page')
            var photos = that.data.photoSrc

            that.setData({
              urlTaken: '../../assets/images/photo/photo-taken-0.png',
              nPhoto: 0,
              photoSrc: [],
            })

            console.log('after reset photo data')
            console.log(photos)
            wx.navigateTo({
              url: '../create/index?photoSrc=' + photos + '&from=photo',
            })
          })
        }
      }.bind(that))
    })
  },
})