// components/btn-top/btn-top.js

let app = getApp()

Component({
  properties: {
    isOn: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) { 
        console.log('btn music value change')
        if(newVal != oldVal) {
          if(newVal) {
            this.setData({
              btnSrc: '../../assets/images/btn-music-on.png'
            })
          } else {
            this.setData({
              btnSrc: '../../assets/images/btn-music-off.png'
            })
          }
        }

        console.log(this.data.btnSrc)
      }
    }
  },
  data: {
    posTop: 0,
    right: 0,
    isOn: true,
    btnSrc: '../../assets/images/btn-music-on.png',
  },
  lifetimes: {
    attached: function() {
      
      var isOn = wx.getStorageSync('music')
      var imgSrc = '../../assets/images/btn-music-on.png'
      if(!isOn) {
        imgSrc = '../../assets/images/btn-music-off.png' 
      }
      console.log('is on: ' + isOn)
      console.log(imgSrc)

      var data = wx.getMenuButtonBoundingClientRect()
      var bTop = data.top + 60
      if(app.isBigPhone()) {
        bTop = data.top + 35
      }
      this.setData({
        btnTop: bTop,
        btnRight: 10,
        btnSrc: imgSrc
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
    onBtnMusic: function() {
      this.data.isOn = !this.data.isOn
      wx.setStorageSync('music', this.data.isOn)

      if(this.data.isOn) {
        this.setData({
          btnSrc: '../../assets/images/btn-music-on.png'
        })

        app.openMusic()
      } else {
        this.setData({
          btnSrc: '../../assets/images/btn-music-off.png'
        })

        app.pauseMusic()
      }
    }
  },
})