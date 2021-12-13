// create.js
// 视频制作中提示页面

const app = getApp()

const s = wx.getSystemInfoSync()

Page({
  data: {
    pageBack: 'https://qn.notionbase.com/files/0/20210126/FuAwwiLuZN4GJ6ijMmND0heKlFs7.png',
    videoUrl: '',

    canvas: null,
    cWidth: s.windowWidth,
    cHeight: s.windowWidth * 16 / 9,

    isError: false,
    errMsg: '哎呀，网络抖动了',

    isMusicOn: true,
  },
  onLoad: function(options) {   
    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FuAwwiLuZN4GJ6ijMmND0heKlFs7.png'
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FsJvf37yW_s8RPOYzjhr_qsTo7Oz.png'
      })
    } 

    if(options.from == 'photo') {
      this.photoFilter(options.photoSrc)
    } else {
      this.createVideo()
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
  createVideo: function() {
    var type = app.getStickerIndex()
    var arr = app.getPhotoArr()

    console.log('create video')
    console.log('sticker index: ' + type)
    console.log(arr)

    let that = this
    wx.request({
      url: 'https://video.notionbase.com/dg',
      header: {
        'content-type': 'application/json'
      },
      data: {
        type: type + 1,
        file1: arr[0],
        file2: arr[1],
        file3: arr[2],
      },
      method: "POST",
      success(res) {
        console.log(res)
        console.log(res.data.url)
        wx.redirectTo({
          url: '../result/index?url=' + res.data.url,
        })
      },
      fail(e) {
        console.log(e)
        that.netError()
      }
     })
  },
  photoFilter: function (phoArr) {
    console.log("photo filter")

    let that = this
    wx.createSelectorQuery()
      .select('#canvas2D')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = s.pixelRatio
        // canvas.width = 720 * dpr
        // canvas.height = 1280 * dpr
        canvas.width = 360 * dpr
        canvas.height = 640 * dpr
        ctx.scale(dpr, dpr)

        that.data.canvas = canvas
        that.imgFilter(phoArr)
      })
  },
  imgFilter: function (arr) {
    var photos = arr.split(',')
    console.log(photos)

    let that = this
    wx.request({
      url: 'https://api.notionbase.com/api/storage/qiniu/token',
      data: {
        strategy: 'dg',
        app: 129
      },
      method: "POST",
      success(res) {
        var token = res.data.data.token

        that.getImageInfo(token, photos, 0)
      },
      fail(e) {
        console.log("qiniu token error")
        console.log(e)

        that.netError()
      }
    })
  },
  getImageInfo: function (token, photos, index) {
    let that = this

    if(index >= photos.length) return

    var path = photos[index]
    wx.getImageInfo({
      src: path,
      success(res) {
        console.log('get image info')
        console.log(res)

        that.changeImageRatio(res.path, res.width, res.height, (result) => {
          console.log('change image ratio')
          console.log(result) // result.tempFilePath
          if(result) {
            that.uploadFile(token, result.tempFilePath)

            index++
            that.getImageInfo(token, photos, index)
          } else {
            that.netError()
          }
        })
      },
      fail(e) {
        console.log("get image info error")
        console.log(e)

        that.netError()
      }
    })
  },
  changeImageRatio: function (src, width, height, callback) {
    console.log('changeImageRatio')
    console.log('src: ' + src)
    console.log('width: ' + width + ', height: ' + height)

    var scale = 360 / width
    var imgH = height * scale
    var y = (640 - imgH)

    let that = this
    const canvas = this.data.canvas
    var img = canvas.createImage()
    img.onload = () => {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 360, 640)
      ctx.drawImage(img, 0, 0, width, height, 0, y / 2, 360, imgH)

      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvas: that.data.canvas,
          destWidth: 720,
          destHeight: 1280,
          fileType: 'jpg',
          success: function (res) {
            console.log("canvasToTempFilePath success")
            console.log(res)

            callback(res)
          },
          fail: function (e) {
            console.log("canvasToTempFilePath error")
            console.log(e)

            callback(null)
          }
        })

        wx.canvasToTempFilePath({
          canvas: that.data.canvas,
          destWidth: 180,
          destHeight: 320,
          fileType: 'jpg',
          success: function (res) {
            console.log("small size success")
            console.log(res)
            
            that.imgSecCheck(res.tempFilePath)
          }
        })
        
      }, 100)
    }
    img.src = src
  },
  uploadFile: function (token, path) {
    let that = this
    wx.uploadFile({
      filePath: path, // result.tempFilePath,
      name: 'file',
      url: 'https://upload.qiniup.com',
      formData: {
        token: token
      },
      success(res) {
        console.log('upload file')
        console.log(res)
        var temurl = JSON.parse(res.data).data.url
        console.log(temurl)
        that.filter(temurl)
      },
      fail(e) {
        console.log("upload error")
        console.log(e)

        that.netError()
      }
    })
  },
  filter: function (url) {
    let that = this
    wx.request({
      url: 'https://video.notionbase.com/filter',
      header: {
        'content-type': 'application/json'
      },
      data: {
        url: url
      },
      method: "POST",
      success(res) {
        console.log("filter success")
        console.log(res)
        console.log("isError: " + that.data.isError)

        if(!that.data.isError) {
          if (res.statusCode == 200 && res.data.status == 'success') {
            var jsonData = JSON.parse(res.data.data)
            app.addPreviewToArr('data:image/png;base64,' + jsonData.base64)
          } else {
            app.addPreviewToArr(url)
          }

          app.addPhotoToArr(url)
          if(app.getPreviewArr().length >= 3) {
            wx.redirectTo({
              url: '../preview/index',
            })
          } 
        }
      },
      fail(e) {
        console.log("filter error")
        console.log(e)

        that.netError()
      }
    })
  },
  netError: function() {
    this.setData({
      isError: true
    })
  },
  imgSecCheck(path) {
    console.log('imgSecCheck')

    let that = this
    console.log(path)

      wx.getFileSystemManager().readFile({
        filePath: path,
        success: res => {
          console.log(res)
          wx.cloud.callFunction({
            name: 'imgSecCheck',
            data: {
              img: res.data
            },
            success: res => {
              console.log('img check success')
              console.log(res)
              if(res.result.code == 500) {
                that.setData({
                  errMsg: '内容含有违法违规内容'
                })
                that.netError()
              }
            },
            fail: err => {
              console.error('[imgSecCheck]调用失败', err)
            }
          })
        }
      })
  }
})
