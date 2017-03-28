var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var partidoSchema = new Schema({  
  equipo1:             {type: Schema.Types.ObjectId, ref: 'Equipo'},
  equipo2:             {type: Schema.Types.ObjectId, ref: 'Equipo'},
  fecha_numero:               {type:Number},
  fecha:{ type: Date, default: Date.now },
  marcador_equipo_1:   {type:Number},
  marcador_equipo_2:   {type:Number},
  estado:   { type: String, enum:['N.E.','FIN','SUSP', 'POST']},
  division:[
      {type: Schema.Types.ObjectId, ref: 'Division'}
  ],
  amonestados:[
      {type: Schema.Types.ObjectId, ref: 'Jugador'}
  ],
  expulsados:[
      {type: Schema.Types.ObjectId, ref: 'Jugador'}
  ],
  goles:[
      {type: Schema.Types.ObjectId, ref: 'Jugador'} //hace falta el minuto del gol? habria que crear clase gol con goleador, minuto
  ],
  cambios:[
      {type: Schema.Types.ObjectId, ref: 'Cambio'}
  ]
});

module.exports = mongoose.model('Partido', partidoSchema);