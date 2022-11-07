const express = require('express');
const loginController = require('./controller/login.controller');
const userController = require('./controller/user.controller');
const { authorizationValidate } = require('./middleware/authentication');
const categoryController = require('./controller/category.controller');
const blogPostController = require('./controller/blogPost.controller');
const { verifyPostEdit } = require('./middleware/verifyPost');
// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', loginController.login);
app.post('/user', userController.user);
app.post('/categories', authorizationValidate, categoryController.category);
app.get('/user', authorizationValidate, userController.getUser);
app.get('/user/:id', authorizationValidate, userController.getUserById);
app.get('/categories', authorizationValidate, categoryController.getCategory);
app.get('/post', authorizationValidate, blogPostController.getById);
app.get('/post/:id', authorizationValidate, blogPostController.getPostById);
app.put('/post/:id', authorizationValidate, verifyPostEdit, blogPostController.editPost);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
