const express = require('express');
const mysql = require('mysql');
const DB = require('../DB');

const router = express.Router();

const pool = mysql.createPool(DB);


router.post('/join',(req, res)=>{
    const {email, name, password} = req.body
    try {
            pool.getConnection((err, connection) => {
                if (err) {
                    throw err
                } else {
                    connection.query(`INSERT INTO member(email, name, password) VALUE ('${email}', '${name}', '${password}')`, function (err, results) {
                        if (err)
                            throw err;
                        else
                            console.log(results);
                    });
                    connection.release();
                }
            })
        
    } catch (e) {
        console.log(e);
    }
    
})

router.get('/sign',(req, res)=>{
    const {email, password} = req.query
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err
            } else {
                connection.query(`SELECT member_id, name FROM member WHERE email ='${email}' AND password = '${password}'`, function (err, results) {
                    if (err)
                        throw err;
                    else {
                        res.send(results);
                    }
                });
                connection.release();
            }
        });
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;