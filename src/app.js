const express = require('express');
const loginController = require('./controller/login.controller');
const userController = require('./controller/user.controller');
const { authorizationValidate } = require('./middleware/authentication');
const categoryController = require('./controller/category.controller');
const blogPostController = require('./controller/blogPost.controller');
const { verifyPostEdit } = require('./middleware/verifyPost');
const { verifyCategory } = require('./middleware/verifyCategory');
// ...

const app = express();

app.use(express.json());

// ...
// criando a rota
app.post('/post', authorizationValidate, verifyCategory, blogPostController.createPost);
app.post('/categories', authorizationValidate, categoryController.category);
app.post('/user', userController.user);
app.post('/login', loginController.login);

// pegando a rota
app.get('/user', authorizationValidate, userController.getUser);
app.get('/user/:id', authorizationValidate, userController.getUserById);
app.get('/categories', authorizationValidate, categoryController.getCategory);
app.get('/post', authorizationValidate, blogPostController.getById);
app.get('/post/search', authorizationValidate, blogPostController.getPostsSearch);
app.get('/post/:id', authorizationValidate, blogPostController.getPostById);

// editando o conteúdo
app.put('/post/:id', authorizationValidate, verifyPostEdit, blogPostController.editPost);

// deletando o conteúdo
app.delete('/post/:id', authorizationValidate, verifyPostEdit, blogPostController.deletePosts);
app.delete('/user/me', authorizationValidate, userController.deleteUsers);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
