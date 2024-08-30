const express = require('express');
const sequelize = require('./config/config');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', authRoutes);

sequelize.sync()
        .then(
            () => {
                console.log('Database connected and synced')
        })
        .catch(
            (error)=>{
                console.error('Unable to connect to the database: ', error);
            }
        );

module.exports = app;