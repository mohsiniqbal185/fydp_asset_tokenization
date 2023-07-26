const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const {connection} = require('./config/db')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));  


// USER ROUTES  
app.use('/api/user/auth', require('./routes/user/authRoutes'));
app.use('/api/user/properties', require('./routes/user/propertyRoutes'));
app.use('/api/user/token-transactions', require('./routes/user/tokenTransactionsRoutes'));
app.use('/api/user/token-request', require('./routes/user/tokenRequestRoutes'));

// ADMIN ROUTES
app.use('/api/admin/users',require('./routes/admin/adminUsersDisplayRoutes'));



app.get('/', (req, res) => {
    res.send('Server is up and running!');

  });


app.listen(process.env.PORT, () => console.log('Welcome to the server'));

