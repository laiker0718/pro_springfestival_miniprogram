//防止多次重复点击  （函数节流）
export default function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000
  }

  let _lastTime = null

  // 返回新的函数
  return function (e) {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      // fn.apply(this, arguments)   //将this和参数传给原函数
      fn(this, e)
      _lastTime = _nowTime
    }
  }
}