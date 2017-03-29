var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var torneoSchema = new Schema({  
  nombre: 				{ type: String},
  jugadores_por_equipo: { type: Number},
  activo: 				{type: Boolean},
  equipos: [
      {type: Schema.Types.ObjectId, ref: 'Equipo'}
  ],
  canchas: [
      {type: Schema.Types.ObjectId, ref: 'Cancha'}
  ],
  divisiones: [
      {type: Schema.Types.ObjectId, ref: 'Division'}
  ],
  partidos: [
      {type: Schema.Types.ObjectId, ref: 'Partido'}
  ]
});

module.exports = mongoose.model('Torneo', torneoSchema);