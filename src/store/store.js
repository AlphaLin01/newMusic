import {createStore} from 'redux' 

const defaultState = {
    url:'',
    msg:{}
}

const reducers = (state=defaultState,action)=>{
    return state    
}

const store = createStore(reducers)

export default store
