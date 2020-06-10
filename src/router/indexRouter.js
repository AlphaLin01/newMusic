import Hot from '../components/Hot'
import Play from '../components/Play'
import Index from '../components/Index'

export default  [
    {
        path:'/index',
        component:Index,   
    },
    {
        path:'/detail/:id',
        component:Hot,
    },
    {
        path:'/play/:id',
        component:Play
    },
    {
        path:'/*',
        redirect:'/index'
    }
]
