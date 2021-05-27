const { EventEmitter } = require('events')        
const events = new EventEmitter()

class Kafka {
    constructor(){
        events.addListener.bind(this)
        events.emit.bind(this) 
        console.log('Kafka Init')
    }
    async consume(event /** topic:key */, cb) {
        events.addListener(
            event,
            cb,
        )
    }
    async produce(event, data) {
        events.emit(event, data)
    }
}

module.exports = Kafka