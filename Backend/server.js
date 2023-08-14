const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
dotenv.config();
const multer = require("multer");
const path = require("path")

const {connection} = require('./config/db')

app.use("/images/payment_receipts", express.static(path.join(__dirname, "public/images/payment_receipts")))

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
app.use('/api/user/active-investments', require('./routes/user/portfolioRoutes'));
app.use('/api/user/upload/payment', require('./routes/user/uploadPaymentReceiptRoutes'))
app.use('/api/user/sale', require('./routes/user/tokenMarketSaleRoute'))
app.get('/api/user/delete-session', (req, res) => {
  // Delete the session of this requesting user
  delete req.session.user;
  res.status(200).json({ status: "Session Deleted" });
});

//Upload payment receipt from user portal
const storage = multer.diskStorage({
  destination: (req,file,cb)=> {
      cb(null, "public/images/payment_receipts")
  },
  filename: (req,file,cb)=> {
      cb(null, req.body.name)
      
  },
})
const upload = multer({storage})
app.post("/api/user/upload-payment-receipt", upload.single("image"), (req,res)=> {
  try{
      return res.status(200).json("file upload success")
  }catch(err){
      console.log(err)
  }
})
//Upload property images from user portal
const storage2 = multer.diskStorage({
  destination: (req,file,cb)=> {
      cb(null, "public/images/property")
  },
  filename: (req,file,cb)=> {
      cb(null, req.body.name)
      
  },
})
const uploadPropertyImage= multer({storage2})
app.post("/api/admin/upload-property-images",uploadPropertyImage.array('images'), (req,res)=> {
  try{
      return res.status(200).json("files upload success")
  }catch(err){
      console.log(err)
  }
})




// ADMIN ROUTES
app.use('/api/admin/users',require('./routes/admin/adminUsersDisplayRoutes'));
app.use('/api/admin/view_token_transactions',require('./routes/admin/viewTokenTransactionsRoutes'));
app.use('/api/admin/view_token_payments',require('./routes/admin/viewpaymentsbyAdminRoutes'));
app.use('/api/admin/manage_token_transactions',require('./routes/admin/manageTokenTransactionsByAdminRoutes'));
app.use('/api/admin/manage_properties',require('./routes/admin/adminEditandCreatePropertyRoutes'));
app.use('/api/admin/update-token-price',require('./routes/admin/adminUpdateTokenValueRoutes'));


app.get('/', (req, res) => {
    res.send('Server is up and running!');

  });


app.listen(process.env.PORT, () => console.log('Welcome to the server'));

