const express = require("express")
const path = require('path')
const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'dist')))

io.on('connection', (socket) => {
  console.log('a connection!')
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
