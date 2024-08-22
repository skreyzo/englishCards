```javascript
Создаем папку server:

Переходим в папку server.
Инициализируем package.json командой npm init -y.
Проинициализируем ESLint командой npm init @elbrus/config@latest.
// Проинициализируем .gitignore командой npx gitignore node.
// Настраиваем ESLint и Prettier в настройках редактора.
Создаем файл .sequelizerc.
Вставляем в .sequelizerc следующее содержимое:




const path = require("path");
module.exports = {
  config: path.resolve("db", "database.js"),
  "models-path": path.resolve("db", "models"),
  "seeders-path": path.resolve("db", "seeders"),
  "migrations-path": path.resolve("db", "migrations"),
};


Создаем файл .env.
Вставляем в .env следующее содержимое:




DB_NAME=Project3.0
DB_USER=bear
DB_HOST=127.0.0.1
DB_PASS=123
PORT=3000
ACCESS_TOKEN_SECRET=sdfasdsdfserferfdsdsdfsdf32234dfefefefrfgrf
REFRESH_TOKEN_SECRET=dsfavfeerdffsddsafesf4dsgsafefeefegrfgr


Создаем файл .env.example.
Вставляем в .env.example следующее содержимое:


DB_NAME=
DB_USER=
DB_HOST=
DB_PASS=
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

Устанавливаем необходимые пакеты командой npm i sequelize sequelize-cli pg pg-hstore express morgan dotenv nodemon bcrypt jsonwebtoken cookie-parser cors.
Проинициализируем базу данных командой npx sequelize-cli init.
Переходим в файл database.js и меняем его содержимое на:



require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
  },
};


Создаем папку src и в ней файлы app.js и server.js.

Создаем папку routes и в ней файл names.router.js

В app.js:

const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const nameRouter = require("./routes/names.router.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", nameRouter);


module.exports = app;


В server.js:

require("dotenv").config();
const app = require("./app");

const { PORT } = process.env;
//const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


Создаем первую модель для базы данных:
npx sequelize model:generate --name Post --attributes title:string,body:text,img:string - для постов

npx sequelize model:generate --name User --attributes username:string,email:string,password:string

И сразу создаем сиды:
npx sequelize-cli seed:generate --name initial-seed


В файле name.router.js:

const {Router} = require('express')
const { Post } = require('../../db/models');

const router = Router();

router.get('/', async (req, res) => {
const posts = await Post.findAll();
res.json(posts);
});

module.exports = router;

Прописываем стартовый скрипт в package.json:

"start": "node src/server.js",
"dev": "nodemon src/server.js",
"db:reset": "sequelize db:drop && sequelize db:create && sequelize db:migrate && sequelize db:seed:all",
// * "db:remigrate": "sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all", 
// * перенакатывает без дропа базы

Переходим к созданию клиентской части client:

Запускаем npm create vite@latest и выбираем 
react
JawaScript + SWC
//react-ts.
Переходим в папку 
cd client
Устанавливаем зависимости командой npm i.

Создаем файл vite.config.js со следующим содержимым:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
server: {
proxy: {
'/api': 'http://localhost:3000',
},
},
});

Устанавливаем Bootstrap:

npm install react-bootstrap bootstrap
npm install bootstrap@5.3.3
npm i react-router-dom axios
npm i axios

В main.jsx импортируем Bootstrap:

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Удаляем ненужные файлы: Index.css, App.css, assets.

В App.tsx оставляем минимальный код:
import React from 'react';

function App() {
return <></>;
}

export default App;

Создаем папку components и в ней файл Layout.jsx.

Создаем папку pages и в ней файлы MainPage.jsx, AddPostPage.jsx, SignUpPage.jsx, LoginPage.jsx.

Создаем папку ui и в ней файлы NavBar.jsx и PostCard.tsx.

В Layout.jsx создаем базовый шаблон страницы:

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";

export default function Layout({ user, handleLogout }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <NavBar user={user} handleLogout={handleLogout} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}



В MainPage.tsx подгружаем посты с сервера:

import React, { useEffect, useState } from 'react';
import PostCard from '../ui/PostCard';
import axiosInstance from '../axiosInstance';

export default function MainPage() {
const [posts, setPosts] = useState([]);

useEffect(() => {
axiosInstance('/posts')
.then((res) => setPosts(res.data))
.catch((err) => console.error(err));
}, []);

const deleteHandler = async (postId) => {
try {
await axiosInstance.delete(`/posts/${postId}`);
setPosts((prev) => prev.filter((post) => post.id !== postId));
} catch (err) {
console.error(err);
}
};

return (
<div className="row">
{posts.map((post) => (
<div key={post.id} className="col-4">
<PostCard post={post} deleteHandler={deleteHandler} />
</div>
))}
</div>
);
}



В PostCard.tsx отображаем информацию о посте:
import React from 'react';

export default function PostCard({ post }) {
return (
<div className="card">
<div className="card-header">Карточка</div>
<div className="card-body">
<h5 className="card-title">{post.title}</h5>
<p className="card-text">{post.body}</p>
</div>
</div>
);
}


В AddPostPage.tsx добавляем форму для создания нового поста:

import { useNavigate } from 'react-router-dom';
import React from 'react';
import axiosInstance from '../axiosInstance';

export default function AddPostPage() {
const navigate = useNavigate();

const submitHandler = async (e) => {
e.preventDefault();
const formData = Object.fromEntries(new FormData(e.target));
try {
await axiosInstance.post('/posts', formData);
navigate('/');
} catch (err) {
console.error(err);
}
};

return (
<div className="container">
<form onSubmit={submitHandler}>
<div className="mb-3">
<label htmlFor="addTitle" className="form-label">
Заголовок
</label>
<input name="title" type="text" className="form-control" id="addTitle" />
</div>
<div className="mb-3">
<label htmlFor="addBody" className="form-label">
Описание
</label>
<textarea name="body" className="form-control" id="addBody"></textarea>
</div>
<button type="submit" className="btn btn-primary">
Добавить
</button>
</form>
</div>
);
}

В SignUpPage.tsx добавляем форму для регистрации пользователя:

import React from 'react';
import axiosInstance, { setAccessToken } from '../axiosInstance';

export default function SignUpPage() {
const submitHandler = async (e) => {
e.preventDefault();
const formData = Object.fromEntries(new FormData(e.target));
try {
const res = await axiosInstance.post('/auth/signup', formData);
setAccessToken(res.data.accessToken);
// Сохраняем пользователя в состоянии приложения
} catch (err) {
console.error(err);
}
};

return (
<div className="container">
<form onSubmit={submitHandler}>
<div className="mb-3">
<label htmlFor="email" className="form-label">
Email
</label>
<input name="email" type="email" className="form-control" id="email" />
</div>
<div className="mb-3">
<label htmlFor="name" className="form-label">
Имя
</label>
<input name="name" type="text" className="form-control" id="name" />
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">
Пароль
</label>
<input name="password" type="password" className="form-control" id="password" />
</div>
<button type="submit" className="btn btn-primary">
Зарегистрироваться
</button>
</form>
</div>
);
}


В LoginPage.tsx добавляем форму для авторизации пользователя:

import React from 'react';
import axiosInstance, { setAccessToken } from '../axiosInstance';

export default function LoginPage() {
const submitHandler = async (e) => {
e.preventDefault();
const formData = Object.fromEntries(new FormData(e.target));
try {
const res = await axiosInstance.post('/auth/login', formData);
setAccessToken(res.data.accessToken);
// Сохраняем пользователя в состоянии приложения
} catch (err) {
console.error(err);
}
};

return (
<div className="container">
<form onSubmit={submitHandler}>
<div className="mb-3">
<label htmlFor="email" className="form-label">
Email
</label>
<input name="email" type="email" className="form-control" id="email" />
</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">
Пароль
</label>
<input name="password" type="password" className="form-control" id="password" />
</div>
<button type="submit" className="btn btn-primary">
Войти
</button>
</form>
</div>
);
}

В NavBar.tsx отображаем навигационное меню:

import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ user, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {!user && (
              <>
                <NavLink to="/signup" className="nav-link">
                  Зарегистрироваться
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  Авторизоваться
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink to="/posts" className="nav-link">
                  Посты
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                  Профиль
                </NavLink>
                <NavLink to="/logout" className="nav-link">
                  Выйти
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


В App.tsx создаем основные маршруты:

import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import AddPostPage from "./components/pages/AddPostPage";
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import axiosInstance, { setAccessToken } from "./axiosInstance";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
        setAccessToken("");
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      setAccessToken("");
    } catch (err) {
      console.error(err);
    }
  };

  const routes = [
    {
      element: <Layout user={user} handleLogout={handleLogout} />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/posts/add",
          element: <AddPostPage />,
        },
        {
          path: "/signup",
          element: <SignUpPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
export default App;

// В Layout.tsx отображаем шаблон страницы:


// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import NavBar from '../ui/NavBar';

// export default function Layout({ user, handleLogout }) {

// return (
// <div className="container">
// <div className="row">
// <div className="col">
// <NavBar user={user} handleLogout={handleLogout} />
// </div>
// </div>
// <div className="row">
// <div className="col">
// <Outlet />
// </div>
// </div>
// </div>
// );
// }

В axiosInstance.js настраиваем экземпляр Axios:

import axios from 'axios';

const axiosInstance = axios.create({
baseURL: '/api',
headers: {
'Content-Type': 'application/json',
},
});

let accessToken = '';

export function setAccessToken(newToken) {
accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
if (accessToken) {
config.headers.Authorization = `Bearer ${accessToken}`;
}
return config;
});

axiosInstance.interceptors.response.use(
(response) => response,
async (error) => {
const prevRequest = error.config;
if (error.response.status === 403 && !prevRequest.sent) {
try {
const { data } = await axiosInstance.get('/tokens/refresh');
setAccessToken(data.accessToken);
prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
prevRequest.sent = true;
return axiosInstance(prevRequest);
} catch (err) {
console.error(err);
setAccessToken('');
}
}
return Promise.reject(error);
},
);

export default axiosInstance;

В postRouter.js на сервере добавляем защиту маршрутов:

const express = require('express');
const { Post, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const postRouter = express.Router();

postRouter
.route('/')
.get(async (req, res) => {
const posts = await Post.findAll({ order: [['id', 'DESC']] });
res.json(posts);
})
.post(verifyAccessToken, async (req, res) => {
const post = await Post.create({ ...req.body, userId: res.locals.user.id });
res.status(201).json(post);
});

postRouter
.route('/:postId')
.delete(verifyAccessToken, async (req, res) => {
const post = await Post.findByPk(req.params.postId, {
include: User,
});
if (post.userId === res.locals.user.id) {
await post.destroy();
res.sendStatus(204);
} else {
res.sendStatus(403);
}
})
.put(verifyAccessToken, async (req, res) => {
const post = await Post.findByPk(req.params.postId, {
include: User,
});
if (post.userId === res.locals.user.id) {
await post.update(req.body);
res.json(post);
} else {
res.sendStatus(403);
}
})
.get(async (req, res) => {
const post = await Post.findByPk(req.params.postId);
res.json(post);
});

module.exports = postRouter;

В authRouter.js на сервере добавляем логику авторизации и регистрации:

const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../config/cookieConfig');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
const { email, name, password } = req.body;

if (!name || !email || !password) return res.sendStatus(400);

const hashpass = await bcrypt.hash(password, 10);
const [newUser, created] = await User.findOrCreate({
where: { email },
defaults: { name, hashpass },
});

if (!created) return res.sendStatus(400);

const user = newUser.get();
delete user.hashpass;
const { accessToken, refreshToken } = generateTokens({ user });
res.cookie('refreshToken', refreshToken, cookieConfig).json({ accessToken, user });
});

authRouter.post('/login', async (req, res) => {
const { email, password } = req.body;

if (!email || !password) return res.sendStatus(400);

const findUser = await User.findOne({
where: { email },
});

if (!findUser) return res.sendStatus(400);

const validPassword = await bcrypt.compare(password, findUser.hashpass);

if (!validPassword) return res.sendStatus(400);

const user = findUser.get();
delete user.hashpass;
const { accessToken, refreshToken } = generateTokens({ user });
res.cookie('refreshToken', refreshToken, cookieConfig).json({ accessToken, user });
});

authRouter.post('/logout', async (req, res) => {
res.clearCookie("refreshToken", cookieConfig);
  return res.sendStatus(200);
});


В utils/generateTokens.js создаем функцию для генерации JWT-токенов:

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
require('dotenv').config();

function generateTokens(payload) {
return {
accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, jwtConfig.access),
refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, jwtConfig.refresh),
};
}

module.exports = generateTokens;

Создаем файл config/jwtConfig.js со следующим содержимым:
module.exports = {
access: {
expiresIn: '15m',
},
refresh: {
expiresIn: '7d',
},
};

Создаем файл middlewares/verifyAccessToken.js для проверки JWT-токена:

const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyAccessToken(req, res, next) {
const authHeader = req.headers.authorization;
if (!authHeader) return res.sendStatus(401);

const token = authHeader.split(' ')[1];
jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
if (err) return res.sendStatus(403);
res.locals.user = decoded.user;
next();
});
}

module.exports = verifyAccessToken;

В authRouter.js добавляем логику для обновления JWT-токенов:

authRouter.get('/tokens/refresh', async (req, res) => {
const refreshToken = req.cookies.refreshToken;
if (!refreshToken) return res.sendStatus(401);

jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
if (err) return res.sendStatus(403);

    const user = await User.findByPk(decoded.user.id);
    if (!user) return res.sendStatus(403);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      user: user.get(),
    });

    res.cookie('refreshToken', newRefreshToken, cookieConfig).json({
      accessToken,
      user: user.get(),
    });

});
});

authRouter.post('/logout', (req, res) => {
res.clearCookie('refreshToken', cookieConfig).sendStatus(200);
});


В app.js подключаем авторизационный роутер:

const express = require('express');
const morgan = require('morgan');
const postRouter = require('./router/postRouter');
const authRouter = require('./router/authRouter');
const cookieParser = require('cookie-parser');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

module.exports = app;


В server.js добавляем настройки для работы с cookies:

const app = require('./app');
const cookieConfig = require('./config/cookieConfig');

require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});


Создаем файл config/cookieConfig.js со следующим содержимым:

module.exports = {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
};


Теперь можно запустить сервер и клиент, используя команды:

Для сервера: npm run dev
Для клиента: npm start
Таким образом, мы создали серверную и клиентскую части приложения с авторизацией и CRUD-операциями над постами. Данная инструкция охватывает основные этапы разработки, но может потребовать дополнительной доработки в зависимости от ваших требований.


Добавим функционал для отображения сообщений об ошибках и успешных действиях на клиентской части:

В App.tsx добавим состояние для сообщений:
const [message, setMessage] = useState(null);
const handleMessage = (newMessage) => {
setMessage(newMessage);
setTimeout(() => setMessage(null), 3000);
};


В Layout.tsx отображаем сообщение:
return (

  <div className="container">
    {message && (
      <div className="alert alert-primary" role="alert">
        {message}
      </div>
    )}
    <div className="row">
      <div className="col">
        <NavBar user={user} handleLogout={handleLogout} />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Outlet context={{ handleMessage }} />
      </div>
    </div>
  </div>
);


В MainPage.tsx, AddPostPage.tsx, SignUpPage.tsx и LoginPage.tsx используем хук useOutletContext для доступа к функции handleMessage:
const { handleMessage } = useOutletContext();

// Использование handleMessage в логике компонентов
Добавим возможность редактирования постов:

В postRouter.js на сервере добавляем логику для обновления постов:
postRouter
.route('/:postId')
.put(verifyAccessToken, async (req, res) => {
const post = await Post.findByPk(req.params.postId, {
include: User,
});
if (post.userId === res.locals.user.id) {
await post.update(req.body);
res.json(post);
} else {
res.sendStatus(403);
}
});

На клиентской части в MainPage.tsx добавляем функционал для редактирования:
const [editingPostId, setEditingPostId] = useState(null);
const [editedPost, setEditedPost] = useState({ title: '', body: '' });

const editHandler = (post) => {
setEditingPostId(post.id);
setEditedPost({ title: post.title, body: post.body });
};

const saveHandler = async () => {
try {
await axiosInstance.put(`/posts/${editingPostId}`, editedPost);
setEditingPostId(null);
setEditedPost({ title: '', body: '' });
handleMessage('Пост успешно обновлен!');
} catch (err) {
console.error(err);
handleMessage('Ошибка при обновлении поста!');
}
};

return (

  <div className="row">
    {posts.map((post) => (
      <div key={post.id} className="col-4">
        {editingPostId === post.id ? (
          <form onSubmit={saveHandler}>
            <div className="mb-3">
              <input
                name="title"
                type="text"
                className="form-control"
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="body"
                className="form-control"
                value={editedPost.body}
                onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Сохранить
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditingPostId(null)}
            >
              Отмена
            </button>
          </form>
        ) : (
          <PostCard post={post} deleteHandler={deleteHandler} editHandler={editHandler} />
        )}
      </div>
    ))}
  </div>
);


В PostCard.tsx добавляем кнопку для редактирования:

export default function PostCard({ post, deleteHandler, editHandler }) {
  return (
    <div className="card">
      <div className="card-header">Карточка</div>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger me-2" onClick={() => deleteHandler(post.id)}>
            Удалить
          </button>
          <button className="btn btn-primary" onClick={() => editHandler(post)}>
            Редактировать
          </button>
        </div>
      </div>
    </div>
  );
}
Добавим возможность загрузки файлов на сервер:

Установим пакет для работы с файлами:
npm i express-fileupload

В app.js подключаем middleware для работы с файлами:
const fileUpload = require('express-fileupload');

app.use(fileUpload());

В postRouter.js добавляем логику для загрузки файлов:
postRouter.post('/', verifyAccessToken, async (req, res) => {
if (!req.files || Object.keys(req.files).length === 0) {
return res.status(400).send('No files were uploaded.');
}

const { file } = req.files;
const fileName = `${Date.now()}-${file.name}`;
const uploadPath = path.join(\_\_dirname, '..', 'uploads', fileName);

file.mv(uploadPath, async (err) => {
if (err) {
return res.status(500).send(err);
}

    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      imageUrl: `/uploads/${fileName}`,
      userId: res.locals.user.id,
    });

    res.status(201).json(post);

});
});

На клиентской части в AddPostPage.tsx добавляем логику для загрузки файлов:
const [file, setFile] = useState(null);

const submitHandler = async (e) => {
e.preventDefault();
const formData = new FormData(e.target);
formData.append('file', file);
try {
await axiosInstance.post('/posts', formData, {
headers: {
'Content-Type': 'multipart/form-data',
},
});
navigate('/');
handleMessage('Пост успешно добавлен!');
} catch (err) {
console.error(err);
handleMessage('Ошибка при добавлении поста!');
}
};

return (

  <div className="container">
    <form onSubmit={submitHandler}>
      {/* ... */}



Добавим возможность отображения загруженного изображения в PostCard.tsx:
export default function PostCard({ post, deleteHandler, editHandler }) {
return (
<div className="card">
{post.imageUrl && (
<img src={post.imageUrl} className="card-img-top" alt="Post" />
)}
<div className="card-body">
<h5 className="card-title">{post.title}</h5>
<p className="card-text">{post.body}</p>
<div className="d-flex justify-content-end">
<button className="btn btn-danger me-2" onClick={() => deleteHandler(post.id)}>
Удалить
</button>
<button className="btn btn-primary" onClick={() => editHandler(post)}>
Редактировать
</button>
</div>
</div>
</div>
);
}


Добавим возможность фильтрации постов по пользователю:

В postRouter.js на сервере добавляем логику для фильтрации:
postRouter.get('/', async (req, res) => {
const { userId } = req.query;
const where = {};
if (userId) {
where.userId = userId;
}
const posts = await Post.findAll({
where,
order: [['id', 'DESC']],
include: User,
});
res.json(posts);
});


На клиентской части в MainPage.tsx добавляем фильтрацию:
const [userId, setUserId] = useState(null);

useEffect(() => {
axiosInstance(`/posts?userId=${userId || ''}`)
.then((res) => setPosts(res.data))
.catch((err) => console.error(err));
}, [userId]);

return (

  <div>
    <div className="mb-3">
      <label htmlFor="userFilter" className="form-label">
        Фильтр по пользователю
      </label>
      <select
        id="userFilter"
        className="form-select"
        value={userId || ''}
        onChange={(e) => setUserId(e.target.value || null)}
      >
        <option value="">Все пользователи</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
    <div className="row">
      {/* ... */}
    </div>
  </div>
);


В Layout.tsx добавляем список пользователей в контекст:
const [users, setUsers] = useState([]);

useEffect(() => {
axiosInstance('/users')
.then((res) => setUsers(res.data))
.catch((err) => console.error(err));
}, []);

return (

  <div className="container">
    {message && (
      <div className="alert alert-primary" role="alert">
        {message}
      </div>
    )}
    <div className="row">
      <div className="col">
        <NavBar user={user} handleLogout={handleLogout} users={users} />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <Outlet context={{ handleMessage, users }} />
      </div>
    </div>
  </div>
);


В NavBar.tsx добавляем выпадающее меню для фильтрации:
export default function NavBar({ user, handleLogout, users }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      {/* ... */}
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {/* ... */}
          {user && (
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Фильтр по пользователю
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" className="dropdown-item">
                    Все пользователи
                  </Link>
                </li>
                {users.map((u) => (
                  <li key={u.id}>
                    <Link to={`/?userId=${u.id}`} className="dropdown-item">
                      {u.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


Добавим возможность сортировки постов:

В postRouter.js на сервере добавляем логику для сортировки:
postRouter.get('/', async (req, res) => {
const { userId, sortBy = 'id', sortOrder = 'DESC' } = req.query;
const where = {};
if (userId) {
where.userId = userId;
}
const posts = await Post.findAll({
where,
order: [[sortBy, sortOrder]],
include: User,
});
res.json(posts);
});


На клиентской части в MainPage.tsx добавляем сортировку:
const [sortBy, setSortBy] = useState('id');
const [sortOrder, setSortOrder] = useState('DESC');

useEffect(() => {
axiosInstance(`/posts?userId=${userId || ''}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
.then((res) => setPosts(res.data))
.catch((err) => console.error(err));
}, [userId, sortBy, sortOrder]);

