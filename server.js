const Influx = require('influx')
const express = require('express')
const path = require('path')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 4000

const influxOptions = {
  database: 'hihoney'
}

const client = new Influx.InfluxDB(influxOptions)

app.use(express.static(path.join(__dirname, 'dist')))
let connections = 0

setInterval(() => {
  client.writeMeasurement('UserTracking', [
    {
      tags: { type: 'connections' },
      fields: { count: connections }
    }
  ])
}, 10000)

io.on('connection', (socket) => {
  console.log('a connection!')
  const begin = Date.now()
  connections += 1
  socket.on('disconnect', () => {
    connections -= 1
    const total = Date.now() - begin
    client.writeMeasurement('UserTracking', [
      {
        tags: { type: 'timeConnected' },
        fields: { total }
      }
    ])
  })
  socket.on('fps', (fps) => {
    client.writeMeasurement('Performance', [
      {
        tags: { type: 'fps' },
        fields: { value: fps }
      }
    ])
  })
  socket.on('loadTime', (loadTime) => {
    client.writeMeasurement('Performance', [
      {
        tags: { type: 'loadTime' },
        fields: { duration: loadTime }
      }
    ])
  })
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
