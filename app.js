const express = require('express')
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routers');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express()
const PORT = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
        console.log('Database not Connected')
    }
    else console.log('Connected to MongoDB')
});

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Backend Ready http://localhost:${PORT}`)
})