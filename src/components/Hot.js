import React,{ Component } from 'react'
import '../stylus/hot.styl'
class Hot extends Component {
    constructor(){
        super()
        this.state={
            upDateTime:null,
            hotsongArr:[],  //热门歌单
            songList:{}, //根据id获取的歌单
            songRow:30,      //限制条数,
            creator:{} //歌单创造者
        }
    }
    componentDidMount(){
        // 动态url
        let url = this.api.hotsong
        if(this.props.match.params.id){
            url = this.api.detail + this.props.match.params.id
        }
        console.log(url);
        this.$http.get(url).then(res=>{
            console.log(res);
            this.setState({
                upDateTime:res.data.playlist.updateTime,
                songList:res.data.playlist,
                creator:res.data.playlist.creator
            })
        })
    }
    filterTime(){
        var date = new Date(this.state.upDateTime);
        var m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'+ (date.getMonth() + 1)
        var d = date.getDate() > 9 ? date.getDate() : date.getDate() + 1
        return `${m}月${d}日`
    }
    lookMore(e){
        if(this.state.songList.tracks.length > this.state.songRow){
            this.state.songRow += 10
            this.setState({})
        }else{
            e.target.innerText = '到底了'
        }
    }
    render() {
        let {songList,creator} = this.state
        let dynamic
        if(this.props.match.params.id){
            {/* 详情页头部 */}  
            dynamic = (<div>
            <div className="detail-top">
                <div className="blur-bg" style={{'backgroundImage':'url('+ songList.coverImgUrl +')'}}></div>
                <div className="imgbox">
                    <img src={songList.coverImgUrl} alt=""/>
                    <div className="name">
                        <span>{songList.name}</span>
                        <div className='author'>
                            <img src={creator.avatarUrl} className='head' />
                            <span className='author_name'>{creator.nickname}</span>
                        </div>
                    </div>
                </div>       
            </div>
            <div className='sl_desc'>
                <ul className='tags_box'>
                    标签:&emsp;
                {   songList.tags ? 
                    songList.tags.map((i,ind)=>{
                        return(<li className='tags' key={ind}>{i}</li>)
                    })
                    : ''
                }
                </ul>
                 <div className='desc_text'>简介:&emsp;{songList.description}</div>
            </div>
            <div className='list_tit'>歌曲列表</div>
            </div>)
        }else{
            {/* 热歌榜头部 */} 
            dynamic = (<div className="hot-bg">
                <div className="hot-tit">
                    <i className="cloud-music">云音乐</i>
                    <div className="hot-pic"></div>
                    <p className="update-time">更新时间：{this.filterTime()}</p>
                </div>        
            </div>)
        }
        return (
        <div className="hot">
            {
                dynamic
            }
            <div className="new_ul">
                {   songList.tracks ? 
                    songList.tracks.map((i,ind)=>{
                        return(
                            <a href={'/play/'+i.id}  className="new_li" key={ind}>
                                {this.props.match.params.id ? <span className="ls_order">{ind+1}</span>
                                 : <span className="order">{ind<9 ? '0'+(ind+1) : ind+1 }</span>
                                }
                                <div className="left">
                                    <p className="ns_name">
                                        {i.name}
                                        {i.alia.length>0 ? <span className='alia'>({i.alia[0]})</span> : ''}
                                    </p>
                                    <p className="ns_mes" >
                                        <i className="sq_logo"></i>
                                        {
                                            i.ar.map((n,index)=>{
                                                return(
                                                    <span  key={index}>
                                                        {n.name}
                                                        { i.ar.length>0 && index<i.ar.length-1 ? <span>/</span> : ''}
                                                    </span> 
                                                )
                                            })
                                        }{' - ' + i.al.name}
                                    </p>
                                </div>
                                <div className="right">
                                    <i className="play_btn iconfont">&#xe694;</i>
                                </div>   
                            </a>
                        )
                    }).slice(0,this.state.songRow) : ''
                }
                <div className='lookmore' onClick={this.lookMore.bind(this)}>点击查看更多</div>
            </div>       
        </div>
       )
    }
}

export default Hot