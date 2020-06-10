import React,{Component} from 'react';
import './App.styl';
import './stylus/index.styl'
import indexRouter from './router/indexRouter'
import MyRouter from './router/index'

function App() {
  
  return (
    <div className="App">
          <MyRouter routes={indexRouter}></MyRouter>
    </div>
  );
}

export default App;
