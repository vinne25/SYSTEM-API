const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "loginuser", "active"],
      where: { active: true },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.activeUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });

    if (user) {
      user.active = true;
      await user.save();
      res.status(200).json({ message: "User activated successfuly" });
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deactiveUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });

    if (user) {
      user.active = false;
      await user.save();
      res.status(200).json({ message: "User deactivated successfuly" });
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        message: `User (${user.username}) password updated successfully`,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (res, req) => {
  try {
    const { id } = req.params;
    const { username, loginuser } = req.body;
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      user.username = username;
      user.loginuser = loginuser;
      await user.save();
      res.status(200).json({ message: "user updated successfuly!" });
    } else {
      res.status(404).json.send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
