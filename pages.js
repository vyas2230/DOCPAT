const express = require('express');
const router = express.Router();
const dbConnection = require('./database');

router.get('/register',(req,res)=>{
    res.render('register');
});

router.get('/BMI',(req,res)=>{
    res.render('bmicalc');
})

router.get('/home',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('home',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/homeremedy',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Acidity',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/acidity',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Acne',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/acne',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/BackPain',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/backpain',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/bp',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/bp',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Cough',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/cough',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Dandruff',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/dandruff',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Darkcircle',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/darkcircle',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Diarrhea',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/diarrhea',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Headache',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/headache',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Healthyskin',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/healthyskin',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/Nausea',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/nausea',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Homeremedy/PeriodCramp',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./homerem/periodcramp',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Everyday',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./yoga/everyday',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Yoga/Backpain',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./yoga/back',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Yoga/Kneepain',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./yoga/knee',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Yoga/Suryanamaskar',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./yoga/suryan',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Yoga/Stiffness',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./yoga/stiffiness',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/BodyFacts',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./facts/body',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/asmr/Main',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./asmr/mainsound',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/asmr/Audio',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./asmr/audioasmr',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/asmr/Video',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./asmr/videoasmr',{
            name:rows[0].fname.toUpperCase()
        });
    });
});

router.get('/Vaccination_Centre',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./Vaccine/vaccination',{
            name:rows[0].fname.toUpperCase()
        });
    });
});

router.get('/Vaccination_Centre/Jaipur',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./Vaccine/jaipur',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Vaccination_Centre/Jodhpur',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./Vaccine/jodhpur',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Vaccination_Centre/Sikar',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./Vaccine/sikar',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Vaccination_Centre/Udaipur',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('./Vaccine/udaipur',{
            name:rows[0].fname.toUpperCase()
        });
    });
});
router.get('/Predict',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('predict',{
            name:rows[0].fname.toUpperCase(),
            disease:''
        });
    });
});
router.get('/feedback',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('feedback',{
            name:rows[0].fname.toUpperCase()
        });
    });
});

router.get('/special',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('special',{
            name:rows[0].fname.toUpperCase()
        });
    });
});

router.get('/history',(req,res)=>{
    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('history',{
            name:rows[0].fname.toUpperCase()
        });
    });
});

router.get('/Doctor',(req, res)=>{
    try{
        dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('doctor',{
            name:rows[0].fname.toUpperCase(),
            header:req.query.name
        });
    });
    }
    catch{
        console.log("pages error");
    }
});

router.get('/covidtracker',(req,res)=>{

    dbConnection.execute("SELECT `fname` FROM docpat.`pregister` WHERE `id`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('covidtracker',{
            name:rows[0].fname.toUpperCase()
        });
    });
})

//DELETE ACCOUNT

router.get('/delete',(req,res)=>{
    dbConnection.query('DELETE FROM `docpat`.`pregister` WHERE id=?',[req.session.userID])
    .then(([rows]) => { 
        req.session = null;
        console.log("data deleted");
        res.redirect('/register');
        });
    });


// END OF DELETE ACCOUNT




// LOGOUT
router.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});
// END OF LOGOUT

module.exports = router;