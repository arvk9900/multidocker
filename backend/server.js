const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (using service name "mongo")
mongoose.connect('mongodb://mongo:27017/testdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Simple schema
const User = mongoose.model('User', { name: String });

// API route
app.get('/api', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.send('User added');
});

app.listen(5000, () => console.log('Server running on port 5000'));
