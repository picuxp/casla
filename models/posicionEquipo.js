var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var posicionEquipoSchema = new Schema({  
  equipo:               {type: Schema.Types.ObjectId, ref: 'Equipo'},
  puntos: {type:Number},
  ganados: {type: Number},
  empatados: {type:Number},
  perdidos: {type:Number},
  jugados: {type:Number},
  golesFavor: {type:Number},
  golesContra: {type:Number}
});

module.exports = mongoose.model('PosicionEquipo', posicionEquipoSchema);
