const jwt = require("jsonwebtoken");

const validateToken =  async (data) =>{
  const token = data.split(' ')[1];
  const decode = await new Promise((res,rej)=>{
    jwt.verify(token,process.env.JWT_SECRET,function(err,token){
      if(err){
        rej(err)
      }
      res(token)
    })
  });
  if(decode.errors){
    throw new Error("Accesstoken no valid.")
  }
  return decode;
}

module.exports = validateToken;