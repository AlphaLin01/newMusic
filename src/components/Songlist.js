import React,{ Component } from 'react'
class Songlist extends Component {
    render() {
        console.log(this.props);
       return (
          <>
            {
                <div className="new_ul">
                {
                    this.props.songArr.map((i,ind)=>{
                        return(
                            <a href={'/detail/'+i.id}  className="new_li" key={ind}>
                                <span className="order">{ind<9 ? '0'+(ind+1) : ind+1 }</span>
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
                    }).slice(0,30)
                }
            </div>
            }
          </>
       )
    }
}

export default Songlist