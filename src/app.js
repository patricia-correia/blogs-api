const express = require('express');
const loginController = require('./controller/login.controller');
const userController = require('./controller/user.controller');
const { authorizationValidate } = require('./middleware/authentication');
// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', loginController.login);
app.post('/user', userController.user);
app.get('/user', authorizationValidate, userController.getUser);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
