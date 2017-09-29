var events = require('events')
var eventEmitter = new events.EventEmitter()

var connectHandler = function (){console.log('connect')}
eventEmitter.on('connect',connectHandler)
eventEmitter.emit('connect')

