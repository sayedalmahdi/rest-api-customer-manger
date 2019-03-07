const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://rest-api-test-user:TRRbiu8d7j4w1QZj@rest-api-test-rnvxo.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
)

const CustomerSchema = new mongoose.Schema({
    first_name: {type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
})

module.exports = mongoose.model('Customer', CustomerSchema)