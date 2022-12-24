import express from 'express'
import connect from './db.js'
// import notes from './models/Notes.js'
import auth from './routes/Auth.js'
import note from './routes/Note.js'
import cors from 'cors'
// varibles
const app = express()
app.use(express.json()) //imp
app.use(cors())
const port = 55000

// connect to mongoDB
connect();

// Available Routes
app.use('/api/auth',auth)
app.use('/api/notes',note)


// server listening
app.listen(port,()=>{
    console.log(`Listening server at http://localhost:${port}`);
})