
var base = 'http://127.0.0.1:4000'

// 首页轮播图
var banner = base+'/banner?type=1'

// 推荐歌单
var personalized = base + '/personalized?limit=6'

//推荐新歌
var newsong = base + '/personalized/newsong' 

//云音乐热歌榜
var hotsong = base + '/top/list?idx=1'

// 热搜词
var hotKey = base + '/search/hot'

//搜索
var search = base + '/search?keywords='

// 搜索建议
var suggest = base + '/search/suggest?keywords='

//歌曲详情
var detail = base + '/playlist/detail?id='

//歌曲url 
var songUrl = base + '/song/url?id='

// 单个歌曲信息 id
var songMsg = base + '/song/detail?ids='

// 歌词获取
var lyric = base + '/lyric?id='


export default {
    banner,
    personalized,
    newsong,
    hotsong,
    search,
    detail,
    songUrl,
    hotKey,
    suggest,
    songMsg,
    lyric
}

