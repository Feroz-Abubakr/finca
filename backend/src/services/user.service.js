const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");

const registerUser = async (name, email, password, role = "user") => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = await userRepository.createUser(
    name,
    email,
    passwordHash,
    role
  );

  return newUser;
};

const getUsers = async () => {
  return await userRepository.getAllUsers();
};

module.exports = {
  registerUser,
  getUsers,
};