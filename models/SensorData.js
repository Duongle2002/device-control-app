const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }  // Thời gian ghi dữ liệu cảm biến
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
