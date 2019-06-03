
var app = getApp();
Page({
  data: {
    view:{},
    loading:true
  },
  onLoad: function (params) {
    
    app.douban.findOne(params.id)
      .then(d => {
        this.setData({ title: d.title, view: d, loading: false })
        wx.setNavigationBarTitle({ title: d.title + ' « 电影 « 豆瓣' })
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', view: {}, loading: false })
        console.error(e)
      })
    

  }
})
