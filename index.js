const express = require("express");
const app = express();

const mysql = require('mysql');
const conn = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'npm_saas'
});

app.get("/",(req,res) =>{
    // const insertEmp = "INSERT INTO `employe_test` (`id`, `statut`, `nom`, `prenom`, `cin`, `tel`, `mail`, `addresse`, `sb`, `cs`, `sn`) VALUES (NULL, 'Dqqr', 'Nebdaoui', 'Anass', 'Q340834', '0708071759', 'nebdaoui.anass@gmail.com', '16 etc', '12.33113', '311.31', '311.13')";
    // conn.query(insertEmp, (err,result) =>{
    //     res.send("Hello Test port 3001")

    // })
});

app.listen(3001,() =>{
    console.log("running on port 3001")
});