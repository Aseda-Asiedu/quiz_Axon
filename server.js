const express = require('express');
const app = express();
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Quiz API is running...');
});

app.use('/api', quizRoutes);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
