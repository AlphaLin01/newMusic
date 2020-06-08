import React from 'react'
import {EventEmitter} from 'events'

const bus = new EventEmitter()
React.Component.prototype.$bus = bus

export default bus

