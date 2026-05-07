const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  scout: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  stripeChargeId: { type: String, required: true }, 
  amount: { type: Number, required: true }, 
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);