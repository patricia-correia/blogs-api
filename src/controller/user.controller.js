const userService = require('../services/validation');
const { validateNewUser } = require('../validated/auth.service');
const { createToken } = require('../utils/jwt.util');

const user = async (req, res) => {
  try {
    const { error } = validateNewUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const exist = await userService.validateLogin(req.body);
    if (exist) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = await userService.getUser(req.body);

    const { password: _, ...userWithoutPassword } = newUser.dataValues;

    const token = createToken(userWithoutPassword);
      return res.status(201).json({ token });
  } catch (err) {
    res.status(501).json({ message: 'Deu ruim no user' });
  }
};

module.exports = { user };