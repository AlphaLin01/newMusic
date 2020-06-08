import React,{ Component } from 'react'
import '../stylus/play.styl'
class Play extends Component {
   constructor(props){
      super(props)
      this.state={
         idx : this.props.match.params.id,
         songUrl : {},
         songMsg : {},
         lyric : [], //原版歌词
         tlyric: [], //翻译歌词
         playFlag : true, //播放状态
         lineNum:0,
         offsetTop:0 //歌词滚动的高度
      }
   }

   // 刷新和离开页面时停止播放器
   componentWillMount(){
      window.addEventListener('beforeunload',this.beforeunload())
   }
   componentWillUnmount(){
      window.addEventListener('beforeunload',this.beforeunload())
   }
   beforeunload (e){
      console.log(111);
      // this.setState({playFlag:false}) 
   }

   // 获取连接、信息、歌词
   getUrl(){
      return this.$http.get(this.api.songUrl+this.state.idx)
   }
   getSongMsg(){
      return this.$http.get(this.api.songMsg+this.state.idx)
   }
   getLyric(){
      return this.$http.get(this.api.lyric+this.state.idx)
   }

   dealLrc(lyrStr){
      var lyrArr = []
      if(lyrStr){
         lyrStr.map((i,ind)=>{
            if(i!==''){
               var t = i.substring(i.indexOf('[')+1,i.indexOf(']')).split(':') 
               // console.log(t);
               var time = (t[0]*60+parseFloat(t[1])).toFixed(3)
               // console.log(time,ind);
               var text = i.substring(i.indexOf(']')+1)
               // console.log(text,ind);
               lyrArr.push({time,text})  
            } 
         })
      }
      return lyrArr
   }

   //请求阶段 
   componentDidMount(){
      this.$http.all([this.getUrl(),this.getSongMsg(),this.getLyric()]).
      then(this.$http.spread((url,msg,lyric)=>{
            
            var lyr = lyric.data.lrc.lyric
            var tlyr = lyric.data.tlyric.lyric
            var lyrStr = lyr.split('\n')
            var lyrArr = this.dealLrc(lyrStr)
            
            if(tlyr){
               var tlyrStr = tlyr.split('\n')
               var tlyrArr = this.dealLrc(tlyrStr) 
            }

            // console.log(url);
            // console.log(this.dealLrc(tlyrStr))
            // console.log(this.dealLrc(lyrStr))

            this.setState({
               songUrl : url.data.data[0],
               songMsg : msg.data.songs[0],
               lyric : lyrArr,
               tlyric : tlyrArr
            })   

            console.log(this.state.songUrl);
            this.$audio.src=this.state.songUrl.url
      }))
      console.log(this.$audio);
   }

   // 页面ui控制播放开关
   toggle(){
      if(this.state.playFlag==true){//暂停状态
         this.refs.myAudio.pause()
         this.refs.record.className = 'record rotate rotate-pause'
         this.refs.trigger.className = 'trigger'
         this.refs.play_btn.style.opacity = 1
         this.state.playFlag=!this.state.playFlag
      }else{//播放状态
         this.refs.myAudio.play()
         this.refs.record.className = 'record rotate'
         this.refs.trigger.className = 'trigger rotate_tr'
         this.refs.play_btn.style.opacity = 0
         this.state.playFlag=!this.state.playFlag
      }
      // console.log(this.state.playFlag);
   }

   // 播放器的开关事件 
   onPlay(){
      // this.toggle()
      this.refs.record.className = 'record rotate'
      this.refs.trigger.className = 'trigger rotate_tr'
      this.refs.play_btn.style.opacity = 0
      this.state.playFlag=true
   }
   onPause(){
      // this.toggle()
      this.refs.record.className = 'record rotate rotate-pause'
      this.refs.trigger.className = 'trigger'
      this.refs.play_btn.style.opacity = 1
      this.state.playFlag=false
   }
   // 播放结束
   ended(){
      // this.state.offsetTop = 0
      // this.state.lineNum = 0
      // this.setState({})   两种方法都是异步
      this.setState((state)=>{
         state.offsetTop =0 
         state.lineNum =0 
      })
      this.refs.ul.style.transform = 'translateY('+0+'px)'
   }

   // 播放器时间更新
   timeUpdate(e){
      // console.log(e.target.currentTime);  
      var currentTime = e.target.currentTime
      var lyr = this.state.lyric
      var num = this.state.lineNum
      if(num===lyr.length) return
      // if(lyr[0].text==''){ num+1 }
      if(lyr[num].time <= currentTime){
         num++ 
         this.highLight()
         this.setState({lineNum:num})
      } 
      // console.log(currentTime); 
      // console.log(num); 
      // console.log(lyr[num].time);
   }

   // 歌词高亮
   highLight(){
      var lrcBox = this.refs.lrcBox
      var lis = this.refs.ul.children
      var num = this.state.lineNum
      // console.log(num);
      if(num>0){
         lis[num-1].className = ''
      } 
      if(num>=2){
         // console.log(lis[num-2]);
         // lis[num-2].style.display = 'none'
         // lrcBox.scrollTop += lis[num-2].offsetHeight
         this.state.offsetTop += lis[num-2].offsetHeight
         this.refs.ul.style.transform = 'translateY(-'+this.state.offsetTop+'px)'
         this.setState({})
      }
      console.log(lis[num].offsetHeight);
      lis[num].className = 'high-light'
   }

   // goBack
   goBack(){
      this.props.history.goBack()
   }


   render() {
      let {idx,songUrl,songMsg,lyric,tlyric,playFlag} = this.state
      // console.log(songUrl,songMsg,lyric,tlyric,playFlag);
      let lrc = (
         <>
            {
               lyric.map((i,ind)=>{
                  return(
                  <li ref='lis' key={ind}>{i.text}</li>
                  )
               })
            }
         </>
      )
      // console.log(this.refs)
      
      return (
      <div className="play">
         <i className='iconfont back' onClick={this.goBack.bind(this)}>&#xe606;</i>
         <span className="logo">网易云音乐</span>
         <div className='trigger' ref='trigger'></div>
         <div className="play-control" onClick={()=>{this.toggle()}}>
            {/* <div className="record-trigger"></div> */}
            {/* <!-- 控制开关 --> */}
            <div className="record" ref="record" >
               <div className="song-pic">
                     {songMsg.al ? <img src={songMsg.al.picUrl} alt=""/> : ''}
               </div>
            </div>
            <i className="play-btn iconfont" ref="play_btn">&#xe637;</i>
         </div>
         <div className="lyric"></div>
         {/* <!-- 播放器 --> */}
         {/* <audio src={songUrl.url} autoPlay className="audio" ref="myAudio" controls
            onPlay={this.onPlay.bind(this)} onPause={this.onPause.bind(this)} 
            onTimeUpdate={this.timeUpdate.bind(this)} onEnded={this.ended.bind(this)}
         ></audio> */}
         <p className="music-name"><span>{songMsg.name} - </span>
         { 
            songMsg.ar ?
            songMsg.ar.map((i,ind)=>{
                  return( <span key={ind}>{i.name}</span>)
            }) : ''   
         }
         </p>
         <div className="lrc-box" ref='lrcBox'>
            <ul className="lrc-list" ref='ul'>
               { lrc }
            </ul>    
         </div>
         {songMsg.al ? <div className="bg" style={{backgroundImage:"url("+songMsg.al.picUrl+")"}}></div> : ''} 
      </div> 
      )
   }
}

export default Play