return (

  <div>
    <div className="mb-3">
      <label htmlFor="sortByField" className="form-label">
        Сортировать по
      </label>
      <select
        id="sortByField"
        className="form-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="id">ID</option>
        <option value="title">Заголовок</option>
        <option value="createdAt">Дата создания</option>
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="sortOrder" className="form-label">
        Порядок сортировки
      </label>
      <select
        id="sortOrder"
        className="form-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="DESC">По убыванию</option>
        <option value="ASC">По возрастанию</option>
      </select>
    </div>
    <div className="row">
      {/* ... */}
    </div>
  </div>
);


Данная инструкция охватывает основные аспекты создания серверной и клиентской частей приложения, включая авторизацию, CRUD-операции, добавление файлов, филь

Добавим возможность просмотра деталей поста:

В postRouter.js на сервере добавляем маршрут для получения деталей поста:
postRouter.get('/:postId', async (req, res) => {
const post = await Post.findByPk(req.params.postId, {
include: User,
});
if (!post) return res.sendStatus(404);
res.json(post);
});

На клиентской части в App.tsx добавляем маршрут для просмотра деталей поста:
const routes = [
{
element: <Layout user={user} handleLogout={handleLogout} />,
children: [
{
path: '/',
element: <MainPage />,
},
{
path: '/posts/add',
element: <AddPostPage />,
},
{
path: '/posts/:postId',
element: <PostDetailsPage />,
},
{
path: '/signup',
element: <SignUpPage />,
},
{
path: '/login',
element: <LoginPage />,
},
],
},
];


