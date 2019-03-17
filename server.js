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
  socket.on('daisyClick', () => {
    client.writeMeasurement('PlayerActions', [
      {
        tags: { type: 'daisyClick' },
        fields: { daisyClick: 1 }
      }
    ])
  })
  socket.on('hiveClick', () => {
    client.writeMeasurement('PlayerActions', [
      {
        tags: { type: 'hiveClick' },
        fields: { hiveClick: 1 }
      }
    ])
  })
  socket.on('gather', () => {
    client.writeMeasurement('PlayerActions', [
      {
        tags: { type: 'gather' },
        fields: { gather: 1 }
      }
    ])
  })
  socket.on('bumped', () => {
    client.writeMeasurement('GameMechanics', [
      {
        tags: { type: 'bump' },
        fields: { bumped: 1 }
      }
    ])
  })
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
