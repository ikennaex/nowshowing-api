const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const handleRegister = async (req, res) => {
  const { email, phoneNumber, password, firstName, lastName } =
    req.body;

    // normalize email  
  const normalizedEmail = email.toLowerCase().trim();

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
    res.status(200).json({message: "Account created Successfully"});
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  handleRegister,
};
