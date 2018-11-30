export let makeColor = function * () {
  var index = 0
  let colors = ['green', 'rgba(255, 0, 0, 1.0)', 'blue', 'magenta', 'orange']
  while (true) {
    yield colors[index]
    if (index < 4) {
      index++
    } else {
      index = 0
    }
  }
}
