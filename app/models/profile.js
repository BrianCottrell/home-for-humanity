/* Home For Humanity  */
/* by Brian Cottrell  */
/* 02-10-2015         */

//Configure the model with mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//The profile model contains all information for each user
var profileSchema = new Schema({
    name: String,
    email: String,
    objective: String,
    assessment: String,
    personality1: String,
    personality2: String,
    category: String,    
    hacker: String,
    pets: String,
    quiet: String
});
//Add model to the appliction
module.exports = mongoose.model("Profile", profileSchema);