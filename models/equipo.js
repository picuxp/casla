var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var equipoSchema = new Schema({  
  logo: 				{ data: Buffer, contentType: String},
  nombre: 				{ type: String},
  division:     		{type: Schema.Types.ObjectId, ref: 'Division'},
  jugadores: 		[
      					{type: Schema.Types.ObjectId, ref: 'Jugador'}
  ],
  partidos: [
      {type: Schema.Types.ObjectId, ref: 'Partido'}
  ],
  delegado: {type: Schema.Types.ObjectId, ref: 'User'},
  capitan: {type: Schema.Types.ObjectId, ref: 'Jugador'},
  subcapitan: {type: Schema.Types.ObjectId, ref: 'Jugador'}
});

module.exports = mongoose.model('Equipo', equipoSchema);
