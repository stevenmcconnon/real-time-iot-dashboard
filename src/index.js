require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dataRoutes = require('./routes');

app.use(bodyParser.json());
app.use(dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
