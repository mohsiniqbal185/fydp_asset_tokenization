const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
dotenv.config();

const {connection} = require('./config/db')


app.use(cors({credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));  
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// USER SESSION
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// USER ROUTES  
app.use('/api/user/auth', require('./routes/user/authRoutes'));
app.use('/api/user/properties', require('./routes/user/propertyRoutes'));
app.use('/api/user/token-transactions', require('./routes/user/tokenTransactionsRoutes'));
app.use('/api/user/token-request', require('./routes/user/tokenRequestRoutes'));
app.get('/api/user/delete-session', (req, res) => {
  
  // Delete the session of this requesting user
  delete req.session.user;

  res.status(200).json({ status: "Session Deleted" });
});

// ADMIN ROUTES
app.use('/api/admin/users',require('./routes/admin/adminUsersDisplayRoutes'));
app.use('/api/admin/view_token_transactions',require('./routes/admin/viewTokenTransactionsRoutes'));




app.get('/', (req, res) => {
    res.send('Server is up and running!');

  });


app.listen(process.env.PORT, () => console.log('Welcome to the server'));

