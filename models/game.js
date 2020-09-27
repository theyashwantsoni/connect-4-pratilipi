const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gameSchema = new Schema({
  // id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  winner: { type: String, required:false},
  first_move: { type:String, required:true},
  current_move: { type:String, required:false},
  created_at: {type: Date, default: null },
  board: {type: Schema.Types.Mixed, default: null},
  moves: {type: Object, default: null}
});

let game = mongoose.model('Game', gameSchema);

module.exports = game;
