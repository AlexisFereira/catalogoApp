const { response } = require("express");
const User = require("./../models/users");
const bcrypt = require("bcryptjs");
const createToken = require("../helpers/createToken");

const SignupUser = async (req, res = response) => {
  const { name, lastName, email, password, img, created, active, role } =
    req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "Email already exists." });
    }

    //encrypt pass
    const salt = await bcrypt.genSaltSync(10);
    const pass = await bcrypt.hashSync(password, salt);

    //user creation
    const user = new User({
      name,
      lastName,
      email,
      password: pass,
      img,
      created,
      active,
      role,
    });
    await user.save();
    const token = await createToken(user.toJSON());
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

const AuthUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwrdMatch = await bcrypt.compare(password, user.password);
      if (passwrdMatch) {
        const token = await createToken(user);
        return res.status(200).json({ token });
      } else {
        return res
          .status(200)
          .json({ msg: "email o contraseña inválidos, intente nuevamente." });
      }
    }
    return res
      .status(200)
      .json({ msg: "email o contraseña inválidos, intente nuevamente." });
  } catch (e) {
    res.status(400).json({ msg: "Error intentando hacer login", error: e });
  }
};

// get user
const getUsers = async (_, res = response) => {
  try {
    const total = await User.find({ active: true }).countDocuments();
    const listOfUsers = await User.find({ active: true });
    res.status(200).json({ total, listOfUsers });
  } catch (e) {
    res.status(500).json({ msg: "error geting users", error: e });
  }
};

// get user by Id
const getUserById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user.active) {
      res
        .status(500)
        .json({ msg: "user no available, contact admin support." });
      return;
    }
    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ msg: "error geting user", error: e });
  }
};

// update user
const updateUser = async (req, res = response) => {
  const { userId, catalogsAllowed,email,password,id,...rest } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, rest, { new: true });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ msg: "error geting users", error: e });
  }
};

// delete user
const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ msg: "error geting users", error: e });
  }
};

module.exports = {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  SignupUser,
  AuthUser,
};
