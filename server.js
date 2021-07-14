const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


const handleErrors = require("./middleware/handleErrors");

// const cors = require('cors');
const routerArticles = require('./routes/routerArticles');
const routerUsers = require("./routes/routerUsers");
const routerLogin = require("./routes/routerLogin");


const app = express(); 
const PORT = 3001; 
const MONGODB_URI = "mongodb://localhost:27017/my_local_db"; 

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
//importamos nuestro objeto de enrutador y luego lo encadenamos a nuestro objeto de aplicación Express.
//El primer argumento '/ api' aplica nuestro objeto enrutador cuando se llama a la ruta '/ api'.
app.use('/api/articles', routerArticles); 
app.use("/api/users", routerUsers);
app.use("/api/login",routerLogin);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.use(handleErrors);

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});