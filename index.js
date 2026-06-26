const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 配置Multer：仅在内存中存储文件（不写入磁盘）
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 处理文件上传的POST接口
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // 验证是否上传了文件
  if (!req.file) {
    return res.json({ error: '请选择要上传的文件' });
  }

  // 返回文件元数据（name/type/size）
  res.json({
    name: req.file.originalname,  // 文件名
    type: req.file.mimetype,      // 文件类型
    size: req.file.size           // 文件大小（字节）
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});