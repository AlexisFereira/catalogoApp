const createToken = require("../helpers/createToken");
const verifyGoogleToken = require("../helpers/validateGoogleToken");
const { exists } = require("../models/users");
const users = require("../models/users");
const uuid = require("uuid").v4;

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, family_name, given_name, picture, error } =
      await verifyGoogleToken(id_token);

    if (error) {
      res.status(500).json({ error: e, msg: "Error with google sign in." });
      return;
    }
    const exist = await users.find({ email });
    if (exists) {
      const token = await createToken(exist);
      res.status(200).json({ token });
      return;
    }
    const user = new users({
      email,
      name: given_name,
      lastName: family_name,
      img: picture,
      password: uuid(),
    });
    await user.save();

    const token = await createToken(user);

    res.status(200).json({ googleUser });
  } catch (e) {
    res.status(500).json({ error: e, msg: "Error with google sign in." });
  }
};

module.exports = googleSignIn;
