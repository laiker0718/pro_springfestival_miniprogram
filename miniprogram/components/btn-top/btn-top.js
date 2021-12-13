// components/btn-top/btn-top.js

let app = getApp()

Component({
  properties: {
  },
  data: {
    posTop: 0,
    width: 0,
    height: 0
  },
  lifetimes: {
    attached: function() {
      var data = wx.getMenuButtonBoundingClientRect()
      this.setData({
        btnTop: data.top,
        width: data.width,
        height: data.height
      })
    },
    moved: function() {
    },
    detached: function() {
    }
  },
  pageLifetimes: {
    show: function () {
    },
    hide: function() {
    },
    resize: function() {
    }
  },
  methods: {
    onBtnBack: function() {
      wx.navigateBack({
        delta: 1
      })
    },
    onBtnHome: function() {
      wx.navigateBack({
        delta: 999
      })
    }
  },
})