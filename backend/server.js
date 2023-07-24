const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let data = [
    {id_num: 1, name: 'John', isAdmin: false},
    {id_num: 2, name: 'Jane', isAdmin: true},
];

// Update Row Endpoint
app.patch('/api/rows/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedRow = req.body;

    const index = data.findIndex((row) => row.id_num === id);
    if (index !== -1) {
        data[index] = {...data[index], ...updatedRow};
        res.json(data[index]);
    } else {
        res.status(404).json({error: 'Row not found'});
    }
});

// Get All Rows Endpoint
app.get('/api/rows', (req, res) => {
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
