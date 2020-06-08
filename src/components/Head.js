import React,{ Component } from 'react'
import { Route,NavLink } from 'react-router-dom'
import '../stylus/Head.styl'
class XXX extends Component {
    render() {
       return (
          <div className='head'>
            <div className="top">
                <div className="top_bg">
                    <span className='tit'>优音乐</span>
                </div>
                <div className="select">
                    <div className='col'><NavLink to="/index" exact>推荐音乐</NavLink></div>
                    <div className='col'><NavLink to="/index/hot">热歌榜</NavLink></div>
                    <div className='col'><NavLink to="/index/search">搜索</NavLink></div>
                </div>   
            </div>
          </div>
       )
    }
}

export default XXX