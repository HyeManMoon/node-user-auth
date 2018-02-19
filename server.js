const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.get('/',(req, res) => {
    res.send('<h1>App is working!</h1>');
});

app.listen(PORT, () => {
    console.log('Server is starting up on PORT: ', PORT);
})