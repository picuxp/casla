var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var canchaSchema = new Schema({  
  nombre:             {type:String},
  torneo:         {type: Schema.Types.ObjectId, ref: 'Torneo'}
  //imagen             {data: Buffer, contentType: String}
});

module.exports = mongoose.model('Cancha', canchaSchema);
