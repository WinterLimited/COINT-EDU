// index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {Sequelize} from 'sequelize-typescript';

const app = express();
const sequelize = new Sequelize({
    // Here enter your database connection details
    database: 'your_database_name',
    dialect: 'postgres',
    username: 'your_username',
    password: 'your_password',
    host: 'localhost',
    models: [__dirname + '/models'], // path to your models
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/table', async (req, res) => {
    const tableData = await sequelize.models.YourModel.findAll();
    res.json(tableData);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
