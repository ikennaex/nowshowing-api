const handleRegister = async (req, res) => {
    const { username, email, phoneNumber, password, firstName, lastName } = req.body;

    // Check username
    const usernameExists = await UserModel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
  
    // Check email
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
  
    // check phone number 
    const phoneNumberExist = await UserModel.findOne({phoneNumber})
    if (phoneNumberExist) {
      return res.status(400).json({message: "Email already exixts"})
    }
  
    try {
      const hashPass = bcrypt.hashSync(password, salt);
      const userDoc = await UserModel.create({
        username,
        email,
        phoneNumber,
        hashPass,
        firstName,
        lastName,
      });
      res.json(userDoc);
    } catch (e) {
      console.error(e);
    }
}

module.exports = {
    handleRegister
}