Создаем новый компонент PostDetailsPage.tsx:
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

export default function PostDetailsPage() {
const { postId } = useParams();
const [post, setPost] = useState(null);

useEffect(() => {
axiosInstance(`/posts/${postId}`)
.then((res) => setPost(res.data))
.catch((err) => console.error(err));
}, [postId]);

if (!post) return <div>Loading...</div>;

return (
<div>
<h1>{post.title}</h1>
<p>{post.body}</p>
<p>Автор: {post.User.name}</p>
{post.imageUrl && <img src={post.imageUrl} alt="Post" />}
</div>
);
}


Добавляем ссылку на страницу просмотра деталей поста в PostCard.tsx:
import { Link } from 'react-router-dom';

export default function PostCard({ post, deleteHandler, editHandler }) {
return (
<div className="card">
{post.imageUrl && (
<img src={post.imageUrl} className="card-img-top" alt="Post" />
)}
<div className="card-body">
<Link to={`/posts/${post.id}`} className="card-title">
{post.title}
</Link>
<p className="card-text">{post.body}</p>
{/_ ... _/}
</div>
</div>
);
}

Добавим возможность комментирования постов:

В db/models создаем модель для комментариев:
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Comment extends Model {}

Comment.init(
{
body: {
type: DataTypes.TEXT,
allowNull: false,
},
},
{
sequelize,
modelName: 'Comment',
}
);

