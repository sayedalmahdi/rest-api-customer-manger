const express = require('express')
const app = express()
const customerRoute = require('./routes/customer')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(customerRoute)

// Error Handling
app.use((req, res, next) => {
    const error = new Error('We think you are lost!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT)