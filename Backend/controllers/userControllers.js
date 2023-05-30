const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});

// @desc Register a new user in db
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields")
    }

    // check if user exists
    const existingUser = await User.findOne({email})
    if(existingUser){
        res.status(400);
        throw new Error('User already exists')
    }

    //hash password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    
    // upon registration of user
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }

})