Comment.associate = (models) => {
Comment.belongsTo(models.Post);
Comment.belongsTo(models.User);
};

module.exports = Comment;


В postRouter.js на сервере добавляем маршруты для комментариев:
const { Comment } = require('../../db/models');

postRouter.get('/:postId/comments', async (req, res) => {
const comments = await Comment.findAll({
where: { postId: req.params.postId },
include: User,
});
res.json(comments);
});

postRouter.post('/:postId/comments', verifyAccessToken, async (req, res) => {
const comment = await Comment.create({
body: req.body.body,
postId: req.params.postId,
userId: res.locals.user.id,
});
res.status(201).json(comment);
});

На клиентской части в PostDetailsPage.tsx добавляем функционал для комментариев:
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { useOutletContext } from 'react-router-dom';

export default function PostDetailsPage() {
const { postId } = useParams();
const [post, setPost] = useState(null);
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState('');
const { handleMessage } = useOutletContext();

useEffect(() => {
axiosInstance(`/posts/${postId}`)
.then((res) => setPost(res.data))
.catch((err) => console.error(err));

    axiosInstance(`/posts/${postId}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));

}, [postId]);

const addComment = async () => {
try {
const comment = await axiosInstance.post(`/posts/${postId}/comments`, {
body: newComment,
});
setComments((prev) => [...prev, comment.data]);
setNewComment('');
handleMessage('Комментарий успешно добавлен!');
} catch (err) {
console.error(err);
handleMessage('Ошибка при добавлении комментария!');
}
};

if (!post) return <div>Loading...</div>;

return (
<div>
<h1>{post.title}</h1>
<p>{post.body}</p>
<p>Автор: {post.User.name}</p>
{post.imageUrl && <img src={post.imageUrl} alt="Post" />}
<div>
<h2>Комментарии</h2>
<ul>
{comments.map((comment) => (
<li key={comment.id}>
{comment.body} - {comment.User.name}
</li>
))}
</ul>
<div className="input-group mb-3">
<input
type="text"
className="form-control"
placeholder="Новый комментарий"
value={newComment}
onChange={(e) => setNewComment(e.target.value)}
/>
<button className="btn btn-primary" onClick={addComment}>
Добавить
</button>
</div>
</div>
</div>
);
}

Добавим возможность выбора темы (светлая/темная) для пользователя:
В db/models добавляем поле для сохранения темы в модель User:
class User extends Model {}

User.init(
{
// ...
theme: {
```

git add -A
git commit -m 'наименование релиза'

потом перешел на dev - git pull origin dev
потом перешел на ветку совю

git merge dev
решаем конфликты
git push origin наименование совей ветки

Команды для сервера:

1. `npm init -y` - инициализация package.json
2. `npm init @eslint/config@latest` - инициализация ESLint
3. `npx gitignore node` - создание .gitignore
4. `npm i sequelize sequelize-cli pg pg-hstore express morgan dotenv nodemon bcrypt jsonwebtoken cookie-parser cors` - установка необходимых пакетов
5. `npx sequelize-cli init` - инициализация Sequelize
6. `npx sequelize model:generate --name Post --attributes title:string,body:text` - создание модели Post
7. `npx sequelize-cli seed:generate --name initial-seed` - создание сида
8. `npm run dev` - запуск сервера в режиме разработки
9. `npm start` - запуск сервера
10. `npm run db:reset` - сброс и миграция базы данных

Команды для клиента:

1. `npm create vite@latest` - создание клиентской части
2. `npm i` - установка зависимостей для клиента
3. `npm i bootstrap@5.3.3` - установка Bootstrap

Общие команды Git:

1. `git add -A`
2. `git commit -m 'наименование релиза'`
3. `git push origin наименование совей ветки`
<!-- 
Список основных команд из инструкции:


4. `npm init -y` - инициализация package.json
5. `npm init @eslint/config@latest` - инициализация ESLint
6. `npx gitignore node` - создание .gitignore
7. `npm i sequelize sequelize-cli pg pg-hstore express morgan dotenv nodemon bcrypt jsonwebtoken cookie-parser cors` - установка необходимых пакетов
8. `npx sequelize-cli init` - инициализация Sequelize
9. `npx sequelize model:generate --name Post --attributes title:string,body:text` - создание модели Post
10. `npx sequelize-cli seed:generate --name initial-seed` - создание сида
11. `npm run dev` - запуск сервера в режиме разработки
12. `npm start` - запуск сервера
13. `npm run db:reset` - сброс и миграция базы данных
14. `npm create vite@latest` - создание клиентской части
15. `npm i` - установка зависимостей для клиента
16. `npm i bootstrap@5.3.3` - установка Bootstrap
17. `git add -A`, `git commit -m 'наименование релиза'`, `git push origin наименование совей ветки` - команды для Git -->

Список папок в инструкции:

1. `server` - корневая папка для серверной части приложения
2. `src` - папка с исходным кодом сервера
   - `app.js`
   - `server.js`
   - `router`
     - `postRouter.js`
     - `authRouter.js`
   - `middlewares`
     - `verifyAccessToken.js`
   - `config`
     - `cookieConfig.js`
     - `jwtConfig.js`
   - `utils`
     - `generateTokens.js`
3. `client` - корневая папка для клиентской части приложения
   - `src`
     - `components`
       - `Layout.tsx`
     - `pages`
       - `MainPage.tsx`
       - `AddPostPage.tsx`
       - `SignUpPage.tsx`
       - `LoginPage.tsx`
       - `PostDetailsPage.tsx`
     - `ui`
       - `NavBar.tsx`
       - `PostCard.tsx`
   - `axiosInstance.js`
4. `db`
   - `models`
     - `Post.js`
     - `User.js`
     - `Comment.js`
   - `migrations`
   - `seeders`
