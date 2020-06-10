import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import '../stylus/search.styl'

class Search extends Component {
    constructor(){
        super()
        this.state={
            hotKey:[],
            myKey:'',
            // clearShow:false,
            result:null,
            // hotKeyShow:true,
            flag:true, //清除按钮、热门搜索词、搜索结果的显示控制
            suggestBlur:false, //搜索建议的显示
            suggest:{},
            historySearch:[] //历史搜索
        }
    }
    componentWillMount(){
        if(this.state.isReload){
            this.location.reload()
        }
    }
    componentDidMount(){
        // 热搜词
        this.$http.get(this.api.hotKey).
        then(res=>{
            // console.log(res);
            this.setState({hotKey:res.data.result.hots})
        })
    }

    // 关键词请求
    searchAxios(key){
        this.$http.get(this.api.search+key).
        then(res=>{
            console.log(res);
            this.state.result = res.data.result.songs
            this.setState({})
        })
    }

    //suggest建议词请求
    getSuggest(key){
        this.$http.get(this.api.suggest+key+'&type=mobile').
        then(res=>{
            console.log(res.data);
            this.state.suggest = res.data.result
            this.setState({})
        })
    } 

    onInputBlur(){

    }
    // 输入框搜索
    enterSearch(e){
        if(e.keyCode===13){
            if(e.target.value!==''){ //输入框不为空时
                this.searchAxios(e.target.value)
                this.state.historySearch.push(e.target.value)
                e.target.blur() 
            }else{ //输入框空时，enter事件 
                e.target.blur()
            }    
        }
        this.setState({suggestBlur:false})
    }
    //点击热搜词搜索
    clickSearch(e){
        // console.log(e.target.innerText);
        // 将点击获取的值传给input
        var key = this.refs.search_inp.value = e.target.innerText
        this.state.flag = false //联动状态
        this.state.suggestBlur = false 
        this.searchAxios(key)  //发起请求
        this.state.historySearch.push(key)
        this.setState({})  //更新
    } 

    // 获取焦点时
    inputFocus(e){
        if(e.target.value!==''){
            this.setState({
                suggestBlur:true,
                result:null,
            })
        }
    }

    // 清空输入框
    clearInput(){
        this.refs.search_inp.value = ''
        this.setState({flag:true,result:null,suggestBlur:false})
    }

    //输入框改变时 建议显示 热搜消失
    inputChange(e){
        let inpText = e.target.value
        if(inpText!==''){
                console.log(inpText);
                this.getSuggest(inpText)
                this.setState({
                    flag:false,
                    suggestBlur:true
                })
        } else{
                this.setState({
                    flag:true,
                    suggestBlur:false
                })
        }
    }
    render() {
        let {suggestBlur,suggest,historySearch,flag} = this.state
        let hisSearch = (
            <div className='his_box'>
                历史搜索:
                <ul className='his_ul'>
                    {
                        historySearch.map((i,ind)=>{
                            return(
                                <li className='his_li' key={ind}>{i}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
        return ( 
          <div className='search'>
              {/* 搜索框 */}
            <div className='search_box'> 
                <div className='search-inp'>
                <i className='icon iconfont'>&#xe612;</i> 
                <input type='text' onBlur={this.onInputBlur.bind(this)} onFocus={this.inputFocus.bind(this)}   
                    onChange={this.inputChange.bind(this)} onKeyDown={this.enterSearch.bind(this)}
                    ref='search_inp' placeholder='搜索歌曲、歌手、专辑' ></input>  
                    {
                        !this.state.flag ? <i className='clear iconfont' onClick={this.clearInput.bind(this)}>&#xe62f;</i> : ''
                    }
                </div>
            </div> 
            <div className='history'>
                {}
            </div>
            {/* 热搜词 */}
            {this.state.flag ?  
                <div className='hotkey'>
                    <p className='hot_word'>&emsp;热门搜索</p>
                    <ul className='keylist'>
                    {
                        this.state.hotKey.map((i,ind)=>{
                        return(
                            <li key={ind} className='keybtn' onClick={this.clickSearch.bind(this)} >
                                {i.first}
                            </li>
                        )
                        }) 
                    }
                    </ul>
                </div> : ''
            }
            {/* 历史搜索 */}
            { flag ? hisSearch : ''}
            {/* 推荐词渲染 */}  
            {
                suggestBlur ? 
                (<div className='suggest'>
                   <p className='search_word'>搜索:"{this.refs.search_inp.value}"</p>
                   <ul className='sug_ul'>
                       {   suggest.allMatch ? 
                           suggest.allMatch.map((i,ind)=>{
                            return(<li className='sug_li' key={ind}> 
                                    <i className='iconfont icon'>&#xe612;</i>
                                    <span className='sug_key' onClick={this.clickSearch.bind(this)}>{i.keyword}</span>
                                  </li>
                                )
                           }) : ''
                       }
                   </ul>
                </div>) : ''   
            }

            {
            // 搜索结果列表
            <div className="new_ul">
                {
                    this.state.result ? 
                    this.state.result.map((i,ind)=>{
                        return(
                            <Link to={'/play/'+i.id}  className="new_li" key={ind}>
                                {/* <span className="order">{ind<9 ? '0'+(ind+1) : ind+1 }</span> */}
                                <div className="left">
                                    <p className="ns_name">
                                        {i.name}
                                        {i.artists.alias ? <span className='alia'>({i.artists.alias})</span> : ''}
                                    </p>
                                    <p className="ns_mes" >
                                        <i className="sq_logo"></i>
                                        {
                                            i.artists.map((n,index)=>{
                                                return(
                                                    <span  key={index}>
                                                       {n.name}
                                                       { i.artists.length>1 && index!=(i.artists.length-1) ? <span>/</span> : ''}
                                                    </span> 
                                                )
                                            })
                                        }{' - ' + i.album.name}
                                    </p>
                                </div>
                                <div className="right">
                                    <i className="play_btn iconfont">&#xe694;</i>
                                </div>   
                            </Link>
                        )
                    }) : ''
                } 
                </div>
            }
          </div>
       )
    }
}

export default Search