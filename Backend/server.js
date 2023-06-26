const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const {connection} = require('./config/db')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));  

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });


app.listen(process.env.PORT, () => console.log('app is running'));

