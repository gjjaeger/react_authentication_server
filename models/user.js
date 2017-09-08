const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase:true },
  password: String
});

//on Save Hook, encrypt password
// before saving a model run this function
userSchema.pre('save', function(next){
  //get access to user model
  const user = this;

  // generate a salt the run callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }

    //encrypt password using salt then run callback
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err); }
      //overwrite plain text password with encrypted password
      user.password = hash;
      //go ahead and save the model
      next();
    })
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) {return callback(err); }

    callback(null, isMatch);
  });
}


//create model class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;
