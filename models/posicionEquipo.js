var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var posicionEquipoSchema = new Schema({
    division:               {type: Schema.Types.ObjectId, ref: 'Division'},
    equipo:               {type: Schema.Types.ObjectId, ref: 'Equipo'},
    equipoNombre:               {type: String},
    puntos: {type:Number},
    ganados: {type: Number},
    empatados: {type:Number},
    perdidos: {type:Number},
    jugados: {type:Number},
    golesFavor: {type:Number},
    golesContra: {type:Number}
});

module.exports = mongoose.model('PosicionEquipo', posicionEquipoSchema);
