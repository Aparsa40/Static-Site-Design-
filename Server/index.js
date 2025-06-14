const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// اتصال به MongoDB Atlas
mongoose.connect('mongodb+srv://<parssto>:<P@rs@1984>@cluster0.abcde.mongodb.net/parssstore?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected!'))
.catch(err => console.error('❌ Connection error:', err));

// مدل کاربر
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));

// روت ثبت‌نام
app.post('/api/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.json({ message: '✅ ثبت نام با موفقیت انجام شد' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
