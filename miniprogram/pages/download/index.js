// download.js
// 下载视频 或 下载贴纸页面，这页面其实没什么卵用

import {ec_background} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    isBigPhone: app.isBigPhone(),
    pageBack: 'https://qn.notionbase.com/files/0/20210126/Fky_noS-6bA8KT0ddDOhVX3ryH2V.png',
    ecBack: ec_background,

    isDownload: false,
    downloadTip: '正在保存',
    isMusicOn: true,
  },
  onLoad: function(options) {   
    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/Fky_noS-6bA8KT0ddDOhVX3ryH2V.png',
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FpZ_qL8tNvTKd77jpCXRapMy_JNj.png',
      })
    }
    // 'https://qn.notionbase.com/dg/FutMYprn3d8wLloX-Z9T2otsAa2r.mp4',
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
  onBtnDownload: function() {
    this.setData({
      isDownload: true,
      downloadTip: '正在保存...'
    })

    var that = this
    wx.downloadFile({
      url: app.getVideoUrl(),
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
  onBtnDownloadStickers: function() {
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

  downloadComplete() {
    setTimeout(() => {
      this.setData({
        isDownload: false,
      })
    }, 1000);
  },
})
