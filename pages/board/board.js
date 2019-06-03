//logs.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    boards: [
      { key: 'in_theaters',title:'正在热映' },
      { key: 'coming_soon',title:'即将上映' },
      { key: 'new_movies',title:'新片榜' },
      { key: 'top250',title:'Top250' },
      // { key: 'weekly' },
      // { key: 'us_box' }
    ]
  },
  onLoad: function () {
    // wx.showLoading({ title: '拼命加载中...' })
    const tasks = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 8)
        .then(d => {
          // board.title = d.title
          board.movies = d.subjects
          return board
        })
    })

    Promise.all(tasks).then(boards => {
      this.setData({ boards: boards, loading: false })
      wx.hideLoading()
    })
  }
})
