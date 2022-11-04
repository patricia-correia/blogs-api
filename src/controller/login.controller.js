const loginService = require('../services/login.service');
const { validateBody } = require('../validated/auth.service');

const login = async (req, res) => {
    try {
      const { error } = validateBody(req.body);
      if (error) return res.status(400).json({ message: 'Some required fields are missing' });

      const user = await loginService.getLogin(req.body);
      if (user.error) {
        return res.status(400).json({ message: user.error });
      }

      return res.status(200).json({ token: user });
    } catch (err) {
      res.status(500).json({ message: 'Deu ruim!' });
    }
  };

module.exports = {
  login,
};