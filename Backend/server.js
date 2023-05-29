const express = require('express');
const app = express();
const {connectDB} = require('./config/db')
const cors = require('cors');
const dotenv = require('dotenv');

connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));  


app.listen(process.env.PORT, () => console.log('app is running'));