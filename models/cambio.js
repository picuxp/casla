var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var cambioSchema = new Schema({  
  entrante:             {type: Schema.Types.ObjectId, ref: 'Jugador'},
  saliente:             {type: Schema.Types.ObjectId, ref: 'Jugador'},
  equipo:             {type: Schema.Types.ObjectId, ref: 'Equipo'}
  //minuto??
});

module.exports = mongoose.model('Cambio', cambioSchema);