import User from "../../models/Auth/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: hashed_pass });

    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Something Went Wrong" }); 
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({ message: "Login Successfully", token, user: { id: user._id, name: user.name, email: user.email }, })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
