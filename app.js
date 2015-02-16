/* Home For Humanity  */
/* by Brian Cottrell  */
/* 02-10-2015         */

//Add neccessary packages
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var traitify    = require('traitify');
var path        = require('path');
//Add user model
var Profile     = require('./app/models/profile');
//Set port to 8080
var port        = process.env.PORT || 8080;
//Router for making http requests
var router      = express.Router();
//Specify a traitify deck to use
var deckId      = 'core';
var assessmentId;

//Configure body body-parser
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
//Configure tratify api
traitify.setHost('api-sandbox.traitify.com');
traitify.setVersion('v1');
traitify.setSecretKey('uhutbgmj5eo4thjdvj1di9j9vp');
//Create a new traitify assessment
traitify.createAssessment(deckId, function(assessment){
    // Use assessment here.
    assessmentId = assessment.id;
});
//Configure view engine and directory path
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/views')));
//Connect to the database
mongoose.connect('mongodb://brian:mongo@ds039441.mongolab.com:39441/briansdatabase');

//Specify routes
router.route('/home')
//Called when a user navigates to the home page
.get(function(req, res){
    //Create a new traitify assessment
    traitify.createAssessment(deckId, function(assessment){
        // Use assessment here.
        assessmentId = assessment.id;
    });
    // Profile.find(function(err, data){
    //     if(err) 
    //         console.log(err);
    //     console.log(data);
        res.status(200).render('home', {
            assessmentId: assessmentId,
            name: 'Brian'
        });
    // });
})
//Called when a user makes a post to the home page
.post(function(req, res){
    var profile = new Profile();
    profile.name = req.body.name;
    profile.email = req.body.email;
    profile.assessment = assessmentId;
    profile.personality1 = req.body.personality1;
    profile.personality2 = req.body.personality2;
    profile.category = req.body.category;
    profile.hacker = req.body.hacker;
    profile.pets = req.body.pets;
    profile.quiet = req.body.quiet;
    profile.save(function(err){
        if(err)
            console.log(err);
        res.json({message: "post worked"});
    });
});
//The results page is displayed when a user completes the assessment
router.route('/results')

app.use(router);
app.listen(port);
console.log('Listening to port:', port);