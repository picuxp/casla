var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var jugadorSchema = new Schema({  
  nombre:    			    { type: String },
  apellido:     		  { type: String },
  apodo:     			    { type: String },
  fecha_de_nacimiento:{ type: Date, default: Date.now },
  dni: 					      {type:Number},
  posicion:           { type: String, enum:['ARQUERO','DEFENSOR','VOLANTE', 'DELANTERO']},
  numero: 				    {type:Number},
  email: 				      {type:String},
  equipo:             {type: Schema.Types.ObjectId, ref: 'Equipo'}
  // imagen: 				{ data: Buffer, contentType: String},
  // apto_medico:  		{},
});

module.exports = mongoose.model('Jugador', jugadorSchema);