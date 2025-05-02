const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Mount the quiz routes
app.use('/api', quizRoutes);

// Basic route to test server is running
app.get('/', (req, res) => {
  res.send('Quiz API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
