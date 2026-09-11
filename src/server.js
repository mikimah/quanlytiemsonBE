const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taikhoanRoute = require('./routes/taikhoanRoute');
const cuahangRoute =  require('./routes/cuahangRoute');
const danhmucRoute = require('./routes/danhmucRoute');
const sanphamRoute = require('./routes/sanphamRoute');
const lichsuthaydoiRoute = require('./routes/lichsuthaydoiRoute');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend đang chạy bình thường' });
});

app.use('/api/taikhoan', taikhoanRoute);
app.use('/api/cuahang', cuahangRoute);
app.use('/api/danhmuc', danhmucRoute);
app.use('/api/sanpham', sanphamRoute);
app.use('/api/lichsuthaydoi', lichsuthaydoiRoute);

app.use(notFoundHandler);
app.use(errorHandler);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server chạy tại: http://localhost:${PORT}`);
});