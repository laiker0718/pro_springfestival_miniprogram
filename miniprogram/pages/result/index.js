// result.js
// 视频合成结果页

import {ec_background} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),

    pageBack: 'https://qn.notionbase.com/files/0/20210130/FkekbuEwdi9B5tx5GpJ3vydNTpBd.png',
    ecBack: ec_background,

    isFullScreen: true,
    videoContext: null,
    videoUrl: '',
    vWidth: 0,
    vHeight: 0,

    isDownload: false,
    downloadTip: '正在保存',
  },
  onLoad: function(options) {   
    // options.url = 'https://qn.notionbase.com/dg/FutMYprn3d8wLloX-Z9T2otsAa2r.mp4'

    app.pauseMusic()

    app.setVideoUrl(options.url)

    var s = wx.getSystemInfoSync();
    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210130/FkekbuEwdi9B5tx5GpJ3vydNTpBd.png',
        videoUrl: options.url,
        vWidth: s.windowWidth * 0.8,
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210130/FpCT5wmoDGskm8I_kVfdYjMQxzke.png',
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
  onBtnShare: function() {
    wx.navigateTo({
      url: '../input/index',
    })
  },
  onBtnDownload: function() {
    this.setData({
      isDownload: true,
      downloadTip: '正在保存...'
    })

    var that = this
    wx.downloadFile({
      url: that.data.videoUrl,
      success(res) {
        console.log(res.tempFilePath)
        wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            that.setData({
              downloadTip: '保存成功'
            })

            that.downloadComplete()
          },
          fail(e) {
            that.setData({
              downloadTip: '保存失败'
            })

            that.downloadComplete()
          }
        })
      },
      fail(e) {
        that.setData({
          downloadTip: '保存失败'
        })

        that.downloadComplete()
      }
    })
  },
  downloadComplete: function() {
    setTimeout(() => {
      this.setData({
        isDownload: false,
      })
    }, 1000);
  },
  onBtnEc: function() {
    wx.navigateToMiniProgram({
      appId: 'wx553e40a3288bf7ea',
      // path: ''
    })
  },
})
