const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route fix
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form
app.post('/contact', (req, res) => {
    let data = [];

    if (fs.existsSync('contacts.json')) {
        data = JSON.parse(fs.readFileSync('contacts.json'));
    }

    data.push(req.body);
    fs.writeFileSync('contacts.json', JSON.stringify(data, null, 2));

    res.send("Submitted successfully!");
});

app.listen(PORT, () => console.log("Server running"));