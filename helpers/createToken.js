const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  data = JSON.parse(JSON.stringify(data));
  return new Promise((res,rej)=>{
    jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (result, token) => {
        res(token)
        rej(result)
      }
    );
  })

};

module.exports = createToken;
