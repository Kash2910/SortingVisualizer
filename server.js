const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sorting Visualizer Backend');
});

app.post('/sort', (req, res) => {
  const { array } = req.body;
  const sortedArray = array.sort((a, b) => a - b);
  res.json({ sortedArray });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
