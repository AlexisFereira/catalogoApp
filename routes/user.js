const { Router } = require("express");
const {
  SignupUser,
  AuthUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
} = require("../controllers/user");
const googleSignIn  = require('./../controllers/googleSignIn');
const { check } = require("express-validator");
const validator = require("../middlewares/validator");
const validateToken = require("../helpers/validateToken");

const router = Router();

//get users
router.get("/", getUsers);

//get user byid
router.get(
  "/user/:id",
  [check("id", "Id no valid").isMongoId(), validator],
  getUserById
);

//create user
router.post(
  "/signup",
  [
    check("name", "The name is required.").not().isEmpty(),
    check("lastName", "The lastname is required.").not().isEmpty(),
    check("email", "The email is required.").not().isEmpty().isEmail(),
    check("password", "Password no secure.").isLength({ min: 8 }),
    validator,
  ],
  SignupUser
);

// create use with google
router.post('/google',[
  check('id_token','id_token is required.').not().isEmpty(),
  validator
],googleSignIn)

router.post(
  "/auth",
  [
    check("email", "Email is required.").isEmail(),
    check("password", "Password required.").not().isEmpty(),
    validator,
  ],
  AuthUser
);

// update user
router.put(
  "/update",
  [
    check("authorization", "Token is required.").not().isEmpty(),
    check("authorization", "Token no valid.").custom((token) =>
      validateToken(token)
    ),
    validator,
  ],
  updateUser
);

router.delete(
  "/delete/:id",
  [check("id", "Id no valid").isMongoId(), validator],
  deleteUser
);

module.exports = router;
