const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const handleRegister = async (req, res) => {
  const { email, phoneNumber, password, firstName, lastName } =
    req.body;

    // normalize email and username 
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedUsername = username.toLowerCase().trim();

  // Check username
  const usernameExists = await userModel.findOne({ username: normalizedUsername });
  if (usernameExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Check email
  const emailExists = await userModel.findOne({ email: normalizedEmail });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // check phone number
  const phoneNumberExist = await userModel.findOne({ phoneNumber });
  if (phoneNumberExist) {
    return res.status(400).json({ message: "Phone number already exists" });
  }

  try {
    const hashPass = bcrypt.hashSync(password, salt);
    const userDoc = await userModel.create({
      // username: normalizedUsername,
      email: normalizedEmail,
      phoneNumber,
      hashPass,
      firstName,
      lastName,
    });
    res.json(userDoc);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  handleRegister,
};
