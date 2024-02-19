const express = require("express")
const path = require('path')

const app = express()
const port = 8056;


app.use(express.json())



app.use(express.static(path.join(__dirname, '/templates')))

app.get('/', (req, res) => {
    console.log('here')
    res.sendFile(path.join(__dirname,'./templates/app.html'))
})

app.listen(port, () => {
    console.log("running on port 8056 localhost:8056")
})