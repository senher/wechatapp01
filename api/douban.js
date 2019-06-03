const app = getApp()

const apiUrl= 'https://douban.uieee.com/v2/movie/'

const fetch = function (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}

function fetchApi (type, params) {
  return fetch(apiUrl, type, params)
}

function find (type, page = 1, count = 20) {
  const params = { start: (page - 1) * count, count: count}
  return fetchApi(type, Object.assign(params))
    .then(res => res.data)
}
function findOne (id) {
  return fetchApi('subject/' + id)
    .then(res => res.data)
}

//取数组中count不重复数据
function ran(arr,count=3){
  var leng = arr.length
    const newArr = []//返回的count条新数据
    const numArr = []//随机数存放数组
    while(numArr.length<count){//生成num个随机数
      const index = Math.floor(Math.random()*leng)
      if (numArr.indexOf(index)!==-1) {
        continue
      }else{
        numArr.push(index)
      } 
    }
    for (var i=0;i<numArr.length;i++) {
      newArr.push(arr[numArr[i]])//取随机数下标的数据放入新数组中
    }
    return newArr
}

module.exports = {
   find:find,
   findOne:findOne,
   ran:ran
}

