const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
var myPythonScriptPath='/public/script.py';
const {PythonShell} = require('python-shell');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.urlencoded({extended:false}));

// SET OUR VIEWS AND VIEW ENGINE
app.set('view engine','ejs');
const dir = path.join(__dirname,'./public');
app.use(express.static(dir));

// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  2*3600 * 1000 // 1hr
}));

// DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE

// ROOT PAGE
app.get('/', ifNotLoggedin, (req,res,next) => {
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('home',{
            name:rows[0].fname.toUpperCase()
        });
    });
    
});// END OF ROOT PAGE


// REGISTER PAGE
app.post('/register', ifLoggedin, 
// post data validation(using express-validator)
[
    body('email','Invalid email address!').isEmail().custom((value) => {
        return dbConnection.execute('SELECT `email_id` FROM docpat.`pregister` WHERE `email_id`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('fname','First name is Empty!').trim().not().isEmpty(),
    body('lname','Last name is Empty!').trim().not().isEmpty(),
    body('gender','Gender is Empty!').trim().not().isEmpty(),
    body('age','Age is Empty!').trim().not().isEmpty(),
    body('city','City is Empty!').trim().not().isEmpty(),
    body('state','State is Empty!').trim().not().isEmpty(),
    body('phn','Phone number is Empty!').trim().not().isEmpty(),
    body('pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
],// end of post data validation
(req,res,next) => {

    const validation_result = validationResult(req);
    const {fname,lname,gender,age,email,pass,city,state,phn} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            dbConnection.execute("INSERT INTO `docpat`.`pregister`(`email_id`,`fname`,`lname`,`age`,`gender`,`pwd`,`city`,`state`,`phn_no`) VALUES(?,?,?,?,?,?,?,?,?)",[email,fname,lname,age,gender,hash_pass,city,state,phn])
            .then(result => {
                res.redirect('/')
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) {
                    throw err;
                    console.log(err);
                };
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('register',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});// END OF REGISTER PAGE

// LOGIN PAGE
app.post('/', ifLoggedin, [
    body('email').custom((value) => {
        return dbConnection.execute('SELECT `email_id` FROM `docpat`.`pregister` WHERE `email_id`=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Invalid Email Address!');
            
        });
    }),
    body('upwd','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {upwd, email} = req.body;
    if(validation_result.isEmpty()){
        
        dbConnection.execute("SELECT * FROM docpat.`pregister` WHERE `email_id`=?",[email])
        .then(([rows]) => {
            bcrypt.compare(upwd, rows[0].pwd).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].id;

                    res.redirect('/');
                }
                else{
                    res.render('login',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('login',{
            login_errors:allErrors
        });
    }
});
// END OF LOGIN PAGE

app.use('/',require('./pages'));

//FOR PROFILE PAGE
app.get('/profile', (req,res) => {
    dbConnection.execute("SELECT * FROM `docpat`.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        if(rows.length == 1){
            res.render('profile',{
                name:rows[0].fname.toUpperCase(),
                fname:rows[0].fname.toUpperCase(),
                lname:rows[0].lname.toUpperCase(),
                u_email:rows[0].email_id,
                city:rows[0].city.toUpperCase(),
                state:rows[0].state.toUpperCase(),
                phone:rows[0].phn_no,
                gender:rows[0].gender.toUpperCase(),
                age:rows[0].age
            });    
        }
    });
    
});// END OF PROFILE PAGE
app.use(express.json());

app.get('/Predict',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('predict',{
            name:rows[0].fname.toUpperCase(),
            disease:''
        });
    });
});

app.post('/predict',(req,res)=>{
    //console.log(req.body.net[0]);
    //res.send({disease: JSON.stringify(req.body.net[0])});
    var options = {
        mode: 'text',
        args: [req.body.net[0], req.body.net[1], req.body.net[2],req.body.net[3],req.body.net[4]]
    };
    PythonShell.run('./public/script.py', options,(err, results) => {
        if (err) console.log(err);
        else{
            dbConnection.execute("SELECT email_id FROM `docpat`.`pregister` WHERE `id`=?",[req.session.userID])
            .then(([rows])=>{
                if(rows.length==1){
                    let email=rows[0].email_id;
                  //  let str="SELECT GETDATE() 'Current Date and Time using GETDATE()'"
                    console.log("here")
                    dbConnection.execute("INSERT INTO `docpat`.`phistory`(`email_id`,`date_time`,`predicted_disease`) VALUES(?,SYSDATE(),?)",[email,results.toString()])
                    console.log("here1")
                }
            })
            console.log(results.toString());
            res.send({disease:results.toString()});
        }
    
    });
});
app.post('/special',(req,res)=>{
    console.log('here');
    dbConnection.execute("SELECT * FROM `docpat`.`special`")
    .then((data) => {
        
        const temp=data[0];
        let j=0;
        temp.map((val)=>{
            console.log(val.Name,j++);
            //console.log(val.Desc,j++);
        })
        
        res.send({data: temp});
})
});

app.post('/history',(req,res)=>{
console.log('here');
let email;
dbConnection.execute("SELECT email_id FROM `docpat`.`pregister` WHERE `id`=?",[req.session.userID])
            .then(([rows])=>{
                if(rows.length==1){
                    email=rows[0].email_id;
                    dbConnection.execute("SELECT * FROM `docpat`.`phistory` WHERE `email_id`=?",[email])
                    .then((data) => {
                        const temp=data[0];
                        let j=0;
                        temp.map((val)=>{
                            console.log(val.date_time,j++);
                        })
                        
                        res.send({data: temp});
                    })
                }
                else{
                    console.log('No records found');
                }
            });
    
});

//FOR FEEDBACK PAGE
app.post('/feedback', 
[
    body('msg','Message is Empty!').trim().not().isEmpty(),
],
(req,res,next) => {
    const validation_result = validationResult(req);
    const {msg} = req.body;
    if(validation_result.isEmpty()){
        dbConnection.execute("SELECT email_id FROM `docpat`.`pregister` WHERE `id`=?",[req.session.userID])
        .then(([rows])=>{
            if(rows.length==1){
                let email=rows[0].email_id;
                dbConnection.execute("INSERT INTO `docpat`.`feedback`(`email_id`,`msg`) VALUES(?,?)",[email,msg])
                res.redirect('/home');
            }
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('feedback',{
            register_error:allErrors,
            old_data:req.body
        });
    }

});


//END OF FEEDBACK PAGE

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(5000, () => console.log("Server is Running..."));
