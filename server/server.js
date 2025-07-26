


const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.listen(4903, () => {
  console.log('Server running on port 4903');
});

