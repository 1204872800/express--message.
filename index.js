var express = require('express')
var app = express()
var fs = require('fs')
var template = require('art-template')
var date = require('./date')
var comments = [{
  name: '张三1',
  message: '今天的天气一点都不好'
}, {
  name: '张三2',
  message: '今天的天气一点都不好'
}, {
  name: '张三3',
  message: '今天的天气一点都不好'
}, ]

app.use('/public/', express.static('./public/'))
app.get('/', function (req, res) {
  fs.readFile('./view/index.html', function (error, data) {
    if (error) {
      return res.send('该页面找不到!!!')
    }
    data = data.toString()
    var ret = template.render(data, {
      comments
    })
    res.end(ret)
  })
})

app.get('/post', function (req, res) {
  fs.readFile('./view/post.html', function (error, data) {
    if (error) {
      return res.send('404 not found')
    }
    res.end(data)
  })
})

app.get('/pinglun', function (req, res) {
  console.log(req.query);
  var dx = req.query
  dx.dateTime = date
  comments.unshift(dx)
  // res.statusCode = 302
  // res.setHeader('Location', '/')
  res.end('200 ok')
})

app.listen(3000, function () {
  console.log('3000端口的服务器启动了!!!');
})