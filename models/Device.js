const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: false },  // Trạng thái bật/tắt của thiết bị
  type: { type: String, required: true },     // Loại thiết bị (ví dụ: "sensor", "relay")
  pin: { type: Number, required: true },      // Chân GPIO của thiết bị trên ESP32
  
  // Ngưỡng nhiệt độ và độ ẩm (nếu có)
  thresholdTemperature: { type: Number, default: null },
  thresholdHumidity: { type: Number, default: null },
  
  // Dữ liệu cảm biến hiện tại
  temperature: { type: Number, default: null },  // Nhiệt độ hiện tại
  humidity: { type: Number, default: null },     // Độ ẩm hiện tại
  lastUpdated: { type: Date, default: Date.now } // Thời gian cập nhật dữ liệu cuối cùng từ cảm biến
});


module.exports = mongoose.model('Device', deviceSchema);
