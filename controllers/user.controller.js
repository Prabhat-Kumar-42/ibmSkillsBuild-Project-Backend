const { User } = require("../models/user.model");
const throwError = require("../utility/throwError.util");
const { generateToken } = require("./../utility/authToken.util");

const handleUserSignUp = async (req, res) => {
  if (!req.body)
    throwError(400, "name, email and password are required fields");
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password: password });
  return res.status(201).json({ message: "created" });
};

const handleUserLogin = async (req, res) => {
  if (!req.body) throwError(400, "email and password are required fields");
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);
  if (!user) throwError(400, "incorrect email or password");
  const authToken = generateToken(user);
  return res.status(200).json({
    message: "success",
    authorization: { scheme: "bearer", authToken },
  });
};

const handleDeleteUser = async (req, res) => {};

const handleUpdateUser = async (req, res) => {};

const handleUpdatePassword = async (req, res) => {};

const handleUpdateEmail = async (req, res) => {};

// TODO: Below Functionality Works, need to add email verification on singup handler above
//       to send verification emails containing jwt token having payload as userd data and
//       encrypted password
//
// const handleCreateUser = async (req, res) => {
//   const token = req.params.token;
//   const { name, email, password } = verify(token);
//   const decryptedPassword = decryptString(password);
//   const user = await User.create({ name, email, password: decryptedPassword });
//   return res.status(201).json({ message: "created" });
// };

module.exports = {
  handleUserLogin,
  handleUserSignUp,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdateEmail,
  handleUpdatePassword,
};
