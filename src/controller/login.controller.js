const loginService = require('../services/validation');
const { validateBody } = require('../validated/auth.service');
const { createToken } = require('../utils/jwt.util');

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { error } = validateBody(req.body);
      if (error) return res.status(400).json({ message: 'Some required fields are missing' });

      const user = await loginService.validateLogin({ email });
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
      }

      const { password: _, ...userWithoutPassword } = user.dataValues;

      const token = createToken(userWithoutPassword);
      return res.status(200).json({ token });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Deu ruim!' });
    }
  };

module.exports = {
  login,
};