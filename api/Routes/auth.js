const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //HASHED PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATE A NEW USER
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //SAVE USER AND RETURN RESPONSE
    const user = await newUser.save();
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //VALIDATE EMAIL
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("email not found");
    //VALIDATE PASSWORD
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    !validPwd && res.status(404).json("password not valid");
    //SEND USER DETAILS
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
