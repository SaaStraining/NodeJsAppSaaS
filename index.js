const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express();
const saltRounds = 10
var mysql = require('mysql');
var config = require('./DbConnexion.js');
var conn = mysql.createConnection(config.databaseOptions);

const port = process.env.PORT || 3001

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
// const conn = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'npm_saas'
// });
conn.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Connected');
});

app.post("/aa",async (req,res) =>{
    const data = req.body.a;
    console.log(data)
})

app.post("/api/employe/add", async(req,res) =>{

    const data =req.body;
    const statut = req.body.statut;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const cin = req.body.cin;

    const insertEmp = "INSERT INTO `employe_test` (`id`, `statut`, `nom`, `prenom`, `cin`, `tel`, `mail`, `addresse`, `sb`, `cs`, `sn`) VALUES (NULL, ?, ?, ?, ?, '0708071759', 'nebdaoui.anass@gmail.com', '16 etc', '12.33113', '311.31', '311.13')";
    conn.query(insertEmp,[statut, nom, prenom, cin] ,(err,result) =>{
        res.send("Hello Test port 3001")
        console.log(err)
        console.log(result)
    });
});

app.get("/api/employe/get",(req,res) =>{
        
    conn.query("SELECT * FROM employe_test", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

});

app.get("/api/accounts/get",(req,res) =>{
        
    conn.query("SELECT * FROM compte", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

});

app.post("/api/admin/login",async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err,hash)=>{
        if(err){
            console.log(err)
        }

        conn.query("SELECT * FROM compte where role = 'ADMIN' AND email = ? AND password = ?",
        [email,password],
        (err,result) =>{
            if(err){
                res.send({err:err});
                res.send(err);
                console.log(err);
            }   
            if(result.length>0){
                res.send(result)
                console.log(result)
            }else{
                res.send({message:"Wrong informations"})
                res.send("error")
            }
        })
    })
})

app.post("/api/editor/login",(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err,hash)=>{
        if(err){
            console.log(err)
        }

        conn.query("SELECT * FROM compte where role = 'EDITOR' AND email = ? AND password = ?",
        [email,password],
        (err,result) =>{
            if(err){
                res.send({err:err});
                res.send(err);
                console.log(err);
            }   
            if(result.length>0){
                res.send(result)
                console.log(result)
            }else{
                res.send({message:"Wrong informations"})
                res.send("error")
            }
        })
    })
})

app.post("/api/visitor/login",(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err,hash)=>{
        if(err){
            console.log(err)
        }
        conn.query("SELECT * FROM compte where role = 'VISITOR' AND email = ? AND password = ?",
        [email,password],
        (err,result) =>{
            if(err){
                res.send({err:err});
                res.send(err);
                console.log(err);
            }   
            if(result.length>0){
                res.send(result)
                console.log(result)
            }else{
                res.send({message:"Wrong informations"})
                res.send("error")
            }
        })
    })
})

app.listen(port,() =>{
    console.log("running on port 3001")
});