const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Explicitly serve index.html when accessing root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'nodejstest.html'));
});

// API endpoint to read the file and send its contents
app.get('/read-file', (req, res) => {
    const filePath = path.join(__dirname, 'hello.txt');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }
        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
