const connectMongo = require("./db");
const express = require('express')
var cors = require('cors')
const app = express()

connectMongo();
app.use(cors())

const port = 'https://mynotebook-backend-1-gegr.onrender.com'

app.use(express.json()) // Middleware

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`MyNoteBook app listening on port http://localhost: ${port}`)
})