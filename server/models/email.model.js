const mongooes = require("mongoose");

const emailSchema = new mongooes.Schema({
  username: { type: String ,required:true},
  email: { type: String ,required:true},
  message: { type: String ,required:true},
});

const emailModel=mongooes.model("emailuser",emailSchema)

module.exports=emailModel
