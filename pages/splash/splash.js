//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    subtitle:'',
    type:'coming_soon',
    list:[],
    loading:true,
    try1:[{a:'1'},{b:'1'},{c:'1'},{d:'1'},{e:'1'},{f:'1'}]
  },
  handleStart () {
    // TODO: 访问历史的问题
    // wx.switchTab({
    //   url: '../board/board'
    // })
    wx.redirectTo({
      url: '../board/board'
    })
  },
  onLoad: function () {
    this.data.list = app.douban.find(this.data.type)
      .then(d => {
        this.setData({list:app.douban.ran(d.subjects,5), subtitle: d.title, loading: false })
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  }
})
