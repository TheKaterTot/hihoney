const express = require("express")
const app = express()

app.get('/', (req, res) => {
  res.send('You did it!')
})

app.listen(4000, () => console.log("Now running on port 4000"))
