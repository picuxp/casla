// app/models/user.js
// load the things we need
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs'),
    mongoosePaginate = require('mongoose-paginate');

// define the schema for our user model
var userSchema = new Schema({  
  email:        { type: String},
  password:     { type: String},
  equipo:     	{ type: String},
  role:         { type: String, enum:['SUPER_ADMIN','ADMIN','DELEGADO', 'PLANILLERO']}
});
userSchema.plugin(mongoosePaginate);

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);