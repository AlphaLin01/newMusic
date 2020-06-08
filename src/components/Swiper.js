import React,{ Component } from 'react'
import { Carousel } from 'antd';
import '../stylus/recommend.styl'
class Swiper extends Component {
    constructor(){
        super()
        this.state={
            bannerArr:[]
        }
    }
    componentDidMount(){
        this.$http.get(this.api.banner).then(res=>{
            this.setState({bannerArr:res.data.banners})
        })
    }
    render() {
        function onChange(a, b, c) {
            // console.log(a, b, c);
        }
       return (
            <Carousel afterChange={onChange} autoplay>
              {
                  this.state.bannerArr.map((i,ind)=>{
                      return(
                        <div key={ind} className='bannerbox'>
                            <a href={i.url}>
                                <img src={i.pic}></img>
                            </a>
                        </div>
                      )
                  })
              }
               
            </Carousel>
       )
    }
}

export default Swiper