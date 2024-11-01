const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const Schedule = require('../models/Schedule');

// Lấy tất cả thiết bị
router.get('/all', async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

// Bật/tắt thiết bị
router.post('/toggle', async (req, res) => {
  const { deviceId } = req.body;
  const device = await Device.findById(deviceId);
  device.status = !device.status;
  await device.save();
  res.json({ success: true, status: device.status });
});

// Thêm lịch trình bật/tắt
router.post('/schedule/add', async (req, res) => {
  const { deviceId, time, action, daysOfWeek } = req.body;
  const schedule = new Schedule({ deviceId, time, action, daysOfWeek });
  await schedule.save();
  res.status(201).json({ success: true });
});
// API lấy dữ liệu cảm biến hiện tại của thiết bị
router.get('/current-sensor-data/:deviceId', async (req, res) => {
    const { deviceId } = req.params;
  
    try {
      // Tìm thiết bị theo deviceId
      const device = await Device.findById(deviceId);
  
      if (!device) {
        return res.status(404).json({ error: 'Device not found' });
      }
  
      // Trả về dữ liệu cảm biến hiện tại
      res.status(200).json({
        temperature: device.temperature,
        humidity: device.humidity,
        lastUpdated: device.lastUpdated
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching current sensor data' });
    }
  });
router.post('/update-sensor-data', async (req, res) => {
  const { deviceId, temperature, humidity } = req.body;

  try {
    // Tìm thiết bị bằng `deviceId` và cập nhật dữ liệu cảm biến
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Cập nhật dữ liệu cảm biến
    device.temperature = temperature;
    device.humidity = humidity;
    device.lastUpdated = new Date();

    await device.save();

    res.status(200).json({ success: true, message: 'Sensor data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating sensor data' });
  }
});

module.exports = router;
