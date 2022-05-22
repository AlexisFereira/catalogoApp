const { response } = require('express')
const {validationResult} = require('express-validator')

const validator = (req,res=response,next) =>{
  const result = validationResult(req);
  if(result.isEmpty()){
    return next();
  }
  return res.status(400).json(result)
  
}
module.exports = validator;