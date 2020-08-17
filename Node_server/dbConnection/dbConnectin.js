const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/rentelApp', { useNewUrlParser: true}, (err,db) => {
    if (!err) {
        console.log("rgpv connected...");
    } else {
        console.log("error in connecting database");
    }
});