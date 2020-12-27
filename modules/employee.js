var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employees',{useNewUrlParser: true,useUnifiedTopology: true});

var conn= mongoose.connection;

var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour: Number,
    total: Number,

});

var employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;