const User = require("../../models/Auth/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ error: "User exists" });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ user: { id: user._id, name, email }, token });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }


};
