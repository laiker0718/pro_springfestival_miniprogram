// components/main-content/main-content.js

let app = getApp()

Component({
  properties: {
    anim_type: {
      type: String,
      value: 'fadeOut'
    },
    anim_timing: {
      type: Number,
      value: 1.5
    }
  },
  data: {
    animTypes: [
      'fadeIn',
      'fadeInDown',
      'fadeInUp',
      'zoomIn',
      'flip',
      'lightSpeedInRight',
      'rotateIn',
    ]
  },
  lifetimes: {
    attached: function() {
      var time = parseFloat(this.properties.anim_timing)
      if(this.properties.anim_type === 'fadeIn') {
        // this.animate('.main-content', [
        //   {opacity: 0.0, ease:'ease-in'},
        //   {opacity: 1.0}
        // ], time, function() {
        //   this.clearAnimation('.main-content', {}, function() {})
        // }.bind(this))
      } else if(this.properties.anim_type == 'fadeInDown') {
        
      } else if(this.properties.anim_type == 'fadeInUp') {
        
      } else if(this.properties.anim_type == 'zoomIn') {
        // this.animate('.main-content', [
        //   {scale: [0.0, 0.0], ease:'ease-in'},
        //   {scale: [1.0, 1.0]}
        // ], time, function() {
        //   this.clearAnimation('.main-content', {}, function() {})
        // }.bind(this))
      } else if(this.properties.anim_type == 'flip') {
        
      } else if(this.properties.anim_type == 'lightSpeedInRight') {
        
      } else if(this.properties.anim_type == 'rotateIn') {
        // this.animate('.main-content', [
        //   {rotate: 0, ease:'ease-in'},
        //   {rotate: 360}
        // ], time, function() {
        //   this.clearAnimation('.main-content', {}, function() {})
        // }.bind(this))
      }
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
  },
})