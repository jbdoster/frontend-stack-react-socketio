const Kafka = require("./mocks/Kafka")
const Wss = require("./mocks/Wss")

const kafka = new Kafka()
new Wss(kafka)
