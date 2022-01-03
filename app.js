const express = require('express')
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routers');

const app = express()
const PORT = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB')
});

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Backend Ready http://localhost:${PORT}`)
})