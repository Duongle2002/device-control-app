const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  time: String,
  action: String,
  daysOfWeek: [Number], // 0 = Chủ nhật, 1 = Thứ hai, ...
});

module.exports = mongoose.model('Schedule', scheduleSchema);
