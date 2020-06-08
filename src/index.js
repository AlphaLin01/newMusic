import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './commom/css/reset.css';
import './index.css'
import './css/font_1856591_hrxj791hne4/iconfont.css'
import './commom/js/rem'
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'

import api from './api'
import axios from 'axios'
import store from './store/store'
Component.prototype.api = api
Component.prototype.$http = axios

let glAduio = document.getElementById('glAudio')
Component.prototype.$audio = glAduio
// console.log(document.getElementById('glAudio'));
Component.prototype.$store = store

ReactDOM.render(
    <Router>
      <App/>
    </Router>,
  document.getElementById('root')
);

