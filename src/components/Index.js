import React,{ Component } from 'react' 
import Head from './Head'
import MyRouter from '../router'
import appRouter from '../router/appRouter'
import Footer from '../components/views/footer'


class Index extends Component {
    render() {
       return (
          <div className='index'>        
            <Head/>
            <div className='section'>
               <MyRouter routes={appRouter}></MyRouter>
               {/* <Footer/> */}
            </div> 
          </div>
       )
    }
}

export default Index