const app = getApp()

Page({
	data:{
		list: [],
    subtitle: '加载中...',
    type: 'in_theaters',
		loading:true,
    hasMore: true,
    page: 1,
    size: 10
	},
  loadMore(){
    if (!this.data.hasMore) return
    this.setData({ subtitle: '加载中...', loading: true })
    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          console.log(d);
          this.setData({ subtitle: d.title, list: this.data.list.concat(d.subjects), loading: false })
        } else {
          console.log(d);
          this.setData({ subtitle: d.title, hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })

  },
	onLoad(params){
	
  // 	console.log(params.type)
		// console.log(params.name)
		// const apoUrl= 'https://douban.uieee.com/v2/movie/'+ params.type +'?&count=20'
		// const _this = this
		// wx.request({
  //     url: apoUrl, // 仅为示例，并非真实的接口地址
  //     data: {
        
  //     },
  //     header: {
  //       'content-type': 'application/jsonp' // 默认值
  //     },
  //     success(res) {
  //       _this.setData({list:res.data.subjects,title:res.data.title,loading:false})
  //     }
  //   })
  
  this.data.title = params.title || this.data.title

  // 类型： in_theaters  coming_soon  us_box
  this.data.type = params.type || this.data.type

  this.loadMore()
      
		
	},
  onReachBottom () {
    this.loadMore()
  }

})