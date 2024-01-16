const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({

    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        unique : true,
    },
    password:{
        type: mongoose.Schema.Types.Mixed,
    },
    date:{
        type:Date,
        default: Date.now
    },
  });

  const User = mongoose.model('User', UserSchema)
//   User.createIndexes()   // it's use when we want apply to all of the index specifications included in the key pattern array. 
  module.exports = User;