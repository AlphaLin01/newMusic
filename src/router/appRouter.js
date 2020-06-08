
import Index from '../components/Index'
import Recommend from '../components/Recommend'
import Hot from '../components/Hot'
import Search from '../components/Search'


// console.log(Index,'index');
// console.log(Home,'Home');

export default [
    {
        path:'/index',
        component:Recommend,
        exact:true
     },
     {
        path:'/index/hot',
        component:Hot,
     },
     {
        path:'/index/search',
        component:Search,
     },
]