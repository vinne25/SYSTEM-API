const express = require('express');
const sequelize = require('./config/config');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./swagger/swagger');
//const productRoutes = require('./routes/productRoutes')

app.use(express.json());
setupSwagger(app)

app.use('/api', userRoutes);
app.use('/api', authRoutes);
//app.use('/api', productRoutes);

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