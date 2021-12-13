// stickers.js
// stickers 列表页面

import {sticker_save_tip} from "../../utils/srouce"

const app = getApp()

Page({
  data: {
    pageBack: 'https://qn.notionbase.com/files/0/20210126/Fky_noS-6bA8KT0ddDOhVX3ryH2V.png',
    isBigPhone: true,

    stickList: [
      'https://qn.notionbase.com/dg/DG_CNY_STICKER-1.gif',
      'https://qn.notionbase.com/dg/DG_CNY_STICKER-2.gif',
      'https://qn.notionbase.com/dg/DG_CNY_STICKER-3.gif',
      'https://qn.notionbase.com/dg/DG_CNY_STICKER-4.gif',
      'https://qn.notionbase.com/dg/DG_CNY_STICKER-6.gif',
      'https://qn.notionbase.com/dg/DG_CNY_STICKER-7.gif',
    ],

    isDownload: false,
    downloadTip: '正在保存',
    downloadBack: sticker_save_tip,
    isMusicOn: true,
  },
  onLoad: function(options) {   
    if(app.isBigPhone()) {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/Fky_noS-6bA8KT0ddDOhVX3ryH2V.png',
        isBigPhone: app.isBigPhone()
      })
    } else {
      this.setData({
        pageBack: 'https://qn.notionbase.com/files/0/20210126/FpZ_qL8tNvTKd77jpCXRapMy_JNj.png',
        isBigPhone: app.isBigPhone()
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
  onLongPressDownload: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.url)
    this.setData({
      isDownload: true,
      downloadTip: '正在保存...'
    })

    var that = this
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success(res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
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
        } else {
          that.setData({
            downloadTip: '保存失败'
          })

          that.downloadComplete()
        }
      },
      fail(e) {
        that.setData({
          downloadTip: '保存失败'
        })

        that.downloadComplete()
      }
    })
  },

  downloadComplete() {
    setTimeout(() => {
      this.setData({
        isDownload: false,
      })
    }, 1000);
  }
})
