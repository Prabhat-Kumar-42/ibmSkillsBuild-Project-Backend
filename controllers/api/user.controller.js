const { User } = require("../models/user.model");
const throwError = require("../utility/throwError.util");
const { generateToken } = require("./../utility/authToken.util");

const handleGetUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) throwError(404, "Not Found");
  return res.status(200).json(user);
};

const handleUserSignUp = async (req, res) => {
  if (!req.body)
    throwError(400, "name, email and password are required fields");
  const { name, email, password } = req.body;
  await User.create({ name, email, password: password });
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

const handleDeleteUser = async (req, res) => {
  const { id, email } = req.user;
  const { password } = req.body;
  const user = await User.matchPassword(email, password);
  if (!user) throwError(400, "invalid password");
  await User.findByIdAndDelete(id);
  return res.status(204).end();
};

const handleUpdateUser = async (req, res) => {
  const id = req.user.id;
  const { name, dob } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name, dob },
    { new: true, runValidators: true },
  );
  return res.status(200).json({ message: "updated", user: user });
};

const handleUpdatePassword = async (req, res) => {
  const { email } = req.user;
  const { password, updatedPassword } = req.body;
  const user = await User.matchPasswor(email, password);
  if (!user) throwError(400, "invalid password");
  user.password = updatedPassword;
  await user.save();
  return res.status(204).end();
};

const handleUpdateEmail = async (req, res) => {
  const { email } = req.user;
  const { updatedEmail, password } = req.body;
  const user = await User.matchPassword(email, password);
  if (!user) throwError(400, "invalid password");
  user.email = updatedEmail;
  await user.save();
  return res.status(200).json(user);
};

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
  handleGetUser,
  handleUserLogin,
  handleUserSignUp,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdateEmail,
  handleUpdatePassword,
};
