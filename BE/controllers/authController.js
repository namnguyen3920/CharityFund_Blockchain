const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashed, name });
  await newUser.save();
  res.status(201).json({ message: "User created", newUser });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //     expiresIn: '1d',
    //   });
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }

  //   res.json({ token });
};
