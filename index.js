var $bottom = $('.wrap>.bottom')
var $wrap = $('.wrap')
var arrData = [0, 0, 0, 0]

var $script = null

function changeBottom(ele) {
  var high = arrData[0],
    index = 0
  for (var k = 1; k < arrData.length; k++) {
    if (arrData[k] > high) {
      high = arrData[k]
      index = k
    }
  }
  ele.css({
    left: 200 * index,
    top: high
  })
  $wrap.css({
    height: high
  })
}

function appendHtml(ele) {
  var low = arrData[0],
    index = 0
  for (var k = 1; k < arrData.length; k++) {
    if (arrData[k] < low) {
      low = arrData[k]
      index = k
    }
  }
  ele.css({
    left: 200 * index,
    top: low
  })
  arrData[index] += ele.height()
}

function createHtml(newsObj) {

  (newsObj.data).forEach(function(ele) {
    var $node = $("<a class=item href=" + ele.url + "><img src=" + ele.img_url + "><\/img><h2>" + ele.short_name + "<\/h2><p>" + ele.short_intro + "<\/p><a>")
    var zt = false
    $node.find('img').load(function() {
      zt = true
    })
    var timer = setInterval(function() {
      if (zt === false) {
        return
      }
      clearInterval(timer)
      $bottom.before($node)
      appendHtml($node)
      changeBottom($bottom)
    }, 50)
  })
  $script.remove()
}

function isShow() {
  var offsetTop = $bottom.offset().top
  var scrollTop = $(window).scrollTop()
  var windowHeight = $(window).innerHeight()
  if (offsetTop - 300 < scrollTop + windowHeight) {
    return true
  }
}

function func(data) {
  createHtml(data)
}
var page = 0,
  timer2 = null

function creatScript(num) {
  var src = 'http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=' + num + '&page=' + page
  if (timer2) {
    clearTimeout(timer2)
  }
  timer2 = setTimeout(function() {
    if (isShow()) {
      page++
      $script = $('<script src=' + src + '><\/script>')
      $('body').append($script)
    }
  }, 100)

}


creatScript(15)
$(window).scroll(function() {
  creatScript(8)
})