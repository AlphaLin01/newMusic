import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import '../stylus/recommend.styl'
import Swiper from './Swiper'
class Rec extends Component {
    constructor(){
        super()
        this.state={
            recommArr:[],
            newsongArr:[]
        }
    }
    componentDidMount(){
        // console.log(this.$http);
        this.$http.all([this.getRec(),this.getNewsong()])
        .then(this.$http.spread((rec,newsong)=>{
            this.setState({
                recommArr:rec.data.result,
                newsongArr:newsong.data.result
            })
        }))
    }
    getRec(){
        return this.$http.get(this.api.personalized)
    }
    getNewsong(){
        return this.$http.get(this.api.newsong)
    }
    render() {
       return (
          <div className='rec'>
            <Swiper/>
            <h2 className="title">推荐歌单</h2>
            <div className="tj_ul">
                {
                    this.state.recommArr.map((i,ind)=>{
                        return(
                        <Link to={"/detail/"+i.id} className="tj_li"  key={ind}>
                            <img src={i.picUrl}></img>
                            <span className="name">{i.name}</span>
                        </Link>
                        )
                    })
                }
            </div>
            <h2 className="title">最新音乐</h2>
            <div className="new_ul">
                {
                    this.state.newsongArr.map((i,ind)=>{
                        return(
                            <Link to={'/play/'+i.id} className="new_li" key={ind}>
                                {/* <span className="order">{ind+1}</span>  */}
                                <div className="left">
                                    <p className="ns_name">
                                        {i.name}
                                        <span >
                                            {i.song.alias[0]}
                                        </span> 
                                    </p>
                                    <p className="ns_mes">
                                        <i className="sq_logo"></i>
                                        {
                                            i.song.artists.map((n,index)=>{
                                              return(
                                                <span  key={index}>
                                                    {n.name}
                                                    { i.song.artists.length>0 && index < i.song.artists.length-1  ?  <span>/</span> : '' }
                                                </span> 
                                              )
                                            })
                                            
                                        }
                                        -{i.song.album.name}
                                    </p>
                                </div>
                                <div className="right">
                                    <i className="play_btn iconfont">&#xe694;</i>
                                </div>   
                            </Link>
                        )
                    })
                }
            </div>
            </div>
       )
    }
}

export default Rec