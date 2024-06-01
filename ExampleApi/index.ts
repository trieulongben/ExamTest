
const express = require('express')
const app = express()
const port = 3000

app.post('/sign_in', (req, res) => {
  res.send({
    token:"hookey@_-@asd_"
  })
})


app.post('/sign_up', (req, res) => {
  res.send({
    token:"hookey@_-@asd_"
  })
})

app.get('/', (req, res) => {
    console.log(req)
  res.send({
    token:"hookey@_-@asd_"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})