class Wss {
    constructor (kafka) {   
    
    var io = require('socket.io').listen(3004);

    /** Each user that connects gets their own
     *  "room" to subscribe to live events
     */
    io.sockets.on('connection',
        function (socket) {
        socket.on('join', 
            function (data) {
                console.log('new session started: ', data.session_id)
                socket.join(data.session_id);
        });

        /** This event comes from the client.
         *  This could be a GraphQL resolver,
         *  an Express http request, or any but
         *  what is important is that an activity is spawned
         *  by the user event and Kafka takes way
         */
        socket.on(
            'resolver:generate_magic_number', 
            function (session) {
                console.log('resolver data: ', session)

                const event = require('./events/magic_number.json')
                
                /** Tie session meta data to event */
                event.data.session = session

                /** Some domain logic */
                event.data.magic_number = Math.random()

                /** Produce Kafka live sessions topic event */
                kafka.produce(
                    'live_sessions:magic_number_generated',
                    event,
                )
            }
        );
    });

    /**
     * Kafka Event Consumption
     * This will:
     * - update the read model (UI) including but not limited to only web clients
     * - update the magic number stream
     */
    async function onMagicNumber(message) {
        console.log('Kafka message consumed: ', message)
        io.sockets.in(
            message.data.session.id,
        ).emit(
            "live_sessions:magic_number_generated", message.data,
        );
    }

    kafka.consume('live_sessions:magic_number_generated', onMagicNumber)

    }
}

module.exports = Wss
