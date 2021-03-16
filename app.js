var express = require('express');
var app = express();
app.listen(8080, function(){
    console.log('Server is running on Localhost:8080 ...')
});

//Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes/index');

//Routing
app.get("/", index);
const {showPet, addPetEvent, addPetEventSubmit, editPetEvent, editPetEventSubmit, deletePetEventSubmit} = require('./routes/pet');
app.get("/pet/:name", showPet);
app.get("/pet/add/:name",addPetEvent);
app.post("/pet/add/:name",addPetEventSubmit);
app.get("/pet/edit/:name",editPetEvent);
app.post("/pet/edit/:name",editPetEventSubmit);
app.get("/pet/delete/:name",deletePetEventSubmit);


//E JS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

app.use(express.static(__dirname + "/public"));

//Database
const mysql = require('mysql');
const db = mysql.createConnection ({
   host: 'localhost',
   user: 'root',
   password: '123456',
   database: 'mydb'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
 });
 global.db = db;

